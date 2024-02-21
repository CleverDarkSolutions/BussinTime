package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ResourceAlreadyTaken;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.Rating;
import pl.bussintime.backend.model.dto.AverageRatingResponse;
import pl.bussintime.backend.model.dto.RatingRequest;
import pl.bussintime.backend.model.enums.RatedEntityType;
import pl.bussintime.backend.repository.AccountRepository;
import pl.bussintime.backend.repository.RatingRepository;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;
    private final AccountRepository accountRepository;

    public RatingService(RatingRepository ratingRepository,
                         AccountRepository accountRepository) {
        this.ratingRepository = ratingRepository;
        this.accountRepository = accountRepository;
    }

    public Rating addRating(Long accountId, RatingRequest ratingRequest, Long entityId, RatedEntityType ratedEntityType) {
        Optional<Rating> optionalRating = ratingRepository.findByAccountIdAndEntityIdAndEntityType(accountId, entityId, ratedEntityType);

        if (optionalRating.isPresent()) throw new ResourceAlreadyTaken("This account has already added rating for this entity");

        Account account = ServiceUtils.getAccountByIdOrThrow(accountRepository, accountId);

        Rating rating = Rating.builder()
                .entityId(entityId)
                .creationDate(LocalDateTime.now())
                .entityType(ratedEntityType)
                .content(ratingRequest.content())
                .score(ratingRequest.score())
                .account(account)
                .build();

        return ratingRepository.save(rating);
    }

    public List<Rating> getRatingsByEntity(Long entityId, RatedEntityType ratedEntityType) {
        return ratingRepository.findByEntityTypeAndEntityId(ratedEntityType, entityId);
    }

    public AverageRatingResponse getAverageRating(Long entityId, RatedEntityType ratedEntityType) {
        List<Rating> ratings = getRatingsByEntity(entityId, ratedEntityType);

        int totalScore = ratings.stream()
                .mapToInt(Rating::getScore)
                .sum();

        return AverageRatingResponse.builder()
                .averageScore((double) totalScore / ratings.size())
                .build();
    }
}
