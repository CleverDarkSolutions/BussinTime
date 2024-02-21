package pl.bussintime.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import pl.bussintime.backend.model.dto.ChatMessageAccountDto;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull(message = "Creation date cannot be null")
    private LocalDateTime creationDate;

    @Column
    @NotBlank(message = "Content cannot be null")
    @Size(max = 255, message = "Comment must be at most 255 characters long")
    private String content;

    @JsonProperty("commenterId")
    public ChatMessageAccountDto getSenderDTO() {
        return ChatMessageAccountDto.from(account);
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "account_id")
    @NotNull(message = "There must be a relation with account")
    private Account account;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id")
    @NotNull(message = "There must be a relation with event")
    private Post post;
}
