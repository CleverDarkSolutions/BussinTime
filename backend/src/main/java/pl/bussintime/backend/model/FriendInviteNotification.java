package pl.bussintime.backend.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("FRIEND_INVITE")
@Setter
@Getter
public class FriendInviteNotification extends Notification {
    @ManyToOne
    @JoinColumn(name = "friendship_id")
    private Friendship friendship;
}
