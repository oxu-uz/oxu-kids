package com.oxukids.backend.domain.gallery;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepository extends JpaRepository<GalleryItem, Long> {

    List<GalleryItem> findAllByOrderByCreatedAtDescIdDesc();
}
