package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.FriendInviteNotification;
import pl.bussintime.backend.model.Notification;

import java.util.Optional;

@Repository
public interface FriendInviteNotificationRepository extends JpaRepository<FriendInviteNotification, Long> {
    Optional<Notification> findByFriendshipIdAndRecipientId(Long friendshipId, Long recipientId);
}
