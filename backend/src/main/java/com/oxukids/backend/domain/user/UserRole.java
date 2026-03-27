package com.oxukids.backend.domain.user;

import com.fasterxml.jackson.annotation.JsonValue;
import java.util.List;

public enum UserRole {
    SUPER_ADMIN("SUPER_ADMIN", List.of("ROLE_SUPER_ADMIN", "ROLE_ADMIN")),
    ADMIN("ADMIN", List.of("ROLE_ADMIN")),
    USER("USER", List.of("ROLE_USER")),
    PARENT("USER", List.of("ROLE_USER"));

    private final String clientValue;
    private final List<String> authorityNames;

    UserRole(String clientValue, List<String> authorityNames) {
        this.clientValue = clientValue;
        this.authorityNames = authorityNames;
    }

    @JsonValue
    public String getClientValue() {
        return clientValue;
    }

    public List<String> getAuthorityNames() {
        return authorityNames;
    }

    public boolean isAdminRole() {
        return this == SUPER_ADMIN || this == ADMIN;
    }

    public boolean isSuperAdmin() {
        return this == SUPER_ADMIN;
    }

    public boolean isUserRole() {
        return this == USER || this == PARENT;
    }
}
