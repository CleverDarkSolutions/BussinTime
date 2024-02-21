//package pl.bussintime.backend.service;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import pl.bussintime.backend.exception.ResourceAlreadyTaken;
//import pl.bussintime.backend.exception.ResourceNotFoundException;
//import pl.bussintime.backend.model.Account;
//import pl.bussintime.backend.repository.AccountRepository;
//
//import java.time.LocalDateTime;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.Mockito.*;
//
//public class AccountServiceTest {
//
//    @Mock
//    private AccountRepository accountRepository;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    @InjectMocks
//    private AccountService accountService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testGetAccountByIdWhenAccountExists() {
//        Long accountId = 1L;
//        Account mockAccount = new Account();
//        mockAccount.setId(accountId);
//
//        when(accountRepository.findById(accountId)).thenReturn(Optional.of(mockAccount));
//
//        Account resultAccount = accountService.getAccountById(accountId);
//
//        assertNotNull(resultAccount);
//        assertEquals(accountId, resultAccount.getId());
//
//        verify(accountRepository, times(1)).findById(accountId);
//    }
//
//    @Test
//    void testGetAccountByIdWhenAccountDoesNotExist() {
//        Long accountId = 1L;
//
//        when(accountRepository.findById(accountId)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            accountService.getAccountById(accountId);
//        });
//
//        verify(accountRepository, times(1)).findById(accountId);
//    }
//
//    @Test
//    void testUpdatePassword() {
//        Long accountId = 1L;
//        String newPassword = "newPassword";
//
//        Account mockAccount = new Account();
//        mockAccount.setId(accountId);
//        mockAccount.setPassword("oldPassword");
//
//        when(accountRepository.findById(accountId)).thenReturn(Optional.of(mockAccount));
//
//        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);
//        when(passwordEncoder.encode(newPassword)).thenReturn("hashedNewPassword");
//
//        String resultMessage = accountService.updatePassword(newPassword, accountId);
//
//        assertEquals("Password has been updated", resultMessage);
//        verify(accountRepository, times(1)).findById(accountId);
//
//        verify(accountRepository, times(1)).save(mockAccount);
//        assertEquals("hashedNewPassword", mockAccount.getPassword());
//    }
//
//@Test
//void save_NewAccount_SetsCreatedAtAndUpdatesAccount() {
//    Account newAccount = new Account();
//    when(accountRepository.save(any(Account.class))).thenAnswer(invocation -> invocation.getArgument(0));
//
//    Account savedAccount = accountService.save(newAccount);
//
//    assertNotNull(savedAccount.getCreatedAt());
//    assertNotNull(savedAccount.getUpdatedAt());
//    verify(accountRepository).save(newAccount);
//}
//
//@Test
//void save_ExistingAccount_UpdatesAccount() {
//    Account existingAccount = new Account();
//    existingAccount.setId(1L);
//    existingAccount.setCreatedAt(LocalDateTime.now().minusDays(1));
//    when(accountRepository.save(any(Account.class))).thenAnswer(invocation -> invocation.getArgument(0));
//
//    Account savedAccount = accountService.save(existingAccount);
//
//    assertEquals(existingAccount.getCreatedAt(), savedAccount.getCreatedAt());
//    assertNotNull(savedAccount.getUpdatedAt());
//    verify(accountRepository).save(existingAccount);
//}
//@Test
//void isAccountNameTaken_WhenNameIsTaken_ThrowsException() {
//    String takenName = "existingUser";
//    when(accountRepository.findByUserName(takenName)).thenReturn(Optional.of(new Account()));
//
//    assertThrows(ResourceAlreadyTaken.class, () -> accountService.isAccountNameTaken(takenName));
//}
//
//@Test
//void isAccountNameTaken_WhenNameIsNotTaken_DoesNotThrowException() {
//    String availableName = "newUser";
//    when(accountRepository.findByUserName(availableName)).thenReturn(Optional.empty());
//
//    assertDoesNotThrow(() -> accountService.isAccountNameTaken(availableName));
//}
//
//@Test
//void isAccountEmailTaken_WhenEmailIsTaken_ThrowsException() {
//    String takenEmail = "existing@example.com";
//    when(accountRepository.findByEmail(takenEmail)).thenReturn(Optional.of(new Account()));
//
//    assertThrows(ResourceAlreadyTaken.class, () -> accountService.isAccountEmailTaken(takenEmail));
//}
//
//@Test
//void isAccountEmailTaken_WhenEmailIsNotTaken_DoesNotThrowException() {
//    String availableEmail = "new@example.com";
//    when(accountRepository.findByEmail(availableEmail)).thenReturn(Optional.empty());
//
//    assertDoesNotThrow(() -> accountService.isAccountEmailTaken(availableEmail));
//}
//
//@Test
//void userDetailsService_WhenUsernameNotFound_ThrowsException() {
//    UserDetailsService userDetailsService = accountService.userDetailsService();
//    String nonExistentUsername = "nonExistentUser";
//
//    when(accountRepository.findByUserName(nonExistentUsername)).thenReturn(Optional.empty());
//
//    assertThrows(ResourceNotFoundException.class,
//                 () -> userDetailsService.loadUserByUsername(nonExistentUsername));
//}
//
//
//}
