package com.oxukids.backend.security;

import com.oxukids.backend.domain.user.User;
import com.oxukids.backend.domain.user.UserRole;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthenticatedUser implements UserDetails {

    private final Long id;
    private final String name;
    private final String email;
    private final String password;
    private final UserRole role;
    private final boolean blocked;

    public AuthenticatedUser(Long id, String name, String email, String password, UserRole role, boolean blocked) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.blocked = blocked;
    }

    public static AuthenticatedUser fromEntity(User user) {
        return new AuthenticatedUser(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole(),
                user.isBlocked()
        );
    }

    public Long getId() {
        return id;
    }

    public UserRole getRole() {
        return role;
    }

    public boolean isAdminRole() {
        return role.isAdminRole();
    }

    public boolean isSuperAdmin() {
        return role.isSuperAdmin();
    }

    public boolean isUserRole() {
        return role.isUserRole();
    }

    public String getDisplayName() {
        return name;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorityNames().stream()
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !blocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return !blocked;
    }
}
