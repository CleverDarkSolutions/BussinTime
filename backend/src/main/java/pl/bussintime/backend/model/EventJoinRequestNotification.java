package pl.bussintime.backend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("JOIN_REQUEST")
@Setter
@Getter
public class EventJoinRequestNotification extends Notification {
    @ManyToOne
    @JoinColumn(name = "event_join_request_id")
    private EventJoinRequest request;
}
