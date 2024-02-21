package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.EventInviteNotification;
import pl.bussintime.backend.model.Notification;

import java.util.Optional;

@Repository
public interface EventInviteNotificationRepository extends JpaRepository<EventInviteNotification, Long> {
    Optional<Notification> findByEventIdAndRecipientId(Long eventId, Long recipientId);
}
