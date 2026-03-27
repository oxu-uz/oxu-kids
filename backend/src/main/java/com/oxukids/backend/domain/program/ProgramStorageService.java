package com.oxukids.backend.domain.program;

import com.oxukids.backend.config.StorageProperties;
import com.oxukids.backend.shared.BadRequestException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProgramStorageService {

    private static final List<String> ALLOWED_CONTENT_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
    );

    private final Path programRoot;

    public ProgramStorageService(StorageProperties storageProperties) {
        this.programRoot = Paths.get(storageProperties.getUploadDir())
                .toAbsolutePath()
                .normalize()
                .resolve("programs");
        initStorage();
    }

    public String storeImage(MultipartFile image) {
        validateImage(image);

        String extension = resolveExtension(image);
        String fileName = UUID.randomUUID() + extension;
        Path target = programRoot.resolve(fileName).normalize();

        try (InputStream inputStream = image.getInputStream()) {
            Files.copy(inputStream, target, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException exception) {
            throw new IllegalStateException("Dastur rasmi saqlanmadi", exception);
        }

        return "programs/" + fileName;
    }

    public void deleteIfExists(String imagePath) {
        if (!StringUtils.hasText(imagePath)) {
            return;
        }

        Path target = programRoot.getParent().resolve(imagePath).normalize();
        try {
            Files.deleteIfExists(target);
        } catch (IOException exception) {
            throw new IllegalStateException("Dastur rasmini o'chirishda xatolik yuz berdi", exception);
        }
    }

    public String buildPublicUrl(String imagePath) {
        if (!StringUtils.hasText(imagePath)) {
            return null;
        }

        return "/uploads/" + imagePath.replace("\\", "/");
    }

    private void initStorage() {
        try {
            Files.createDirectories(programRoot);
        } catch (IOException exception) {
            throw new IllegalStateException("Program upload papkasini yaratib bo'lmadi", exception);
        }
    }

    private void validateImage(MultipartFile image) {
        if (image == null || image.isEmpty()) {
            throw new BadRequestException("Dastur uchun rasm tanlanishi majburiy");
        }

        String contentType = image.getContentType();
        if (!StringUtils.hasText(contentType) || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new BadRequestException("Faqat JPG, PNG, WEBP yoki GIF rasm yuklash mumkin");
        }
    }

    private String resolveExtension(MultipartFile image) {
        String originalFileName = StringUtils.cleanPath(image.getOriginalFilename());
        int dotIndex = originalFileName.lastIndexOf('.');

        if (dotIndex >= 0 && dotIndex < originalFileName.length() - 1) {
            return originalFileName.substring(dotIndex).toLowerCase();
        }

        return switch (image.getContentType()) {
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            case "image/gif" -> ".gif";
            default -> ".jpg";
        };
    }
}
