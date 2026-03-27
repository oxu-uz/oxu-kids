package com.oxukids.backend.domain.child;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChildCreateRequest(
        @NotBlank(message = "Bola ismi majburiy")
        @Size(max = 120, message = "Bola ismi 120 belgidan oshmasligi kerak")
        String name,

        @Min(value = 3, message = "Yosh kamida 3 bo'lishi kerak")
        @Max(value = 7, message = "Yosh 7 dan oshmasligi kerak")
        Integer age
) {
}
