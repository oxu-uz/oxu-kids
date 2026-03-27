package com.oxukids.backend.controller;

import com.oxukids.backend.domain.user.AdminCreateRequest;
import com.oxukids.backend.domain.user.ManagedUserResponse;
import com.oxukids.backend.domain.user.UserModerationRequest;
import com.oxukids.backend.domain.user.UserManagementService;
import com.oxukids.backend.domain.user.UserSummaryResponse;
import com.oxukids.backend.security.AuthenticatedUser;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserManagementController {

    private final UserManagementService userManagementService;

    public UserManagementController(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public List<ManagedUserResponse> getUsers() {
        return userManagementService.getUsers();
    }

    @PostMapping("/admins")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public UserSummaryResponse createAdmin(@Valid @RequestBody AdminCreateRequest request) {
        return userManagementService.createAdmin(request);
    }

    @PatchMapping("/{userId}/status")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ManagedUserResponse updateUserBlockedStatus(
            @AuthenticationPrincipal AuthenticatedUser currentUser,
            @PathVariable Long userId,
            @RequestBody UserModerationRequest request
    ) {
        return userManagementService.updateUserBlockedStatus(currentUser, userId, request);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(
            @AuthenticationPrincipal AuthenticatedUser currentUser,
            @PathVariable Long userId
    ) {
        userManagementService.deleteUser(currentUser, userId);
    }
}
