package pl.bussintime.backend.model.dto;

public record EditPostRequest (
        String title,
        String content
) {
}
