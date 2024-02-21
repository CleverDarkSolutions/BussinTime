package pl.bussintime.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import pl.bussintime.backend.model.enums.EventJoinRequestStatus;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "event_join_request")
public class EventJoinRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull(message = "Invitation date cannot be null")
    private LocalDateTime request_date ;

    @Column
    @Enumerated(EnumType.STRING)
    private EventJoinRequestStatus status;

    @ManyToOne
    @JoinColumn(name = "host_id")
    private Account host;

    @ManyToOne
    @JoinColumn(name = "requester_id")
    private Account requester;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}
