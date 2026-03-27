package com.oxukids.backend.domain.gallery;

import com.oxukids.backend.shared.BadRequestException;
import com.oxukids.backend.shared.ResourceNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final GalleryStorageService galleryStorageService;

    public GalleryService(GalleryRepository galleryRepository, GalleryStorageService galleryStorageService) {
        this.galleryRepository = galleryRepository;
        this.galleryStorageService = galleryStorageService;
    }

    @Transactional(readOnly = true)
    public List<GalleryResponse> getGalleryItems() {
        return galleryRepository.findAllByOrderByCreatedAtDescIdDesc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public GalleryResponse createGalleryItem(GalleryRequest request) {
        GalleryItem galleryItem = new GalleryItem();
        applyRequest(galleryItem, request, true);
        return mapToResponse(galleryRepository.save(galleryItem));
    }

    @Transactional
    public GalleryResponse updateGalleryItem(Long galleryId, GalleryRequest request) {
        GalleryItem galleryItem = getGalleryItemOrThrow(galleryId);
        applyRequest(galleryItem, request, false);
        return mapToResponse(galleryRepository.save(galleryItem));
    }

    @Transactional
    public void deleteGalleryItem(Long galleryId) {
        GalleryItem galleryItem = getGalleryItemOrThrow(galleryId);
        galleryStorageService.deleteIfExists(galleryItem.getImagePath());
        galleryRepository.delete(galleryItem);
    }

    private GalleryItem getGalleryItemOrThrow(Long galleryId) {
        return galleryRepository.findById(galleryId)
                .orElseThrow(() -> new ResourceNotFoundException("Galereya elementi topilmadi"));
    }

    private void applyRequest(GalleryItem galleryItem, GalleryRequest request, boolean requireImage) {
        galleryItem.setTitle(request.getTitle().trim());
        galleryItem.setCategory(request.getCategory().trim());
        galleryItem.setDescription(request.getDescription().trim());

        if (request.getImage() != null && !request.getImage().isEmpty()) {
            String previousImagePath = galleryItem.getImagePath();
            String storedImagePath = galleryStorageService.storeImage(request.getImage());
            galleryItem.setImagePath(storedImagePath);

            if (StringUtils.hasText(previousImagePath)) {
                galleryStorageService.deleteIfExists(previousImagePath);
            }
            return;
        }

        if (requireImage && !StringUtils.hasText(galleryItem.getImagePath())) {
            throw new BadRequestException("Galereya uchun rasm yuklash majburiy");
        }
    }

    private GalleryResponse mapToResponse(GalleryItem galleryItem) {
        return new GalleryResponse(
                galleryItem.getId(),
                galleryItem.getTitle(),
                galleryItem.getCategory(),
                galleryItem.getDescription(),
                galleryStorageService.buildPublicUrl(galleryItem.getImagePath()),
                galleryItem.getCreatedAt(),
                galleryItem.getUpdatedAt()
        );
    }
}
