package pl.bussintime.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.bussintime.backend.model.dto.ChatMessageAccountDto;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50, message = "Title must be at most 255 characters long")
    @NotBlank(message = "Content cannot be null")
    private String title;

    @NotNull(message = "Content cannot be null")
    private String content;

    @Column
    @NotNull(message = "Creation date cannot be null")
    private LocalDateTime creationDate;

    @Column
    @Size(max = 255, message = "Photo path must be at most 255 characters long")
    private String photoPath;

    @JsonProperty("posterId")
    public ChatMessageAccountDto getSenderDTO() {
        return ChatMessageAccountDto.from(account);
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    @NotNull(message = "There must be a relation with account")
    private Account account;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    @NotNull(message = "There must be a relation with event")
    private Event event;

    @JsonIgnore
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE , fetch = FetchType.LAZY)
    private Set<Comment> comments;
}
