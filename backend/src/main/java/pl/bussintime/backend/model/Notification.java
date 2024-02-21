package pl.bussintime.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.bussintime.backend.model.enums.NotificationStatus;
import pl.bussintime.backend.model.enums.NotificationType;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "notification_type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private Account recipient;

    @Column
    private LocalDateTime timestamp;

    @Column
    private String message;

    @Column(name = "notification_status")
    @Enumerated(EnumType.STRING)
    private NotificationStatus notificationStatus;

    @Column(name = "notification_type", insertable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @Column
    private String photoPath;
}

