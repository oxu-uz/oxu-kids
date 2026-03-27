package com.oxukids.backend.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Email majburiy")
        @Email(message = "Email noto'g'ri formatda")
        String email,

        @NotBlank(message = "Parol majburiy")
        String password
) {
}
