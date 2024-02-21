package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.PrivateChatRoom;
import pl.bussintime.backend.repository.ChatRoomRepository;

import java.util.Optional;

@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    public Optional<String> getChatRoomName(Account sender, Account recipient, boolean createNewChatRoomIfNotExists) {
        Optional<String> chatName = chatRoomRepository.findBySenderAndRecipient(sender, recipient)
                .map(PrivateChatRoom::getChatName);

        if (chatName.isEmpty()) {
            chatName = chatRoomRepository.findBySenderAndRecipient(recipient, sender)
                    .map(PrivateChatRoom::getChatName);
        }

        if (chatName.isEmpty() && createNewChatRoomIfNotExists) {
            chatName = Optional.of(createChatName(sender, recipient));
        }

        return chatName;
    }

    private String createChatName(Account sender, Account recipient) {
        var chatName = String.format("%s_%s",
                sender.getUsername(), recipient.getUsername());

        PrivateChatRoom newChatRoom = PrivateChatRoom.builder()
                .chatName(chatName)
                .sender(sender)
                .recipient(recipient)
                .build();

//        PrivateChatRoom recipientSender = PrivateChatRoom.builder()
//                .chatName(chatName)
//                .sender(recipient)
//                .recipient(sender)
//                .build();

        chatRoomRepository.save(newChatRoom);
//        chatRoomRepository.save(recipientSender);

        return chatName;
    }
}
