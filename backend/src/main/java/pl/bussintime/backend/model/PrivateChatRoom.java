package pl.bussintime.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "private_chat_room")
public class PrivateChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String chatName;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "sender_id")
    private Account sender;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "recipient_id")
    private Account recipient;

    @OneToMany(mappedBy = "privateChatRoom", cascade = CascadeType.ALL)
    private List<PrivateChatMessage> privateChatMessages;
}
