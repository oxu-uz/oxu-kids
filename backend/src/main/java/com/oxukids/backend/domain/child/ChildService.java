package com.oxukids.backend.domain.child;

import com.oxukids.backend.domain.enrollment.Enrollment;
import com.oxukids.backend.domain.user.User;
import com.oxukids.backend.domain.user.UserRepository;
import com.oxukids.backend.security.AuthenticatedUser;
import com.oxukids.backend.shared.ResourceNotFoundException;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChildService {

    private final ChildRepository childRepository;
    private final UserRepository userRepository;

    public ChildService(ChildRepository childRepository, UserRepository userRepository) {
        this.childRepository = childRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ChildResponse createChild(AuthenticatedUser currentUser, ChildCreateRequest request) {
        User parent = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Foydalanuvchi topilmadi"));

        Child child = new Child();
        child.setName(request.name().trim());
        child.setAge(request.age());
        child.setParent(parent);

        Child savedChild = childRepository.save(child);
        return mapToResponse(savedChild);
    }

    @Transactional(readOnly = true)
    public List<ChildResponse> getChildren(AuthenticatedUser currentUser) {
        List<Child> children = currentUser.isAdminRole()
                ? childRepository.findAllByOrderByIdAsc()
                : childRepository.findAllByParentIdOrderByIdAsc(currentUser.getId());

        return children.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public Child findOwnedChildOrThrow(Long childId, Long parentId) {
        return childRepository.findByIdAndParentId(childId, parentId)
                .orElseThrow(() -> new ResourceNotFoundException("Farzand topilmadi yoki sizga tegishli emas"));
    }

    @Transactional(readOnly = true)
    public Child findChildOrThrow(Long childId) {
        return childRepository.findById(childId)
                .orElseThrow(() -> new ResourceNotFoundException("Farzand topilmadi"));
    }

    private ChildResponse mapToResponse(Child child) {
        List<ChildEnrollmentSummary> enrollments = child.getEnrollments().stream()
                .sorted(Comparator.comparing(Enrollment::getEnrolledAt).reversed())
                .map(enrollment -> new ChildEnrollmentSummary(
                        enrollment.getId(),
                        enrollment.getProgram().getId(),
                        enrollment.getProgram().getTitle(),
                        enrollment.getProgram().getAgeGroup(),
                        enrollment.getEnrolledAt()
                ))
                .toList();

        return new ChildResponse(
                child.getId(),
                child.getName(),
                child.getAge(),
                child.getParent().getId(),
                child.getParent().getName(),
                child.getParent().getEmail(),
                enrollments
        );
    }
}
