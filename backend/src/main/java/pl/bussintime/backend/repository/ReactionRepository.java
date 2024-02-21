package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.Reaction;
import pl.bussintime.backend.model.enums.ReactionEntityType;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    List<Reaction> findByEntityTypeAndEntityId(ReactionEntityType entityType, Long entityId);
    Reaction findByAccountIdAndEntityIdAndEntityType(Long accountId, Long entityId, ReactionEntityType reactionEntityType);
}
