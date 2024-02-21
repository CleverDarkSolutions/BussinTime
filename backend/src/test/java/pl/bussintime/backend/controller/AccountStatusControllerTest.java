package pl.bussintime.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.service.AccountStatusService;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AccountStatusControllerTest {

    @InjectMocks
    private AccountStatusController accountStatusController;

    @Mock
    private AccountStatusService accountStatusService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSetStatusOnline() {
        Account testAccount = new Account();
        testAccount.setId(1L);

        doNothing().when(accountStatusService).setOnlineStatus(testAccount.getId());

        Account result = accountStatusController.setStatusOnline(testAccount);

        assertEquals(testAccount, result);
        verify(accountStatusService, times(1)).setOnlineStatus(testAccount.getId());
    }

    @Test
    public void testSetStatusOffline() {
        Account testAccount = new Account();
        testAccount.setId(1L);
        
        doNothing().when(accountStatusService).setOfflineStatus(testAccount.getId());

        Account result = accountStatusController.setStatusOffline(testAccount);

        assertEquals(testAccount, result);
        verify(accountStatusService, times(1)).setOfflineStatus(testAccount.getId());
    }

    @Test
    public void testGetAllOnlineAccounts() {
        List<Account> testAccountList = new ArrayList<>();
        Account testAccount1 = new Account();
        testAccount1.setId(1L);
        testAccountList.add(testAccount1);

        when(accountStatusService.getAllOnlineAccounts()).thenReturn(testAccountList);

        ResponseEntity<List<Account>> responseEntity = accountStatusController.getAllOnlineAccounts();
        List<Account> result = responseEntity.getBody();

        assertEquals(testAccountList, result);
        assertEquals(200, responseEntity.getStatusCodeValue());
    }
}
