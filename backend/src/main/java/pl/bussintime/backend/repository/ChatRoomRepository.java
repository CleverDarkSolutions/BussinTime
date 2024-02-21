package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.PrivateChatRoom;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<PrivateChatRoom, Long> {
    Optional<PrivateChatRoom> findBySenderAndRecipient(Account sender, Account recipient);
    PrivateChatRoom findByChatName(String chatId);
}
