package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.PrivateChatMessage;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<PrivateChatMessage, Long> {
    List<PrivateChatMessage> findByChatName(String name);
    List<PrivateChatMessage> findBySenderAndRecipient(Account sender, Account Recipient);
}
