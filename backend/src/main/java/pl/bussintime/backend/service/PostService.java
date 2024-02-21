package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ResourceNotFoundException;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.Event;
import pl.bussintime.backend.model.Post;
import pl.bussintime.backend.model.Reaction;
import pl.bussintime.backend.model.dto.EditPostRequest;
import pl.bussintime.backend.model.dto.PostRequest;
import pl.bussintime.backend.model.enums.ReactionEntityType;
import pl.bussintime.backend.repository.AccountRepository;
import pl.bussintime.backend.repository.PostRepository;
import pl.bussintime.backend.repository.ReactionRepository;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final EventService eventService;
    private final AccountRepository accountRepository;
    private final ReactionService reactionService;
    private final ReactionRepository reactionRepository;

    public PostService(PostRepository postRepository,
                       EventService eventService,
                       AccountRepository accountRepository,
                       ReactionService reactionService,
                       ReactionRepository reactionRepository) {
        this.postRepository = postRepository;
        this.eventService = eventService;
        this.accountRepository = accountRepository;
        this.reactionService = reactionService;
        this.reactionRepository = reactionRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with ID: " + id));
    }

    public List<Post> getPostsByEventId(Long eventId) {
        return postRepository.findByEventId(eventId);
    }

    public List<Post> getPostsByAccountId(Long accountId) {
        return postRepository.findByAccountId(accountId);
    }

    public void deleteReactionsFromPost(Long id) {
        List<Reaction> reactions = reactionService.getAllReactionsFromEntity(ReactionEntityType.POST, id);

        reactionRepository.deleteAll(reactions);
    }

    public void deletePostById(Long id) {
        getPostById(id);
        deleteReactionsFromPost(id);

        postRepository.deleteById(id);
    }

    public Post createPost(PostRequest postRequest) {
        Event event = eventService.getEventById(postRequest.eventId());
        Account account = ServiceUtils.getAccountByIdOrThrow(accountRepository, postRequest.accountId());

        Post newPost = Post
                .builder()
                .account(account)
                .event(event)
                .creationDate(LocalDateTime.now())
                .content(postRequest.content())
                .title(postRequest.title())
                .build();

        return postRepository.save(newPost);
    }

    public Post updatePost(EditPostRequest editPostRequest, Long postId) {
        Post postToUpdate = getPostById(postId);

        postToUpdate.setContent(editPostRequest.content());
        postToUpdate.setTitle(editPostRequest.title());

        return postRepository.save(postToUpdate);
    }
}
