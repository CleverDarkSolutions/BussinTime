//package pl.bussintime.backend.service;
//
//import pl.bussintime.backend.repository.CommentRepository;
//import pl.bussintime.backend.model.Comment;
//import pl.bussintime.backend.model.Post;
//import pl.bussintime.backend.model.Account;
//import pl.bussintime.backend.model.dto.CommentRequest;
//import pl.bussintime.backend.model.dto.EditCommentRequest;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.*;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//class CommentServiceTest {
//
//    @Mock
//    private CommentRepository commentRepository;
//    @Mock
//    private PostService postService;
//    @Mock
//    private AccountService accountService;
//
//    @InjectMocks
//    private CommentService commentService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testGetAllComments() {
//        List<Comment> comments = new ArrayList<>();
//        when(commentRepository.findAll()).thenReturn(comments);
//
//        List<Comment> result = commentService.getAllComments();
//
//        assertNotNull(result);
//        assertEquals(comments, result);
//    }
//
//    @Test
//    void testGetCommentById() {
//        Long commentId = 1L;
//        Comment comment = new Comment();
//        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
//
//        Comment result = commentService.getCommentById(commentId);
//
//        assertNotNull(result);
//        assertEquals(comment, result);
//    }
//
//    @Test
//    void testGetCommentsByPostId() {
//        Long postId = 1L;
//        List<Comment> comments = new ArrayList<>();
//        when(commentRepository.findByPostId(postId)).thenReturn(comments);
//
//        List<Comment> result = commentService.getCommentsByPostId(postId);
//
//        assertNotNull(result);
//        assertEquals(comments, result);
//    }
//
//    @Test
//    void testGetCommentsByAccountId() {
//        Long accountId = 1L;
//        List<Comment> comments = new ArrayList<>();
//        when(commentRepository.findByAccountId(accountId)).thenReturn(comments);
//
//        List<Comment> result = commentService.getCommentsByAccountId(accountId);
//
//        assertNotNull(result);
//        assertEquals(comments, result);
//    }
//
//    @Test
//    void testDeleteCommentById() {
//        Long commentId = 1L;
//        Comment comment = new Comment();
//        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
//
//        assertDoesNotThrow(() -> commentService.deleteCommentById(commentId));
//        verify(commentRepository, times(1)).deleteById(commentId);
//    }
//
//
//    @Test
//    void testUpdateComment() {
//        Long commentId = 1L;
//        EditCommentRequest editCommentRequest = new EditCommentRequest("Updated content");
//        Comment comment = new Comment();
//        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
//        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
//
//        Comment result = commentService.updateComment(editCommentRequest, commentId);
//
//        assertNotNull(result);
//        assertEquals("Updated content", result.getContent());
//    }
//}
