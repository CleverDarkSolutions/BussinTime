package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.service.AccountStatusService;

import java.util.List;

@Controller
public class AccountStatusController {
    private final AccountStatusService accountStatusService;

    public AccountStatusController(AccountStatusService accountStatusService) {
        this.accountStatusService = accountStatusService;
    }


    //Gotta change that in the future
    @MessageMapping("/user.setStatusOnline")
    @SendTo("/user/public")
    public Account setStatusOnline(@Payload Account account) {
        accountStatusService.setOnlineStatus(account.getId());
        return account;
    }

    @MessageMapping("/user.setStatusOffline")
    @SendTo("/user/public")
    public Account setStatusOffline(@Payload Account account) {
        accountStatusService.setOfflineStatus(account.getId());
        return account;
    }

    @GetMapping("/users")
    public ResponseEntity<List<Account>> getAllOnlineAccounts() {
        return ResponseEntity.ok(accountStatusService.getAllOnlineAccounts());
    }
}
