package pl.bussintime.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import pl.bussintime.backend.model.dto.EventVisibility;
import pl.bussintime.backend.model.enums.Gender;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Size(max = 50, message = "Name must be at most 50 characters long")
    @NotBlank(message = "Name cannot be null")
    private String name;

    @Column
    @Size(max = 255, message = "Photo path must be at most 255 characters long")
    private String photoPath;

    @Column
    private String description;

    @Column
    @NotNull(message = "Start date cannot be null")
    private LocalDateTime startDate;

    @Column
    @NotNull(message = "End date cannot be null")
    private LocalDateTime endDate;

    @Column
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "localization_id")
    @NotNull(message = "Localization cannot be null")
    private EventLocalization localization;

    @Column
    @NotNull(message = "Gender cannot be null")
    @Enumerated(EnumType.STRING)
    private EventVisibility eventVisibility;


    @JsonIgnore
    @OneToMany(mappedBy = "event", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Set<AccountEvent> accountEvents;

    @JsonIgnore
    @OneToMany(mappedBy = "event", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Set<Post> posts;
}
