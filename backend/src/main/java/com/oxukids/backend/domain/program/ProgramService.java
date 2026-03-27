package com.oxukids.backend.domain.program;

import com.oxukids.backend.shared.ResourceNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class ProgramService {

    private final ProgramRepository programRepository;
    private final ProgramStorageService programStorageService;

    public ProgramService(ProgramRepository programRepository, ProgramStorageService programStorageService) {
        this.programRepository = programRepository;
        this.programStorageService = programStorageService;
    }

    @Transactional(readOnly = true)
    public List<ProgramResponse> getPrograms() {
        return programRepository.findAllByOrderByIdAsc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public ProgramResponse createProgram(ProgramRequest request) {
        ProgramEntity program = new ProgramEntity();
        applyRequest(program, request, true);
        return mapToResponse(programRepository.save(program));
    }

    @Transactional
    public ProgramResponse updateProgram(Long programId, ProgramRequest request) {
        ProgramEntity program = getProgramEntityOrThrow(programId);
        applyRequest(program, request, false);
        return mapToResponse(programRepository.save(program));
    }

    @Transactional
    public void deleteProgram(Long programId) {
        ProgramEntity program = getProgramEntityOrThrow(programId);
        programStorageService.deleteIfExists(program.getImagePath());
        programRepository.delete(program);
    }

    @Transactional(readOnly = true)
    public ProgramEntity getProgramEntityOrThrow(Long programId) {
        return programRepository.findById(programId)
                .orElseThrow(() -> new ResourceNotFoundException("Dastur topilmadi"));
    }

    private void applyRequest(ProgramEntity program, ProgramRequest request, boolean requireImage) {
        program.setTitle(request.getTitle().trim());
        program.setDescription(request.getDescription().trim());
        program.setAgeGroup(request.getAgeGroup().replace(" ", ""));

        if (request.getImage() != null && !request.getImage().isEmpty()) {
            String previousImagePath = program.getImagePath();
            String storedImagePath = programStorageService.storeImage(request.getImage());
            program.setImagePath(storedImagePath);

            if (StringUtils.hasText(previousImagePath)) {
                programStorageService.deleteIfExists(previousImagePath);
            }
            return;
        }

        if (requireImage && !StringUtils.hasText(program.getImagePath())) {
            throw new com.oxukids.backend.shared.BadRequestException("Dastur uchun rasm yuklash majburiy");
        }
    }

    private ProgramResponse mapToResponse(ProgramEntity program) {
        return new ProgramResponse(
                program.getId(),
                program.getTitle(),
                program.getDescription(),
                program.getAgeGroup(),
                programStorageService.buildPublicUrl(program.getImagePath()),
                program.getEnrollments().size()
        );
    }
}
