package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.AccountEvent;
import pl.bussintime.backend.model.enums.AccountEventStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountEventRepository extends JpaRepository<AccountEvent, Long> {
    List<AccountEvent> findByAccountId(Long id);
    List<AccountEvent> findByEventId(Long id);
    Optional<AccountEvent> findByAccountIdAndEventId(Long accountId, Long eventId);
    Optional<List<AccountEvent>> findByAccountIdAndAccountStatus(Long accountId, AccountEventStatus accountEventStatus);
    default Optional<AccountEvent> findHostByEventId(Long eventId) {
        List<AccountEvent> events = findByEventId(eventId);

        return events.stream()
                .filter(event -> event.getAccountStatus() == AccountEventStatus.HOST)
                .findFirst();
    }
}
