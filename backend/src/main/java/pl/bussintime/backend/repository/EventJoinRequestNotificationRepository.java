package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.EventJoinRequestNotification;
import pl.bussintime.backend.model.Notification;

import java.util.Optional;

@Repository
public interface EventJoinRequestNotificationRepository extends JpaRepository<EventJoinRequestNotification, Long> {
    Optional<Notification> findByRequestIdAndRecipientId(Long eventId, Long recipientId);
}
