package com.oxukids.backend;

import com.oxukids.backend.security.AppSecurityProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppSecurityProperties.class)
public class OxuKidsApplication {

    public static void main(String[] args) {
        SpringApplication.run(OxuKidsApplication.class, args);
    }
}
