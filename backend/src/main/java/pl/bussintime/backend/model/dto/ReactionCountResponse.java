package pl.bussintime.backend.model.dto;

import pl.bussintime.backend.model.enums.ReactionType;

public record ReactionCountResponse (
        ReactionType reactionType,
        int count
) {
}
