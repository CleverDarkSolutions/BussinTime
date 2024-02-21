package pl.bussintime.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import pl.bussintime.backend.controller.CommentController;
import pl.bussintime.backend.model.Comment;
import pl.bussintime.backend.model.dto.CommentRequest;
import pl.bussintime.backend.model.dto.EditCommentRequest;
import pl.bussintime.backend.service.CommentService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class CommentControllerTest {

    @InjectMocks
    private CommentController commentController;

    @Mock
    private CommentService commentService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllComments() {
        List<Comment> comments = new ArrayList<>();

        when(commentService.getAllComments()).thenReturn(comments);

        ResponseEntity<List<Comment>> responseEntity = commentController.getAllComments();

        assertEquals(comments, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(commentService, times(1)).getAllComments();
    }

    @Test
    public void testGetCommentById() {
        Long commentId = 1L;
        Comment comment = new Comment();
        when(commentService.getCommentById(commentId)).thenReturn(comment);

        ResponseEntity<Comment> responseEntity = commentController.getCommentById(commentId);

        assertEquals(comment, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(commentService, times(1)).getCommentById(commentId);
    }

    @Test
    public void testGetCommentsByPostId() {
        Long postId = 1L;
        List<Comment> comments = new ArrayList<>();

        when(commentService.getCommentsByPostId(postId)).thenReturn(comments);

        ResponseEntity<List<Comment>> responseEntity = commentController.getCommentsByPostId(postId);

        assertEquals(comments, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(commentService, times(1)).getCommentsByPostId(postId);
    }

    @Test
    public void testGetCommentsByAccountId() {
        Long accountId = 1L;
        List<Comment> comments = new ArrayList<>();

        when(commentService.getCommentsByAccountId(accountId)).thenReturn(comments);

        ResponseEntity<List<Comment>> responseEntity = commentController.getCommentsByAccountId(accountId);

        assertEquals(comments, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(commentService, times(1)).getCommentsByAccountId(accountId);
    }

    
    @Test
public void testCreateComment() {
    String text = "Test comment text";
    Long accountId = 1L;
    Long postId = 2L;

    CommentRequest commentRequest = new CommentRequest(text, accountId, postId);

    Comment newComment = new Comment();
    when(commentService.createComment(commentRequest)).thenReturn(newComment);

    ResponseEntity<Comment> responseEntity = commentController.createComment(commentRequest);

    assertEquals(newComment, responseEntity.getBody());
    assertEquals(200, responseEntity.getStatusCodeValue());
    verify(commentService, times(1)).createComment(commentRequest);
}

    
    

    @Test
    public void testUpdateComment() {
        Long commentId = 1L;
        String updatedText = "Updated comment text";
        EditCommentRequest editCommentRequest = new EditCommentRequest(updatedText);
    
        Comment updatedComment = new Comment();
    
        when(commentService.updateComment(editCommentRequest, commentId)).thenReturn(updatedComment);
    
        ResponseEntity<Comment> responseEntity = commentController.updateComment(editCommentRequest, commentId);
    
        assertEquals(updatedComment, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(commentService, times(1)).updateComment(editCommentRequest, commentId);
    }
    
    

    @Test
    public void testDeleteCommentById() {
        Long commentId = 1L;

        commentController.deleteCommentById(commentId);

        verify(commentService, times(1)).deleteCommentById(commentId);
    }
}
