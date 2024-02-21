package pl.bussintime.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.bussintime.backend.model.enums.AccountEventStatus;

@Data
@Entity
@Table(name = "account_event")
@AllArgsConstructor
@NoArgsConstructor
public class AccountEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull(message = "Account cannot be null")
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne
    @NotNull(message = "Event cannot be null")
    @JoinColumn(name = "event_id")
    private Event event;

    @Column(length = 20)
    @NotNull(message = "Status cannot be null")
    @Enumerated(EnumType.STRING)
    private AccountEventStatus accountStatus;
}
