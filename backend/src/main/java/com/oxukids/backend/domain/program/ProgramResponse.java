package com.oxukids.backend.domain.program;

public record ProgramResponse(
        Long id,
        String title,
        String description,
        String ageGroup,
        String imageUrl,
        long enrollmentCount
) {
}
