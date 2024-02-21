package pl.bussintime.backend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("EVENT_INVITE")
@Setter
@Getter
public class EventInviteNotification extends Notification {
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}
