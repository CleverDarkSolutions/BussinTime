package pl.bussintime.backend.configuration;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.enums.Gender;
import pl.bussintime.backend.model.enums.SecurityRole;
import pl.bussintime.backend.repository.AccountRepository;
import pl.bussintime.backend.service.AccountService;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class SeedDataConfig implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountService accountService;

    @Value("${base.auth.username}")
    String authUsername;

    @Value("${base.auth.password}")
    String authPassword;

    @Override
    public void run(String... args) {

        if (accountRepository.count() == 0) {

            Account admin = Account
                    .builder()
                    .userName(authUsername)
                    .email("admin@admin.com")
                    .password(passwordEncoder.encode(authPassword))
                    .gender(Gender.OTHER)
                    .description("I am a admin, i am a admin")
                    .country("admininstan")
                    .city("admionowo")
                    .address("adminowa 1337")
                    .securityRole(SecurityRole.ROLE_ADMIN)
                    .age(100)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            accountService.save(admin);
            log.debug("created ADMIN user - {}", admin);
        }
    }

}
