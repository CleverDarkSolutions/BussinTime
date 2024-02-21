package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bussintime.backend.model.Hashtag;
import pl.bussintime.backend.model.enums.HashtagEntityType;
import pl.bussintime.backend.service.HashtagService;

import java.util.List;

@RestController
@RequestMapping("/hashtag")
public class HashtagController {
    private final HashtagService hashtagService;

    public HashtagController(HashtagService hashtagService) {
        this.hashtagService = hashtagService;
    }

    @PostMapping
    public ResponseEntity<Hashtag> addHashtag(@RequestParam Long entityId,
                                     @RequestParam HashtagEntityType hashtagEntityType,
                                     @RequestParam String name) {
        Hashtag newHashtag =  hashtagService.addHashtag(entityId, hashtagEntityType, name);
        return ResponseEntity.ok(newHashtag);
    }

    @GetMapping("/entityHashtags/{entityId}")
    public ResponseEntity<List<Hashtag>> getHashtagsByEntity(@RequestParam HashtagEntityType hashtagEntityType,
                                                             @PathVariable Long entityId) {
        List<Hashtag> hashtags = hashtagService.getHashtagsByEntity(entityId, hashtagEntityType);
        return ResponseEntity.ok(hashtags);
    }

    @DeleteMapping("{entityId}")
    public ResponseEntity<String> deleteHashtagByEntity(@RequestParam HashtagEntityType hashtagEntityType,
                                                        @PathVariable Long entityId) {
        String message = hashtagService.deleteHashtagByEntity(entityId, hashtagEntityType);
        return ResponseEntity.ok(message);
    }
}
