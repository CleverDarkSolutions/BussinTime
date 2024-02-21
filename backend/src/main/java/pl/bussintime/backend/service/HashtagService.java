package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.model.Hashtag;
import pl.bussintime.backend.model.enums.HashtagEntityType;
import pl.bussintime.backend.repository.HashtagRepository;

import java.util.List;

@Service
public class HashtagService {
 private final HashtagRepository hashtagRepository;

    public HashtagService(HashtagRepository hashtagRepository) {
        this.hashtagRepository = hashtagRepository;
    }

    public Hashtag addHashtag(Long entityId, HashtagEntityType hashtagEntityType, String name) {
        Hashtag hashtag = Hashtag.builder()
                .entityId(entityId)
                .entityType(hashtagEntityType)
                .name(name)
                .build();

        return hashtagRepository.save(hashtag);
    }

    public List<Hashtag> getHashtagsByEntity(Long entityId, HashtagEntityType hashtagEntityType) {
        return hashtagRepository.findByEntityTypeAndEntityId(hashtagEntityType, entityId);
    }

    public String deleteHashtagByEntity(Long entityId, HashtagEntityType hashtagEntityType) {
        hashtagRepository.findByEntityTypeAndEntityId(hashtagEntityType, entityId);

        return "Hashtag has been deleted";
    }
}
