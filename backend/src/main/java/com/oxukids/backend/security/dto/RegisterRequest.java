package com.oxukids.backend.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Ism majburiy")
        @Size(max = 120, message = "Ism 120 belgidan oshmasligi kerak")
        String name,

        @NotBlank(message = "Email majburiy")
        @Email(message = "Email noto'g'ri formatda")
        String email,

        @NotBlank(message = "Parol majburiy")
        @Size(min = 8, message = "Parol kamida 8 belgidan iborat bo'lishi kerak")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).+$",
                message = "Parolda katta-kichik harf, raqam va maxsus belgi bo'lishi kerak"
        )
        String password
) {
}
