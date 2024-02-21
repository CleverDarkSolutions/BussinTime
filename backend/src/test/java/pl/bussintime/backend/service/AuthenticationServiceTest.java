//package pl.bussintime.backend.service;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import pl.bussintime.backend.model.Account;
//import pl.bussintime.backend.model.dto.JwtAuthenticationResponse;
//import pl.bussintime.backend.model.dto.SignInRequest;
//import pl.bussintime.backend.model.dto.SignUpRequest;
//import pl.bussintime.backend.model.enums.Gender;
//import pl.bussintime.backend.service.AccountService;
//import pl.bussintime.backend.service.AuthenticationService;
//import pl.bussintime.backend.service.JwtService;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//@ExtendWith(MockitoExtension.class)
//class AuthenticationServiceTest {
//
//    @Mock private AccountService accountService;
//    @Mock private JwtService jwtService;
//    @Mock private AuthenticationManager authenticationManager;
//    @Mock private PasswordEncoder passwordEncoder;
//
//    @InjectMocks private AuthenticationService authenticationService;
//
//    private SignInRequest signInRequest;
//    private SignUpRequest signUpRequest;
//    private Account account;
//
//    @BeforeEach
//    void setUp() {
//
//        signInRequest = new SignInRequest("username", "password");
//        account = new Account();
//        when(accountService.getAccountByUserName(signInRequest.getUserName())).thenReturn(account);
//        when(jwtService.generateToken(account)).thenReturn("jwtToken");
//        signUpRequest = SignUpRequest.builder()
//                .userName("newUser")
//                .email("newuser@example.com")
//                .password("password")
//                .gender(Gender.MALE)
//                .photoPath("path/to/photo")
//                .description("A new user")
//                .country("Country")
//                .city("City")
//                .address("User address")
//                .age(30)
//                .build();
//
//        when(passwordEncoder.encode(signUpRequest.getPassword())).thenReturn("encodedPassword");
//        when(accountService.save(any(Account.class))).thenAnswer(i -> i.getArguments()[0]);
//        when(jwtService.generateToken(any(Account.class))).thenReturn("jwtTokenForNewUser");
//    }
//
//    @Test
//    void signin_ExistingUser_ReturnsJwtAuthenticationResponse() {
//        when(jwtService.generateToken(account)).thenReturn("jwtToken");
//        JwtAuthenticationResponse response = authenticationService.signin(signInRequest);
//
//        assertNotNull(response.getToken());
//        assertEquals("jwtToken", response.getToken());
//        assertEquals(account, response.getAccount());
//        verify(authenticationManager).authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getUserName(), signInRequest.getPassword()));
//        verify(accountService).getAccountByUserName(signInRequest.getUserName());
//    }
//
//    @Test
//    void signup_NewUser_ReturnsJwtAuthenticationResponse() {
//        JwtAuthenticationResponse response = authenticationService.signup(signUpRequest);
//
//        assertNotNull(response.getToken());
//        assertEquals("jwtTokenForNewUser", response.getToken());
//        assertNotNull(response.getAccount());
//        assertEquals(signUpRequest.getUserName(), response.getAccount().getUsername());
//        assertEquals("encodedPassword", response.getAccount().getPassword());
//
//        verify(accountService).isAccountNameTaken(signUpRequest.getUserName());
//        verify(accountService).isAccountEmailTaken(signUpRequest.getEmail());
//        verify(passwordEncoder).encode(signUpRequest.getPassword());
//        verify(accountService).save(any(Account.class));
//        verify(jwtService).generateToken(any(Account.class));
//    }
//}
