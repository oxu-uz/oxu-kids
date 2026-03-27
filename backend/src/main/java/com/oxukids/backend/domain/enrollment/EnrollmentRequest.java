package com.oxukids.backend.domain.enrollment;

import jakarta.validation.constraints.NotNull;

public record EnrollmentRequest(
        @NotNull(message = "childId majburiy")
        Long childId,

        @NotNull(message = "programId majburiy")
        Long programId
) {
}
