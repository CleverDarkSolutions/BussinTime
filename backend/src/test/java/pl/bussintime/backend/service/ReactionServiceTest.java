//package pl.bussintime.backend.service;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import pl.bussintime.backend.exception.ResourceNotFoundException;
//import pl.bussintime.backend.model.Account;
//import pl.bussintime.backend.model.Reaction;
//import pl.bussintime.backend.model.enums.ReactionEntityType;
//import pl.bussintime.backend.model.enums.ReactionType;
//import pl.bussintime.backend.repository.ReactionRepository;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//public class ReactionServiceTest {
//
//    private ReactionService reactionService;
//
//    @Mock
//    private ReactionRepository reactionRepository;
//
//    @Mock
//    private AccountService accountService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//        reactionService = new ReactionService(reactionRepository, accountService);
//    }
//
//    @Test
//    public void testGetAllReactions() {
//        List<Reaction> reactions = new ArrayList<>();
//        when(reactionRepository.findAll()).thenReturn(reactions);
//
//        List<Reaction> result = reactionService.getAllReactions();
//
//        assertSame(reactions, result);
//    }
//
//    @Test
//    public void testGetReactionById() {
//        Long reactionId = 1L;
//        Reaction reaction = new Reaction();
//        when(reactionRepository.findById(reactionId)).thenReturn(Optional.of(reaction));
//
//        Reaction result = reactionService.getReactionById(reactionId);
//
//        assertSame(reaction, result);
//    }
//
//    @Test
//    public void testGetReactionByIdNotFound() {
//        Long reactionId = 1L;
//        when(reactionRepository.findById(reactionId)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> reactionService.getReactionById(reactionId));
//    }
//
//    @Test
//    public void testGetAllReactionsFromEntity() {
//        Long entityId = 1L;
//        ReactionEntityType reactionEntityType = ReactionEntityType.POST;
//        List<Reaction> reactions = new ArrayList<>();
//        when(reactionRepository.findByEntityTypeAndEntityId(reactionEntityType.name(), entityId)).thenReturn(reactions);
//
//        List<Reaction> result = reactionService.getAllReactionsFromEntity(reactionEntityType, entityId);
//
//        assertSame(reactions, result);
//    }
//
//    @Test
//    public void testDeleteReactionById() {
//        Long reactionId = 1L;
//        Reaction reaction = new Reaction();
//        when(reactionRepository.findById(reactionId)).thenReturn(Optional.of(reaction));
//
//        reactionService.deleteReactionById(reactionId);
//
//        verify(reactionRepository).deleteById(reactionId);
//    }
//
//    @Test
//    public void testDeleteReactionByIdNotFound() {
//        Long reactionId = 1L;
//        when(reactionRepository.findById(reactionId)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> reactionService.deleteReactionById(reactionId));
//    }
//
//    @Test
//    public void testUpdateReaction() {
//        Long reactionId = 1L;
//        ReactionType reactionType = ReactionType.ANGRY;
//        Reaction updatedReaction = new Reaction();
//        when(reactionRepository.findById(reactionId)).thenReturn(Optional.of(updatedReaction));
//        when(reactionRepository.save(any())).thenReturn(updatedReaction);
//
//        Reaction result = reactionService.updateReaction(reactionType, reactionId);
//
//        assertSame(updatedReaction, result);
//        assertEquals(reactionType, result.getReactionType());
//    }
//}