package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.EventJoinRequest;
import pl.bussintime.backend.model.Notification;

import java.util.Optional;

@Repository
public interface EventJoinRequestRepository extends JpaRepository <EventJoinRequest, Long> {
    boolean existsByHostIdAndRequesterIdAndEventId(
            Long hostId, Long requesterId, Long eventId);
}
