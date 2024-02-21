package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import pl.bussintime.backend.model.Notification;
import pl.bussintime.backend.model.PrivateChatMessage;
import pl.bussintime.backend.model.dto.PrivateChatMessageRequest;
import pl.bussintime.backend.model.enums.NotificationStatus;
import pl.bussintime.backend.model.enums.NotificationType;
import pl.bussintime.backend.service.ChatMessageService;

import java.time.LocalDateTime;
import java.util.List;

@Controller
public class ChatController {
    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(ChatMessageService chatMessageService, SimpMessagingTemplate messagingTemplate) {
        this.chatMessageService = chatMessageService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    public void processMessage(
            @Payload PrivateChatMessageRequest privateChatMessageRequest
    ) {
        PrivateChatMessage savedMsg = chatMessageService.save(privateChatMessageRequest);
        messagingTemplate.convertAndSendToUser(
                privateChatMessageRequest.recipientId().toString(), "/queue/messages",
                Notification.builder()
                        .message(savedMsg.getContent())
                        .notificationStatus(NotificationStatus.UNNOTICED)
                        .notificationType(NotificationType.MESSAGE)
                        .timestamp(LocalDateTime.now())
                        .recipient(savedMsg.getRecipient())
                        .build()
        );
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<PrivateChatMessage>> handleChatMessage(
            @PathVariable("senderId") Long senderId,
            @PathVariable("recipientId") Long recipientId) {
        return ResponseEntity.ok(chatMessageService.findChatMessages(senderId, recipientId));
    }
}
