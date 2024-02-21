package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ResourceAlreadyTaken;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.Premium;
import pl.bussintime.backend.model.enums.PremiumType;
import pl.bussintime.backend.repository.AccountRepository;
import pl.bussintime.backend.repository.PremiumRepository;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.time.LocalDateTime;

@Service
public class PremiumService {
    private final PremiumRepository premiumRepository;
    private final AccountRepository accountRepository;

    public PremiumService(PremiumRepository premiumRepository,
                          AccountRepository accountRepository) {
        this.premiumRepository = premiumRepository;
        this.accountRepository = accountRepository;
    }

    public String activatePremiumFoundersPack(Long accountId) {
        Account account = ServiceUtils.getAccountByIdOrThrow(accountRepository, accountId);

        if (account.getPremium() != null) {
            throw new ResourceAlreadyTaken("This account already has bought founders premium");
        }

        Premium premium = new Premium();

        premium.setPremiumType(PremiumType.FOUNDERS);
        premium.setActive(true);
        premium.setPaymentDate(LocalDateTime.now());
        premium.setAccount(account);

        premiumRepository.save(premium);

        return "Premium type of " + PremiumType.FOUNDERS + " has been bought";
    }
}
