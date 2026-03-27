package com.oxukids.backend.domain.child;

import java.util.List;

public record ChildResponse(
        Long id,
        String name,
        Integer age,
        Long parentId,
        String parentName,
        String parentEmail,
        List<ChildEnrollmentSummary> enrollments
) {
}
