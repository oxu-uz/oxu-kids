package com.oxukids.backend.domain.gallery;

import java.time.Instant;

public record GalleryResponse(
        Long id,
        String title,
        String category,
        String description,
        String imageUrl,
        Instant createdAt,
        Instant updatedAt
) {
}
