package pl.bussintime.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.enums.AccountOnlineStatus;
import pl.bussintime.backend.repository.AccountRepository;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AccountStatusServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private AccountService accountService;

    @InjectMocks
    private AccountStatusService accountStatusService;

    private Account account;

    @BeforeEach
    void setUp() {
        account = new Account();
        account.setId(1L);
    }

    @Test
    void setOnlineStatus_ExistingAccount_SetsStatusToOnline() {
        when(accountService.getAccountByIdOrNull(account.getId())).thenReturn(account);
    
        accountStatusService.setOnlineStatus(account.getId());
    
        assertEquals(AccountOnlineStatus.ONLINE, account.getOnlineStatus());
        verify(accountRepository).save(account);
    }

    @Test
void setOfflineStatus_ExistingAccount_SetsStatusToOffline() {
    when(accountService.getAccountByIdOrNull(account.getId())).thenReturn(account);

    accountStatusService.setOfflineStatus(account.getId());

    assertEquals(AccountOnlineStatus.OFFLINE, account.getOnlineStatus());
    verify(accountRepository).save(account);
}

@Test
void getAllOnlineAccounts_ReturnsOnlineAccounts() {
    List<Account> onlineAccounts = Collections.singletonList(account);
    when(accountRepository.findByOnlineStatus(AccountOnlineStatus.ONLINE)).thenReturn(onlineAccounts);

    List<Account> result = accountStatusService.getAllOnlineAccounts();

    assertEquals(onlineAccounts, result);
}

    }
