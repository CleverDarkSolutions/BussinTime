package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.enums.AccountOnlineStatus;
import pl.bussintime.backend.repository.AccountRepository;

import java.util.List;

@Service
public class AccountStatusService {
    private final AccountRepository accountRepository;
    private final AccountService accountService;

    public AccountStatusService(AccountRepository accountRepository, AccountService accountService) {
        this.accountRepository = accountRepository;
        this.accountService = accountService;
    }

    public void setOnlineStatus(Long accountId) {
        updateAccountStatus(accountId, AccountOnlineStatus.ONLINE);
    }

    public void setOfflineStatus(Long accountId) {
        updateAccountStatus(accountId, AccountOnlineStatus.OFFLINE);
    }

    private void updateAccountStatus(Long accountId, AccountOnlineStatus status) {
        Account account = accountService.getAccountByIdOrNull(accountId);
        if (account != null) {
            account.setOnlineStatus(status);
            accountRepository.save(account);
        }
    }

    public List<Account> getAllOnlineAccounts() {
        return accountRepository.findByOnlineStatus(AccountOnlineStatus.ONLINE);
    }
}
