package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ApiRequestException;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.PrivateChatMessage;
import pl.bussintime.backend.model.dto.PrivateChatMessageRequest;
import pl.bussintime.backend.model.enums.ChatMessageType;
import pl.bussintime.backend.repository.AccountRepository;
import pl.bussintime.backend.repository.ChatMessageRepository;
import pl.bussintime.backend.repository.ChatRoomRepository;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;
    private final ChatRoomRepository chatRoomRepository;
    private final AccountRepository accountRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository,
                              ChatRoomService chatRoomService,
                              ChatRoomRepository chatRoomRepository,
                              AccountRepository accountRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomService = chatRoomService;
        this.chatRoomRepository = chatRoomRepository;
        this.accountRepository = accountRepository;
    }

    public PrivateChatMessage save(PrivateChatMessageRequest privateChatMessageRequest) {
        Account sender = ServiceUtils.getAccountByIdOrThrow(accountRepository, privateChatMessageRequest.senderId());
        Account recipient = ServiceUtils.getAccountByIdOrThrow(accountRepository, privateChatMessageRequest.recipientId());

        PrivateChatMessage newPrivateChatMessage = new PrivateChatMessage();

        var chatName = chatRoomService.getChatRoomName(
                sender,
                recipient,
                true)
                .orElseThrow(() -> new ApiRequestException(
                        "Error occurred while saving chat message of "
                                + sender.getUsername()
                                + " and "
                                + recipient.getUsername()));

        newPrivateChatMessage.setPrivateChatRoom(chatRoomRepository.findByChatName(chatName));
        newPrivateChatMessage.setSender(sender);
        newPrivateChatMessage.setRecipient(recipient);
        newPrivateChatMessage.setMessageTime(LocalDateTime.now());
        newPrivateChatMessage.setMessageType(ChatMessageType.USER);
        newPrivateChatMessage.setChatName(chatName);
        newPrivateChatMessage.setContent(privateChatMessageRequest.content());

        return chatMessageRepository.save(newPrivateChatMessage);
    }

    public List<PrivateChatMessage> findChatMessages(Long senderId, Long recipientId) {
        Account sender = ServiceUtils.getAccountByIdOrThrow(accountRepository, senderId);
        Account recipient = ServiceUtils.getAccountByIdOrThrow(accountRepository, recipientId);

        List<PrivateChatMessage> messagesOriginal = chatMessageRepository.findBySenderAndRecipient(sender, recipient);
        List<PrivateChatMessage> messagesSwitched = chatMessageRepository.findBySenderAndRecipient(recipient, sender);

        return Stream.concat(messagesOriginal.stream(), messagesSwitched.stream())
                .sorted(Comparator.comparing(PrivateChatMessage::getMessageTime))
                .collect(Collectors.toList());
    }
}
