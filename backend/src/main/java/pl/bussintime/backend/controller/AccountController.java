package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.dto.EditAccountRequest;
import pl.bussintime.backend.repository.AccountRepository;
import pl.bussintime.backend.service.AccountService;
import org.springframework.web.bind.annotation.*;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountController {
    private final AccountService accountService;
    private final AccountRepository accountRepository;

    public AccountController(AccountService accountService,
                             AccountRepository accountRepository){
        this.accountService = accountService;
        this.accountRepository = accountRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Account>> getAllAccounts() {
        List<Account> accounts = accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("{accountId}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long accountId) {
        Account account = ServiceUtils.getAccountByIdOrThrow(accountRepository, accountId);
        return ResponseEntity.ok(account);
    }

    @PutMapping("/updateAccountDetails/{accountId}")
    public ResponseEntity<Account> updateAccount(@RequestBody EditAccountRequest editAccountRequest,
                                                 @PathVariable Long accountId) {
        Account updatedAccount = accountService.updateAccountDetails(editAccountRequest, accountId);
        return ResponseEntity.ok(updatedAccount);
    }

    @PutMapping("/updatePassword/{accountId}")
    public ResponseEntity<String> updatePassword(@RequestBody String updatedPassword,
                                                 @PathVariable Long accountId) {
        String message = accountService.updatePassword(updatedPassword, accountId);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("{accountId}")
    public void deleteAccountById(@PathVariable Long accountId) {
        accountService.deleteAccountById(accountId);
    }
}