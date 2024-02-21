package pl.bussintime.backend.model.dto;

public record PostRequest (
        String title,
        String content,
        String photoPath,
        Long accountId,
        Long eventId
) {
}
