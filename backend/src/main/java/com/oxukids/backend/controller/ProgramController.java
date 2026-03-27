package com.oxukids.backend.controller;

import com.oxukids.backend.domain.program.ProgramRequest;
import com.oxukids.backend.domain.program.ProgramResponse;
import com.oxukids.backend.domain.program.ProgramService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public List<ProgramResponse> getPrograms() {
        return programService.getPrograms();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ProgramResponse createProgram(@Valid @ModelAttribute ProgramRequest request) {
        return programService.createProgram(request);
    }

    @PutMapping(path = "/{programId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ProgramResponse updateProgram(
            @PathVariable Long programId,
            @Valid @ModelAttribute ProgramRequest request
    ) {
        return programService.updateProgram(programId, request);
    }

    @DeleteMapping("/{programId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProgram(@PathVariable Long programId) {
        programService.deleteProgram(programId);
    }
}
