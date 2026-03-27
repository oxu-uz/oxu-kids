package com.oxukids.backend.config;

import com.oxukids.backend.domain.program.ProgramEntity;
import com.oxukids.backend.domain.program.ProgramRepository;
import com.oxukids.backend.domain.user.User;
import com.oxukids.backend.domain.user.UserRepository;
import com.oxukids.backend.domain.user.UserRole;
import com.oxukids.backend.security.AppSecurityProperties;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class ApplicationSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProgramRepository programRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppSecurityProperties securityProperties;

    public ApplicationSeeder(
            UserRepository userRepository,
            ProgramRepository programRepository,
            PasswordEncoder passwordEncoder,
            AppSecurityProperties securityProperties
    ) {
        this.userRepository = userRepository;
        this.programRepository = programRepository;
        this.passwordEncoder = passwordEncoder;
        this.securityProperties = securityProperties;
    }

    @Override
    public void run(String... args) {
        seedSuperAdmin();
        seedAdmin();
        seedPrograms();
    }

    private void seedSuperAdmin() {
        if (userRepository.existsByEmailIgnoreCase(securityProperties.getSuperAdminEmail())) {
            return;
        }

        User superAdmin = new User();
        superAdmin.setName(securityProperties.getSuperAdminName());
        superAdmin.setEmail(securityProperties.getSuperAdminEmail().trim().toLowerCase());
        superAdmin.setPassword(passwordEncoder.encode(securityProperties.getSuperAdminPassword()));
        superAdmin.setRole(UserRole.SUPER_ADMIN);
        userRepository.save(superAdmin);
    }

    private void seedAdmin() {
        if (userRepository.existsByEmailIgnoreCase(securityProperties.getAdminEmail())) {
            return;
        }

        User admin = new User();
        admin.setName(securityProperties.getAdminName());
        admin.setEmail(securityProperties.getAdminEmail().trim().toLowerCase());
        admin.setPassword(passwordEncoder.encode(securityProperties.getAdminPassword()));
        admin.setRole(UserRole.ADMIN);
        userRepository.save(admin);
    }

    private void seedPrograms() {
        if (programRepository.count() > 0) {
            return;
        }

        List<ProgramEntity> programs = List.of(
                new ProgramEntity(
                        "Kichik Qadamlar",
                        "3-4 yoshli bolalar uchun mehribon moslashuv, nutq rivoji, sensor o'yinlar va xavfsiz ijtimoiylashuv dasturi.",
                        "3-4"
                ),
                new ProgramEntity(
                        "Ijodkorlar Bog'i",
                        "4-5 yoshli guruh uchun rasm, musiqa, teatr, tabiat bilan tanishuv va jamoaviy o'yinlarga boy dastur.",
                        "4-5"
                ),
                new ProgramEntity(
                        "Bilimga Parvoz",
                        "5-7 yoshli bolalar uchun savodga tayyorgarlik, mantiqiy fikrlash, ingliz tili va maktabga tayyorlov mashg'ulotlari.",
                        "5-7"
                )
        );

        programRepository.saveAll(programs);
    }
}
