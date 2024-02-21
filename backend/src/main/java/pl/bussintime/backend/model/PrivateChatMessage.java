package pl.bussintime.backend.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.bussintime.backend.model.dto.ChatMessageAccountDto;
import pl.bussintime.backend.model.enums.ChatMessageType;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "private_chat_message")
public class PrivateChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @Column
    private LocalDateTime messageTime;

    @Column
    private ChatMessageType messageType;

    @Column
    private String chatName;

    @JsonProperty("sender")
    public ChatMessageAccountDto getSenderDTO() {
        return ChatMessageAccountDto.from(sender);
    }

    @JsonProperty("recipient")
    public ChatMessageAccountDto getRecipientDTO() {
        return ChatMessageAccountDto.from(recipient);
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "sender_id")
    private Account sender;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "recipient_id")
    private Account recipient;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "chat_room_id")
    private PrivateChatRoom privateChatRoom;
}