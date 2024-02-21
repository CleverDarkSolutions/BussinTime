package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.Hashtag;
import pl.bussintime.backend.model.enums.HashtagEntityType;

import java.util.List;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    List<Hashtag> findByEntityTypeAndEntityId(HashtagEntityType entityType, Long entityId);
}
