package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ResourceNotFoundException;
import pl.bussintime.backend.model.Reaction;
import pl.bussintime.backend.model.dto.ReactionCountResponse;
import pl.bussintime.backend.model.enums.ReactionEntityType;
import pl.bussintime.backend.model.enums.ReactionType;
import pl.bussintime.backend.repository.AccountRepository;
import pl.bussintime.backend.repository.ReactionRepository;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReactionService {
    private final ReactionRepository reactionRepository;
    private final AccountRepository accountRepository;

    public ReactionService(ReactionRepository reactionRepository, AccountRepository accountRepository) {
        this.reactionRepository = reactionRepository;
        this.accountRepository = accountRepository;
    }

    public List<Reaction> getAllReactions() {
        return reactionRepository.findAll();
    }

    public Reaction getReactionById(Long id) {
        return reactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reaction not found with ID: " + id));
    }

    public List<Reaction> getAllReactionsFromEntity(ReactionEntityType reactionEntityType, Long entityId) {
        return reactionRepository.findByEntityTypeAndEntityId(reactionEntityType, entityId);
    }

    public List<ReactionCountResponse> getReactionCountsByEntity(Long entityId, ReactionEntityType reactionEntityType) {
        List<Reaction> reactions = reactionRepository.findByEntityTypeAndEntityId(reactionEntityType, entityId);

        Map<ReactionType, Integer> reactionCounts = new HashMap<>();

        for (Reaction reaction : reactions) {
            reactionCounts.merge(reaction.getReactionType(), 1, Integer::sum);
        }

        return reactionCounts.entrySet().stream()
                .map(entry -> new ReactionCountResponse(entry.getKey(), entry.getValue()))
                .toList();
    }

    public void deleteReactionById(Long id) {
        getReactionById(id);
        reactionRepository.deleteById(id);
    }

    public Reaction createReaction(ReactionEntityType reactionEntityType, Long accountId, Long entityId, ReactionType reactionType) {
        Reaction existingReaction = reactionRepository.findByAccountIdAndEntityIdAndEntityType(
                accountId, entityId, reactionEntityType);

        if (existingReaction != null) {
            if (existingReaction.getReactionType() == reactionType) {

                return existingReaction;
            }

            existingReaction.setReactionType(reactionType);

            return reactionRepository.save(existingReaction);
        }

        Reaction reaction = new Reaction();

        reaction.setAccount(ServiceUtils.getAccountByIdOrThrow(accountRepository, accountId));
        reaction.setEntityId(entityId);
        reaction.setReactionType(reactionType);

        switch (reactionEntityType) {
            case POST -> reaction.setEntityType(ReactionEntityType.POST);
            case COMMENT -> reaction.setEntityType(ReactionEntityType.COMMENT);
        }

        return reactionRepository.save(reaction);
    }

    public Reaction updateReaction(ReactionType reactionType, Long reactionId) {
        Reaction updatedReaction = getReactionById(reactionId);
        updatedReaction.setReactionType(reactionType);

        return reactionRepository.save(updatedReaction);
    }
}
