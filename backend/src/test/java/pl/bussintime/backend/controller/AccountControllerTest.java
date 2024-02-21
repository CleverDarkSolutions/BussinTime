//package pl.bussintime.backend.controller;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.ResponseEntity;
//import pl.bussintime.backend.model.Account;
//import pl.bussintime.backend.model.dto.EditAccountRequest;
//import pl.bussintime.backend.service.AccountService;
//import pl.bussintime.backend.controller.AccountController;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//public class AccountControllerTest {
//
//    private AccountController accountController;
//
//    @Mock
//    private AccountService accountService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//        accountController = new AccountController(accountService);
//    }
//
//    @Test
//    public void testGetAllAccounts() {
//        List<Account> accounts = new ArrayList<>();
//        when(accountService.getAllAccounts()).thenReturn(accounts);
//
//        ResponseEntity<List<Account>> response = accountController.getAllAccounts();
//
//        assertEquals(accounts, response.getBody());
//        assertEquals(200, response.getStatusCodeValue());
//    }
//
//    @Test
//    public void testGetAccountById() {
//        Long accountId = 1L;
//        Account account = new Account();
//        when(accountService.getAccountById(accountId)).thenReturn(account);
//
//        ResponseEntity<Account> response = accountController.getAccountById(accountId);
//
//        assertEquals(account, response.getBody());
//        assertEquals(200, response.getStatusCodeValue());
//    }
//    @Test
//    public void testUpdateAccount() {
//        Long accountId = 1L;
//        EditAccountRequest editAccountRequest = new EditAccountRequest(
//            "JohnDoe",
//            "johndoe@example.com",
//            "USA",
//            "New York",
//            "123 Main St",
//            "path/to/photo.jpg",
//            "A description"
//        );
//        Account updatedAccount = new Account();
//        when(accountService.updateAccountDetails(editAccountRequest, accountId)).thenReturn(updatedAccount);
//
//        ResponseEntity<Account> response = accountController.updateAccount(editAccountRequest, accountId);
//
//        assertEquals(updatedAccount, response.getBody());
//        assertEquals(200, response.getStatusCodeValue());
//    }
//
//
//    @Test
//    public void testUpdatePassword() {
//        Long accountId = 1L;
//        String updatedPassword = "newPassword";
//        String message = "Password updated successfully";
//        when(accountService.updatePassword(updatedPassword, accountId)).thenReturn(message);
//
//        ResponseEntity<String> response = accountController.updatePassword(updatedPassword, accountId);
//
//        assertEquals(message, response.getBody());
//        assertEquals(200, response.getStatusCodeValue());
//    }
//
//    @Test
//    public void testDeleteAccountById() {
//        Long accountId = 1L;
//
//        assertDoesNotThrow(() -> accountController.deleteAccountById(accountId));
//    }
//}
