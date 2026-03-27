package com.oxukids.backend.domain.child;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildRepository extends JpaRepository<Child, Long> {

    List<Child> findAllByOrderByIdAsc();

    List<Child> findAllByParentIdOrderByIdAsc(Long parentId);

    Optional<Child> findByIdAndParentId(Long id, Long parentId);
}
