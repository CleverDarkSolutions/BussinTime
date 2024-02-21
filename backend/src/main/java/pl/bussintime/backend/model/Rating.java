package pl.bussintime.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.bussintime.backend.model.enums.RatedEntityType;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "rating")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long entityId;

    @Column
    private String content;

    @Column
    private int score;

    @Column
    private LocalDateTime creationDate;

    @Column
    @Enumerated(EnumType.STRING)
    private RatedEntityType entityType;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
