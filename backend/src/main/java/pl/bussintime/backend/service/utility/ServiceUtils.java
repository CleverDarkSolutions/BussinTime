package pl.bussintime.backend.service.utility;

import pl.bussintime.backend.exception.ResourceNotFoundException;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.repository.AccountRepository;

public class ServiceUtils {
    public static Account getAccountByIdOrThrow(AccountRepository accountRepository, Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with ID: " + id));
    }

    public static Account getAccountByUserNameOrThrow(AccountRepository accountRepository, String name) {
        return accountRepository.findByUserName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with name: " + name));
    }
}
