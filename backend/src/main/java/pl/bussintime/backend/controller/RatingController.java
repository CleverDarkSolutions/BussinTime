package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bussintime.backend.model.Rating;
import pl.bussintime.backend.model.dto.AverageRatingResponse;
import pl.bussintime.backend.model.dto.RatingRequest;
import pl.bussintime.backend.model.enums.RatedEntityType;
import pl.bussintime.backend.service.RatingService;

import java.util.List;

@RestController
@RequestMapping("/rating")
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("addRating/{entityId}")
    public ResponseEntity<Rating> addHashtag(@RequestBody RatingRequest ratingRequest,
                                             @RequestParam RatedEntityType ratedEntityType,
                                             @PathVariable Long entityId,
                                             @RequestParam Long accountId) {
        Rating newRating =  ratingService.addRating(accountId, ratingRequest, entityId, ratedEntityType);
        return ResponseEntity.ok(newRating);
    }

    @GetMapping("/entityRatings/{entityId}")
    public ResponseEntity<List<Rating>> getHashtagsByEntity(@RequestParam RatedEntityType ratedEntityType,
                                                             @PathVariable Long entityId) {
        List<Rating> ratings = ratingService.getRatingsByEntity(entityId, ratedEntityType);
        return ResponseEntity.ok(ratings);
    }

    @GetMapping("/getAverage/{entityId}")
    public ResponseEntity<AverageRatingResponse> getAverageRating(@RequestParam RatedEntityType ratedEntityType,
                                                                  @PathVariable Long entityId) {
        AverageRatingResponse averageRating = ratingService.getAverageRating(entityId, ratedEntityType);
        return ResponseEntity.ok(averageRating);
    }
}
