//package pl.bussintime.backend.service;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import pl.bussintime.backend.exception.ResourceNotFoundException;
//import pl.bussintime.backend.model.Account;
//import pl.bussintime.backend.model.Friendship;
//import pl.bussintime.backend.repository.FriendshipRepository;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//public class FriendshipServiceTest {
//
//    @Mock
//    private FriendshipRepository friendshipRepository;
//
//    @Mock
//    private AccountService accountService;
//
//    @InjectMocks
//    private FriendshipService friendshipService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testGetAllFriendships() {
//        List<Friendship> friendships = new ArrayList<>();
//        when(friendshipRepository.findAll()).thenReturn(friendships);
//
//        List<Friendship> result = friendshipService.getAllFriendships();
//
//        assertEquals(friendships, result);
//    }
//
//    @Test
//    void testGetFriendshipById() {
//        Long friendshipId = 1L;
//        Friendship friendship = new Friendship();
//        when(friendshipRepository.findById(friendshipId)).thenReturn(Optional.of(friendship));
//
//        Friendship result = friendshipService.getFriendshipById(friendshipId);
//
//        assertEquals(friendship, result);
//    }
//
//    @Test
//    void testGetFriendshipByIdNotFound() {
//        Long friendshipId = 1L;
//        when(friendshipRepository.findById(friendshipId)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> friendshipService.getFriendshipById(friendshipId));
//    }
//
//    @Test
//    void testDeleteFriendshipById() {
//        Long friendshipId = 1L;
//        Friendship friendship = new Friendship();
//        when(friendshipRepository.findById(friendshipId)).thenReturn(Optional.of(friendship));
//
//        friendshipService.deleteFriendshipById(friendshipId);
//
//        verify(friendshipRepository).deleteById(friendshipId);
//    }
//
//    @Test
//    void testDeleteFriendshipByIdNotFound() {
//        Long friendshipId = 1L;
//        when(friendshipRepository.findById(friendshipId)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> friendshipService.deleteFriendshipById(friendshipId));
//    }
//
//}
