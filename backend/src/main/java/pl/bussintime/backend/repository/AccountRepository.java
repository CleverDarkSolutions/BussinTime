package pl.bussintime.backend.repository;

import pl.bussintime.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.enums.AccountOnlineStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUserName(String name);
    Optional<Account> findByEmail(String name);
    List<Account> findByOnlineStatus(AccountOnlineStatus onlineStatus);
}
