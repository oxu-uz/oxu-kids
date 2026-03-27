package com.oxukids.backend.security;

import com.oxukids.backend.domain.user.User;
import com.oxukids.backend.domain.user.UserRepository;
import com.oxukids.backend.domain.user.UserRole;
import com.oxukids.backend.domain.user.UserSummaryResponse;
import com.oxukids.backend.security.dto.AuthResponse;
import com.oxukids.backend.security.dto.LoginRequest;
import com.oxukids.backend.security.dto.RegisterRequest;
import com.oxukids.backend.shared.DuplicateResourceException;
import com.oxukids.backend.shared.ResourceNotFoundException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException("Bu email bilan foydalanuvchi allaqachon mavjud");
        }

        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(UserRole.USER);

        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(AuthenticatedUser.fromEntity(savedUser));

        return new AuthResponse(token, mapToSummary(savedUser));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.email().trim().toLowerCase(),
                request.password()
        ));

        User user = userRepository.findByEmailIgnoreCase(request.email().trim())
                .orElseThrow(() -> new ResourceNotFoundException("Foydalanuvchi topilmadi"));

        if (user.isBlocked()) {
            throw new DisabledException("Ushbu akkaunt bloklangan");
        }

        String token = jwtService.generateToken(AuthenticatedUser.fromEntity(user));
        return new AuthResponse(token, mapToSummary(user));
    }

    @Transactional(readOnly = true)
    public UserSummaryResponse getCurrentUser(AuthenticatedUser currentUser) {
        return userRepository.findById(currentUser.getId())
                .map(this::mapToSummary)
                .orElseThrow(() -> new ResourceNotFoundException("Foydalanuvchi topilmadi"));
    }

    private UserSummaryResponse mapToSummary(User user) {
        return new UserSummaryResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
