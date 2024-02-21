package pl.bussintime.backend.model.dto;

import pl.bussintime.backend.model.enums.RatedEntityType;

public record RatingRequest (
        String content,
        int score
) {
}
