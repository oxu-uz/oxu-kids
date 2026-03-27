package com.oxukids.backend.domain.child;

import java.time.Instant;

public record ChildEnrollmentSummary(
        Long enrollmentId,
        Long programId,
        String programTitle,
        String ageGroup,
        Instant enrolledAt
) {
}
