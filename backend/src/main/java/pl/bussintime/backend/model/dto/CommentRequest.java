package pl.bussintime.backend.model.dto;

public record CommentRequest (
        String content,
        Long accountId,
        Long postId
) {
}
