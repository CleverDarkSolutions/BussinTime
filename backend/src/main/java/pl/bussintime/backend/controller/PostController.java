package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bussintime.backend.model.Post;
import pl.bussintime.backend.model.dto.EditPostRequest;
import pl.bussintime.backend.model.dto.PostRequest;
import pl.bussintime.backend.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable Long postId) {
        Post post = postService.getPostById(postId);
        return ResponseEntity.ok(post);
    }

    @GetMapping("getPostsByEvent/{eventId}")
    public ResponseEntity<List<Post>> getPostsByEventId(@PathVariable Long eventId) {
        List<Post> posts = postService.getPostsByEventId(eventId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("getPostsByAccount/{accountId}")
    public ResponseEntity<List<Post>> getPostsByAccountId(@PathVariable Long accountId) {
        List<Post> posts = postService.getPostsByAccountId(accountId);
        return ResponseEntity.ok(posts);
    }


    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest) {
        Post newPost = postService.createPost(postRequest);
        return ResponseEntity.ok(newPost);
    }

    @PutMapping("{postId}")
    public ResponseEntity<Post> updatePost(@RequestBody EditPostRequest editPostRequest,
                                           @PathVariable Long postId) {
        Post updatedPost = postService.updatePost(editPostRequest, postId);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("{postId}")
    public void deletePostById(@PathVariable Long postId) {
        postService.deletePostById(postId);
    }
}
