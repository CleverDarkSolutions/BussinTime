package pl.bussintime.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import pl.bussintime.backend.model.enums.ReactionEntityType;
import pl.bussintime.backend.model.enums.ReactionType;

@Data
@Entity
@Table(name = "reaction")
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Reaction type cannot be null")
    private ReactionType reactionType;

    @Column
    @NotNull(message = "Entity type cannot be null")
    @Enumerated(EnumType.STRING)
    private ReactionEntityType entityType;

    @Column
    @NotNull(message = "Entity ID cannot be null")
    private Long entityId;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @NotNull(message = "There must be a relation with account")
    private Account account;
}