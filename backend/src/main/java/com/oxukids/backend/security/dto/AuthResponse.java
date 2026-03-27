package com.oxukids.backend.security.dto;

import com.oxukids.backend.domain.user.UserSummaryResponse;

public record AuthResponse(
        String token,
        UserSummaryResponse user
) {
}
