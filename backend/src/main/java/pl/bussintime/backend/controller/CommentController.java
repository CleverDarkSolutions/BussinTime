package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bussintime.backend.model.Comment;
import pl.bussintime.backend.model.dto.CommentRequest;
import pl.bussintime.backend.model.dto.EditCommentRequest;
import pl.bussintime.backend.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    @GetMapping("{commentId}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long commentId) {
        Comment comment = commentService.getCommentById(commentId);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("getCommentsByPost/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("getCommentsByAccount/{accountId}")
    public ResponseEntity<List<Comment>> getCommentsByAccountId(@PathVariable Long accountId) {
        List<Comment> comments = commentService.getCommentsByAccountId(accountId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequest commentRequest) {
        Comment newComment = commentService.createComment(commentRequest);
        return ResponseEntity.ok(newComment);
    }

    @PutMapping("{commentId}")
    public ResponseEntity<Comment> updateComment(@RequestBody EditCommentRequest editCommentRequest,
                                                 @PathVariable Long commentId) {
        Comment updatedComment = commentService.updateComment(editCommentRequest, commentId);
        return ResponseEntity.ok(updatedComment);
    }

    @DeleteMapping("{commentId}")
    public void deleteCommentById(@PathVariable Long commentId) {
        commentService.deleteCommentById(commentId);
    }
}