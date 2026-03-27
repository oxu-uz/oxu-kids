package com.oxukids.backend.domain.enrollment;

import java.time.Instant;

public record EnrollmentResponse(
        Long id,
        Long childId,
        String childName,
        Integer childAge,
        Long programId,
        String programTitle,
        String ageGroup,
        Instant enrolledAt,
        String parentName,
        String parentEmail
) {
}
