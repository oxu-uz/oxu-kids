package com.oxukids.backend.domain.user;

import com.oxukids.backend.security.AuthenticatedUser;
import com.oxukids.backend.shared.DuplicateResourceException;
import com.oxukids.backend.shared.ForbiddenOperationException;
import com.oxukids.backend.shared.ResourceNotFoundException;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserManagementService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserManagementService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<ManagedUserResponse> getUsers() {
        return userRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToManagedUser)
                .toList();
    }

    @Transactional
    public UserSummaryResponse createAdmin(AdminCreateRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException("Bu email bilan foydalanuvchi allaqachon mavjud");
        }

        User admin = new User();
        admin.setName(request.name().trim());
        admin.setEmail(request.email().trim().toLowerCase());
        admin.setPassword(passwordEncoder.encode(request.password()));
        admin.setRole(UserRole.ADMIN);

        User savedAdmin = userRepository.save(admin);
        return new UserSummaryResponse(
                savedAdmin.getId(),
                savedAdmin.getName(),
                savedAdmin.getEmail(),
                savedAdmin.getRole()
        );
    }

    @Transactional
    public ManagedUserResponse updateUserBlockedStatus(
            AuthenticatedUser currentUser,
            Long userId,
            UserModerationRequest request
    ) {
        User managedUser = getManagedUserOrThrow(userId);
        validateSuperAdminModeration(currentUser, managedUser);
        managedUser.setBlocked(request.blocked());
        return mapToManagedUser(userRepository.save(managedUser));
    }

    @Transactional
    public void deleteUser(AuthenticatedUser currentUser, Long userId) {
        User managedUser = getManagedUserOrThrow(userId);
        validateSuperAdminModeration(currentUser, managedUser);
        userRepository.delete(managedUser);
    }

    private User getManagedUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Foydalanuvchi topilmadi"));
    }

    private void validateSuperAdminModeration(AuthenticatedUser currentUser, User managedUser) {
        if (currentUser.getId().equals(managedUser.getId())) {
            throw new ForbiddenOperationException("O'zingizning akkauntingizga bu amalni bajarib bo'lmaydi");
        }

        if (managedUser.getRole().isSuperAdmin()) {
            throw new ForbiddenOperationException("Super admin akkauntini bloklab yoki o'chirib bo'lmaydi");
        }
    }

    private ManagedUserResponse mapToManagedUser(User user) {
        long enrollmentCount = user.getChildren().stream()
                .mapToLong(child -> child.getEnrollments().size())
                .sum();

        return new ManagedUserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.isBlocked(),
                user.getChildren().size(),
                enrollmentCount,
                user.getCreatedAt()
        );
    }
}
