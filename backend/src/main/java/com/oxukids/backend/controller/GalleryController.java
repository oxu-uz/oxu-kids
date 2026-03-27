package com.oxukids.backend.controller;

import com.oxukids.backend.domain.gallery.GalleryRequest;
import com.oxukids.backend.domain.gallery.GalleryResponse;
import com.oxukids.backend.domain.gallery.GalleryService;
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
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @GetMapping
    public List<GalleryResponse> getGalleryItems() {
        return galleryService.getGalleryItems();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public GalleryResponse createGalleryItem(@Valid @ModelAttribute GalleryRequest request) {
        return galleryService.createGalleryItem(request);
    }

    @PutMapping(path = "/{galleryId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public GalleryResponse updateGalleryItem(
            @PathVariable Long galleryId,
            @Valid @ModelAttribute GalleryRequest request
    ) {
        return galleryService.updateGalleryItem(galleryId, request);
    }

    @DeleteMapping("/{galleryId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGalleryItem(@PathVariable Long galleryId) {
        galleryService.deleteGalleryItem(galleryId);
    }
}
