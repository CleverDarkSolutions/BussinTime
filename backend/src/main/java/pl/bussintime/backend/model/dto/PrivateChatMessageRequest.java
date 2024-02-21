package pl.bussintime.backend.model.dto;

public record PrivateChatMessageRequest (
        String content,
        Long senderId,
        Long recipientId
) {

}
