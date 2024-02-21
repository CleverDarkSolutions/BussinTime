package pl.bussintime.backend.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ApiRequestException;
import pl.bussintime.backend.exception.ResourceAlreadyTaken;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.Event;
import pl.bussintime.backend.model.dto.EditAccountRequest;
import pl.bussintime.backend.model.enums.AccountEventStatus;
import pl.bussintime.backend.model.enums.DirectMessagesScope;
import pl.bussintime.backend.repository.AccountRepository;
import pl.bussintime.backend.repository.EventRepository;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Supplier;

@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final EventRepository eventRepository;
    private final PasswordEncoder passwordEncoder;
    private final EventService eventService;

    public AccountService(AccountRepository accountRepository,
                          EventRepository eventRepository,
                          PasswordEncoder passwordEncoder,
                          EventService eventService){
        this.accountRepository = accountRepository;
        this.eventRepository = eventRepository;
        this.passwordEncoder = passwordEncoder;
        this.eventService = eventService;
    }

    public Account getAccountByIdOrNull(Long id) {
        return accountRepository.findById(id)
                .orElse(null);
    }

    public Account getAccountByUserName(String name) {
        return ServiceUtils.getAccountByUserNameOrThrow(accountRepository, name);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public void deleteAccountById(Long id) {
        ServiceUtils.getAccountByIdOrThrow(accountRepository, id);

        List<Event> events = eventService.getEventsByAccountEventStatus(id, AccountEventStatus.HOST);

        eventRepository.deleteAll(events);
        accountRepository.deleteById(id);
    }

    //Make it so that it returns new token for new account userName
    public Account updateAccountDetails(EditAccountRequest editAccountRequest, Long accountId) {
        Account existingAccount = ServiceUtils.getAccountByIdOrThrow(accountRepository, accountId);

        String newUserName = editAccountRequest.userName();
        String newEmail = editAccountRequest.email();

        validateAndSetIfChanged(existingAccount::getUsername, newUserName, this::isAccountNameTaken);
        validateAndSetIfChanged(existingAccount::getEmail, newEmail, this::isAccountEmailTaken);

        existingAccount.setUpdatedAt(LocalDateTime.now());
        existingAccount.setCountry(editAccountRequest.country());
        existingAccount.setCity(editAccountRequest.city());
        existingAccount.setAddress(editAccountRequest.address());
        existingAccount.setPhotoPath(editAccountRequest.photoPath());
        existingAccount.setDescription(editAccountRequest.description());

        return accountRepository.save(existingAccount);
    }

    private <T> void validateAndSetIfChanged(Supplier<T> oldValueSupplier, T newValue, Consumer<T> validator) {
        T oldValue = oldValueSupplier.get();

        if (!newValue.equals(oldValue)) {
            validator.accept(newValue);
        }
    }

    public String updatePassword(String updatedPassword, Long accountId) {
        Account existingAccount = ServiceUtils.getAccountByIdOrThrow(accountRepository, accountId);

        if (isPasswordValid(updatedPassword)) {
            String existingPassword = existingAccount.getPassword();

            if (!passwordEncoder.matches(updatedPassword, existingPassword)) {
                String hashedPassword = passwordEncoder.encode(updatedPassword);
                existingAccount.setPassword(hashedPassword);
            } else {
                return "Password can't be the same as before";
            }

            accountRepository.save(existingAccount);
            return "Password has been updated";
        } else {
            return "Invalid password format";
        }
    }

    //Will change it in the future
    private boolean isPasswordValid(String password) {
        return password != null && password.length() >= 5 && password.length() <= 255;
    }

    public Account save(Account account) {
        if (account.getId() == null) {
            setNewAccountDetails(account);
            account.setCreatedAt(LocalDateTime.now());
        }

        account.setUpdatedAt(LocalDateTime.now());
        return accountRepository.save(account);
    }

    private void setNewAccountDetails(Account newAccount) {
        newAccount.setDirectMessages(DirectMessagesScope.EVERYONE);
        newAccount.setShareUsageData(true);
        newAccount.setGps(true);
        newAccount.setPrivateProfile(false);
    }

    private void checkIfResourceTaken(String resourceName, String value) {
        Optional<Account> existingAccount = switch (resourceName) {
            case "name" -> accountRepository.findByUserName(value);
            case "email" -> accountRepository.findByEmail(value);
            default -> throw new ApiRequestException("Unsupported resource type: " + resourceName);
        };

        if (existingAccount.isPresent()) {
            throw new ResourceAlreadyTaken("Account " + resourceName + " is already taken.");
        }
    }

    public void isAccountNameTaken(String name) {
        checkIfResourceTaken("name", name);
    }

    public void isAccountEmailTaken(String email) {
        checkIfResourceTaken("email", email);
    }

    public UserDetailsService userDetailsService() {
        return this::getAccountByUserName;
    }
}