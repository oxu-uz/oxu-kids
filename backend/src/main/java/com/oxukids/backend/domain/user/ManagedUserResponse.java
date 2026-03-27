package com.oxukids.backend.domain.user;

import java.time.Instant;

public record ManagedUserResponse(
        Long id,
        String name,
        String email,
        UserRole role,
        boolean blocked,
        int childCount,
        long enrollmentCount,
        Instant createdAt
) {
}
