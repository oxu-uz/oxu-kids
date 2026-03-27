package com.oxukids.backend.domain.gallery;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public class GalleryRequest {

    @NotBlank(message = "Sarlavha majburiy")
    @Size(max = 160, message = "Sarlavha 160 belgidan oshmasligi kerak")
    private String title;

    @NotBlank(message = "Kategoriya majburiy")
    @Size(max = 120, message = "Kategoriya 120 belgidan oshmasligi kerak")
    private String category;

    @NotBlank(message = "Tavsif majburiy")
    @Size(max = 1200, message = "Tavsif 1200 belgidan oshmasligi kerak")
    private String description;

    private MultipartFile image;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
