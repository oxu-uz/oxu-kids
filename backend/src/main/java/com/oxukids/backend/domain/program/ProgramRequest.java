package com.oxukids.backend.domain.program;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public class ProgramRequest {

    @NotBlank(message = "Dastur nomi majburiy")
    @Size(max = 160, message = "Dastur nomi 160 belgidan oshmasligi kerak")
    private String title;

    @NotBlank(message = "Tavsif majburiy")
    @Size(max = 1200, message = "Tavsif 1200 belgidan oshmasligi kerak")
    private String description;

    @NotBlank(message = "Yosh guruhi majburiy")
    @Pattern(
            regexp = "^[0-9]{1,2}\\s?-\\s?[0-9]{1,2}$",
            message = "Yosh guruhi masalan 3-4 yoki 5-7 ko'rinishida bo'lishi kerak"
    )
    private String ageGroup;

    private MultipartFile image;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAgeGroup() {
        return ageGroup;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
