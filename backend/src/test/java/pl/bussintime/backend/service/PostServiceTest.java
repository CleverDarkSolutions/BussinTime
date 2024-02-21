//package pl.bussintime.backend.service;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import pl.bussintime.backend.exception.ResourceNotFoundException;
//import pl.bussintime.backend.model.Account;
//import pl.bussintime.backend.model.Event;
//import pl.bussintime.backend.model.Post;
//import pl.bussintime.backend.model.dto.EditPostRequest;
//import pl.bussintime.backend.model.dto.PostRequest;
//import pl.bussintime.backend.repository.PostRepository;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//public class PostServiceTest {
//
//    private PostService postService;
//
//    @Mock
//    private PostRepository postRepository;
//
//    @Mock
//    private EventService eventService;
//
//    @Mock
//    private AccountService accountService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//        postService = new PostService(postRepository, eventService, accountService);
//    }
//
//    @Test
//    public void testGetAllPosts() {
//        List<Post> posts = new ArrayList<>();
//        when(postRepository.findAll()).thenReturn(posts);
//
//        List<Post> result = postService.getAllPosts();
//
//        assertSame(posts, result);
//    }
//
//    @Test
//    public void testGetPostById() {
//        Long postId = 1L;
//        Post post = new Post();
//        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
//
//        Post result = postService.getPostById(postId);
//
//        assertSame(post, result);
//    }
//
//    @Test
//    public void testGetPostByIdNotFound() {
//        Long postId = 1L;
//        when(postRepository.findById(postId)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> postService.getPostById(postId));
//    }
//
//    @Test
//    public void testGetPostsByEventId() {
//        Long eventId = 1L;
//        List<Post> posts = new ArrayList<>();
//        when(postRepository.findByEventId(eventId)).thenReturn(posts);
//
//        List<Post> result = postService.getPostsByEventId(eventId);
//
//        assertSame(posts, result);
//    }
//
//    @Test
//    public void testGetPostsByAccountId() {
//        Long accountId = 1L;
//        List<Post> posts = new ArrayList<>();
//        when(postRepository.findByAccountId(accountId)).thenReturn(posts);
//
//        List<Post> result = postService.getPostsByAccountId(accountId);
//
//        assertSame(posts, result);
//    }
//
//    @Test
//    public void testDeletePostById() {
//        Long postId = 1L;
//        Post post = new Post();
//        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
//
//        postService.deletePostById(postId);
//
//        verify(postRepository).deleteById(postId);
//    }
//
//    @Test
//    public void testDeletePostByIdNotFound() {
//        Long postId = 1L;
//        when(postRepository.findById(postId)).thenReturn(Optional.empty());
//
//        assertThrows(ResourceNotFoundException.class, () -> postService.deletePostById(postId));
//    }
//
//}
