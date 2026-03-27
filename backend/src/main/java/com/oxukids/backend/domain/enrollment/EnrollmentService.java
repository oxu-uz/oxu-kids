package com.oxukids.backend.domain.enrollment;

import com.oxukids.backend.domain.child.Child;
import com.oxukids.backend.domain.child.ChildService;
import com.oxukids.backend.domain.program.ProgramEntity;
import com.oxukids.backend.domain.program.ProgramService;
import com.oxukids.backend.security.AuthenticatedUser;
import com.oxukids.backend.shared.BadRequestException;
import com.oxukids.backend.shared.DuplicateResourceException;
import com.oxukids.backend.shared.ResourceNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final ChildService childService;
    private final ProgramService programService;

    public EnrollmentService(
            EnrollmentRepository enrollmentRepository,
            ChildService childService,
            ProgramService programService
    ) {
        this.enrollmentRepository = enrollmentRepository;
        this.childService = childService;
        this.programService = programService;
    }

    @Transactional
    public EnrollmentResponse createEnrollment(AuthenticatedUser currentUser, EnrollmentRequest request) {
        Child child = currentUser.isAdminRole()
                ? childService.findChildOrThrow(request.childId())
                : childService.findOwnedChildOrThrow(request.childId(), currentUser.getId());
        ProgramEntity program = programService.getProgramEntityOrThrow(request.programId());

        if (enrollmentRepository.existsByChildIdAndProgramId(child.getId(), program.getId())) {
            throw new DuplicateResourceException("Farzand ushbu dasturga allaqachon yozilgan");
        }

        validateAgeCompatibility(child.getAge(), program.getAgeGroup());

        Enrollment enrollment = new Enrollment();
        enrollment.setChild(child);
        enrollment.setProgram(program);

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return mapToResponse(savedEnrollment);
    }

    @Transactional(readOnly = true)
    public List<EnrollmentResponse> getAllEnrollments() {
        return enrollmentRepository.findAllByOrderByEnrolledAtDesc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public void deleteEnrollment(Long enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment topilmadi"));
        enrollmentRepository.delete(enrollment);
    }

    private void validateAgeCompatibility(Integer childAge, String ageGroup) {
        String[] segments = ageGroup.split("-");
        if (segments.length != 2) {
            return;
        }

        try {
            int minAge = Integer.parseInt(segments[0].trim());
            int maxAge = Integer.parseInt(segments[1].trim());

            if (childAge < minAge || childAge > maxAge) {
                throw new BadRequestException("Tanlangan dastur bolaning yosh guruhiga mos emas");
            }
        } catch (NumberFormatException ignored) {
            // Age group is treated as descriptive if parsing fails.
        }
    }

    private EnrollmentResponse mapToResponse(Enrollment enrollment) {
        return new EnrollmentResponse(
                enrollment.getId(),
                enrollment.getChild().getId(),
                enrollment.getChild().getName(),
                enrollment.getChild().getAge(),
                enrollment.getProgram().getId(),
                enrollment.getProgram().getTitle(),
                enrollment.getProgram().getAgeGroup(),
                enrollment.getEnrolledAt(),
                enrollment.getChild().getParent().getName(),
                enrollment.getChild().getParent().getEmail()
        );
    }
}
