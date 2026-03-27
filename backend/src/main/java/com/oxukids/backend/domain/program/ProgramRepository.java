package com.oxukids.backend.domain.program;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<ProgramEntity, Long> {

    List<ProgramEntity> findAllByOrderByIdAsc();
}
