package pl.bussintime.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.dto.JwtAuthenticationResponse;
import pl.bussintime.backend.model.dto.SignInRequest;
import pl.bussintime.backend.model.dto.SignUpRequest;
import pl.bussintime.backend.model.enums.SecurityRole;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final  JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationResponse signup(SignUpRequest request) {
        accountService.isAccountNameTaken(request.getUserName());
        accountService.isAccountEmailTaken(request.getEmail());

        var account = Account
                .builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .gender(request.getGender())
                .photoPath(request.getPhotoPath())
                .description(request.getDescription())
                .country(request.getCountry())
                .city(request.getCity())
                .address(request.getAddress())
                .age(request.getAge())
                .birthDate(request.getBirthDate())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .securityRole(SecurityRole.ROLE_USER)
                .build();

        account = accountService.save(account);
        var jwt = jwtService.generateToken(account);

        return JwtAuthenticationResponse
                .builder()
                .token(jwt)
                .account(account)
                .build();
    }

    public JwtAuthenticationResponse signin(SignInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
        var account = accountService.getAccountByUserName(request.getUserName());
        var jwt = jwtService.generateToken(account);

        return JwtAuthenticationResponse
                .builder()
                .token(jwt)
                .account(account)
                .build();
    }
}
