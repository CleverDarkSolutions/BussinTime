package pl.bussintime.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.bussintime.backend.model.enums.HashtagEntityType;

@Data
@Builder
@Entity
@Table(name = "hashtag")
@AllArgsConstructor
@NoArgsConstructor
public class Hashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long entityId;

    @Column
    private String name;

    @Column
    @Enumerated(EnumType.STRING)
    private HashtagEntityType entityType;
}
