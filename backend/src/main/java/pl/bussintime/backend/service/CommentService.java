package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ResourceNotFoundException;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.Comment;
import pl.bussintime.backend.model.Post;
import pl.bussintime.backend.model.Reaction;
import pl.bussintime.backend.model.dto.CommentRequest;
import pl.bussintime.backend.model.dto.EditCommentRequest;
import pl.bussintime.backend.model.enums.ReactionEntityType;
import pl.bussintime.backend.repository.AccountRepository;
import pl.bussintime.backend.repository.CommentRepository;
import pl.bussintime.backend.repository.ReactionRepository;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostService postService;
    private final AccountRepository accountRepository;
    private final ReactionService reactionService;
    private final ReactionRepository reactionRepository;

    public CommentService(CommentRepository commentRepository,
                          PostService postService,
                          AccountRepository accountRepository,
                          ReactionService reactionService,
                          ReactionRepository reactionRepository) {
        this.commentRepository = commentRepository;
        this.postService = postService;
        this.accountRepository = accountRepository;
        this.reactionService = reactionService;
        this.reactionRepository = reactionRepository;
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(Long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with ID: " + id));
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public List<Comment> getCommentsByAccountId(Long accountId) {
        return commentRepository.findByAccountId(accountId);
    }

    public void deleteReactionsFromComment(Long id) {
        List<Reaction> reactions = reactionService.getAllReactionsFromEntity(ReactionEntityType.COMMENT, id);

        reactionRepository.deleteAll(reactions);
    }

    public void deleteCommentById(Long id) {
        getCommentById(id);
        deleteReactionsFromComment(id);

        commentRepository.deleteById(id);
    }

    public Comment createComment(CommentRequest commentRequest) {
        Post post = postService.getPostById(commentRequest.postId());
        Account account = ServiceUtils.getAccountByIdOrThrow(accountRepository, commentRequest.accountId());

        Comment newComment = new Comment();

        newComment.setAccount(account);
        newComment.setPost(post);
        newComment.setContent(commentRequest.content());
        newComment.setCreationDate(LocalDateTime.now());

        return commentRepository.save(newComment);
    }

    public Comment updateComment(EditCommentRequest editCommentRequest, Long commentId) {
        Comment updatedComment = getCommentById(commentId);

        updatedComment.setContent(editCommentRequest.content());

        return commentRepository.save(updatedComment);
    }
}
