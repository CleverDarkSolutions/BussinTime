package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bussintime.backend.model.Reaction;
import pl.bussintime.backend.model.dto.ReactionCountResponse;
import pl.bussintime.backend.model.enums.ReactionEntityType;
import pl.bussintime.backend.model.enums.ReactionType;
import pl.bussintime.backend.service.ReactionService;

import java.util.List;

@RestController
@RequestMapping("/reaction")
public class ReactionController {
    private final ReactionService reactionService;

    public ReactionController(ReactionService reactionService) {
        this.reactionService = reactionService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Reaction>> getAllReactions() {
        List<Reaction> reactions = reactionService.getAllReactions();
        return ResponseEntity.ok(reactions);
    }

    @GetMapping("{reactionId}")
    public ResponseEntity<Reaction> getReactionById(@PathVariable Long reactionId) {
        Reaction reaction = reactionService.getReactionById(reactionId);
        return ResponseEntity.ok(reaction);
    }

    @GetMapping("/entityReactions/{entityId}")
    public ResponseEntity<List<Reaction>> getAllReactionsFromEntity(@RequestParam ReactionEntityType reactionEntityType,
                                                              @PathVariable Long entityId) {
        List<Reaction> reactions = reactionService.getAllReactionsFromEntity(reactionEntityType, entityId);
        return ResponseEntity.ok(reactions);
    }

    @GetMapping("/getReactionCountsByEntity/{entityId}")
    public ResponseEntity<List<ReactionCountResponse>> getReactionCountsByEntity(@PathVariable Long entityId,
                                                                                 @RequestParam ReactionEntityType reactionEntityType) {
        List<ReactionCountResponse> reactions = reactionService.getReactionCountsByEntity(entityId, reactionEntityType);
        return ResponseEntity.ok(reactions);
    }

    @PostMapping
    public ResponseEntity<Reaction> createReaction(@RequestParam ReactionEntityType reactionEntityType,
                                                   @RequestParam ReactionType reactionType,
                                                   @RequestParam Long accountId,
                                                   @RequestParam Long entityId) {
        Reaction newReaction = reactionService.createReaction(reactionEntityType, accountId, entityId, reactionType);
        return ResponseEntity.ok(newReaction);
    }

    @PutMapping("/reactionType/{reactionId}")
    public ResponseEntity<Reaction> updateReactionType(@RequestParam ReactionType reactionType,
                                                       @PathVariable Long reactionId) {
        Reaction updatedReaction = reactionService.updateReaction(reactionType, reactionId);
        return ResponseEntity.ok(updatedReaction);

    }

    @DeleteMapping("{reactionId}")
    public void deleteReactionById(@PathVariable Long reactionId) {
        reactionService.deleteReactionById(reactionId);
    }
}
