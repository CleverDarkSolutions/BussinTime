package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.Friendship;
import pl.bussintime.backend.model.enums.FriendshipStatus;
import pl.bussintime.backend.service.FriendshipService;

import java.util.List;

@RestController
@RequestMapping("/friendship")
public class FriendshipController {
    private final FriendshipService friendshipService;

    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFriendshipById(@RequestParam Long user1Id,
                                                       @RequestParam Long user2Id) {
        String message = friendshipService.deleteFriendshipById(user1Id, user2Id);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<List<Account>> getFriendshipsByAccountId(@PathVariable Long accountId) {
        List<Account> friends = friendshipService.getFriendAccountsByAccountId(accountId);
        return ResponseEntity.ok(friends);
    }

    @GetMapping("/checkIfFriend")
    public ResponseEntity<Boolean> checkIfIsFriend(@RequestParam Long accountId,
                                                   @RequestParam Long userToCheckId) {
        Boolean status = friendshipService.checkIfIsFriend(accountId, userToCheckId);
        return ResponseEntity.ok(status);
    }

    @PostMapping
    public ResponseEntity<Friendship> createFriendship(@RequestParam Long receiver_id,
                                                       @RequestParam Long initiator_id) {
        Friendship newFriendship = friendshipService.createFriendship(receiver_id, initiator_id);
        return ResponseEntity.ok(newFriendship);
    }

    @PutMapping("/changeStatus/{friendshipId}")
    public ResponseEntity<Friendship> setFriendshipStatus(@PathVariable Long friendshipId,
                                                          @RequestParam FriendshipStatus friendshipStatus) {
        Friendship friendship = friendshipService.setFriendshipStatus(friendshipId, friendshipStatus);
        return ResponseEntity.ok(friendship);
    }
}
