package pl.bussintime.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.bussintime.backend.model.dto.JwtAuthenticationResponse;
import pl.bussintime.backend.model.dto.SignInRequest;
import pl.bussintime.backend.model.dto.SignUpRequest;
import pl.bussintime.backend.service.AuthenticationService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AuthenticationControllerTest {

    @InjectMocks
    private AuthenticationController authenticationController;

    @Mock
    private AuthenticationService authenticationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSignup() {
        SignUpRequest signupRequest = SignUpRequest.builder()
                .userName("testUser")
                .email("test@example.com")
                .password("password")
                .build();
        
        JwtAuthenticationResponse authenticationResponse = new JwtAuthenticationResponse();

        when(authenticationService.signup(signupRequest)).thenReturn(authenticationResponse);

        JwtAuthenticationResponse response = authenticationController.signup(signupRequest);

        assertEquals(authenticationResponse, response);
        verify(authenticationService, times(1)).signup(signupRequest);
    }

    @Test
    public void testSignin() {
        SignInRequest signinRequest = SignInRequest.builder()
                .userName("testUser")
                .password("password")
                .build();
        
        JwtAuthenticationResponse authenticationResponse = new JwtAuthenticationResponse();

        when(authenticationService.signin(signinRequest)).thenReturn(authenticationResponse);

        JwtAuthenticationResponse response = authenticationController.signin(signinRequest);

        assertEquals(authenticationResponse, response);
        verify(authenticationService, times(1)).signin(signinRequest);
    }
}
