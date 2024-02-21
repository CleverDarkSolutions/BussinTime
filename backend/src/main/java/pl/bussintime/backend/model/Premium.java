package pl.bussintime.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Setter;
import pl.bussintime.backend.model.enums.PremiumType;

import java.time.LocalDateTime;

@Setter
@Entity
@Table(name = "premium")
public class Premium {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull(message = "Premium type cannot be null")
    @Enumerated(EnumType.STRING)
    private PremiumType premiumType;

    @Column
    private LocalDateTime paymentDate;

    @Column
    private LocalDateTime expirationDate;

    @Column
    private Integer daysLeft;

    @Column
    @NotNull(message = "Is active cannot be null")
    private boolean isActive;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "account_id")
    private Account account;
}
