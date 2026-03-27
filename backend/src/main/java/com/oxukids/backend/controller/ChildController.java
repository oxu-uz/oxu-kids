package com.oxukids.backend.controller;

import com.oxukids.backend.domain.child.ChildCreateRequest;
import com.oxukids.backend.domain.child.ChildResponse;
import com.oxukids.backend.domain.child.ChildService;
import com.oxukids.backend.security.AuthenticatedUser;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/children")
public class ChildController {

    private final ChildService childService;

    public ChildController(ChildService childService) {
        this.childService = childService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(HttpStatus.CREATED)
    public ChildResponse createChild(
            @AuthenticationPrincipal AuthenticatedUser currentUser,
            @Valid @RequestBody ChildCreateRequest request
    ) {
        return childService.createChild(currentUser, request);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPER_ADMIN')")
    public List<ChildResponse> getChildren(@AuthenticationPrincipal AuthenticatedUser currentUser) {
        return childService.getChildren(currentUser);
    }
}
