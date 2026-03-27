package com.oxukids.backend.domain.enrollment;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    boolean existsByChildIdAndProgramId(Long childId, Long programId);

    List<Enrollment> findAllByOrderByEnrolledAtDesc();
}
