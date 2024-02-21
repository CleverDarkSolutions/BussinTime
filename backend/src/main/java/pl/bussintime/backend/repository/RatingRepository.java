package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.Rating;
import pl.bussintime.backend.model.enums.RatedEntityType;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByEntityTypeAndEntityId(RatedEntityType entityType, Long entityId);
    Optional<Rating> findByAccountIdAndEntityIdAndEntityType(Long accountId, Long entityId, RatedEntityType entityType);
}
