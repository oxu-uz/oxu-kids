package com.oxukids.backend.domain.user;

public record UserSummaryResponse(
        Long id,
        String name,
        String email,
        UserRole role
) {
}
