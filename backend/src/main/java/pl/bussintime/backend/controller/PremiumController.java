package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.bussintime.backend.service.PremiumService;

@RestController
@RequestMapping("/premium")
public class PremiumController {
    private final PremiumService premiumService;

    public PremiumController(PremiumService premiumService) {
        this.premiumService = premiumService;
    }

    @PostMapping("/{accountId}")
    public ResponseEntity<String> activatePremiumFoundersPack(@PathVariable Long accountId) {
        String message = premiumService.activatePremiumFoundersPack(accountId);
        return ResponseEntity.ok(message);
    }
}
