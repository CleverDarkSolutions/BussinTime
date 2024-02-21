package pl.bussintime.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ResourceAlreadyTaken;
import pl.bussintime.backend.exception.ResourceNotFoundException;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.Friendship;
import pl.bussintime.backend.model.enums.FriendshipStatus;
import pl.bussintime.backend.repository.AccountRepository;
import pl.bussintime.backend.repository.FriendshipRepository;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final AccountRepository accountRepository;
    private final NotificationService notificationService;

    public FriendshipService(FriendshipRepository friendshipRepository,
                             AccountRepository accountRepository,
                             NotificationService notificationService) {
        this.friendshipRepository = friendshipRepository;
        this.accountRepository = accountRepository;
        this.notificationService = notificationService;
    }

    public Friendship getFriendshipById(Long id) {
        return friendshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Friendship not found with ID: " + id));
    }

    public List<Account> getFriendAccountsByAccountId(Long accountId) {
        List<Friendship> friendships = friendshipRepository.findByReceiverIdAndStatusOrInitiatorIdAndStatus
                (accountId, FriendshipStatus.ACCEPTED, accountId, FriendshipStatus.ACCEPTED);

        List<Account> friendAccounts = new ArrayList<>();

        for (Friendship friendship : friendships) {
            if (friendship.getInitiator().getId().equals(accountId)) {
                friendAccounts.add(friendship.getReceiver());
            } else {
                friendAccounts.add(friendship.getInitiator());
            }
        }

        return friendAccounts;
    }

    public boolean checkIfIsFriend(Long accountId, Long userToCheckId) {
        Optional<Friendship> friendship1 = friendshipRepository.findByReceiverIdAndInitiatorIdAndStatus(
                accountId, userToCheckId, FriendshipStatus.ACCEPTED);

        Optional<Friendship> friendship2 = friendshipRepository.findByReceiverIdAndInitiatorIdAndStatus(
                userToCheckId, accountId, FriendshipStatus.ACCEPTED);

        return friendship1.isPresent() || friendship2.isPresent();
    }

    public String deleteFriendshipById(Long user1Id, Long user2Id) {
        Optional<Friendship> friendship1 = friendshipRepository.findByReceiverIdAndInitiatorIdAndStatus(
                user1Id, user2Id, FriendshipStatus.ACCEPTED);

        Optional<Friendship> friendship2 = friendshipRepository.findByReceiverIdAndInitiatorIdAndStatus(
                user2Id, user1Id, FriendshipStatus.ACCEPTED);

        friendship1.ifPresent(friendshipRepository::delete);
        friendship2.ifPresent(friendshipRepository::delete);

        return "Friendship has been removed";
    }

    public Friendship setFriendshipStatus(Long friendshipId, FriendshipStatus friendshipStatus) {
        Friendship friendship = getFriendshipById(friendshipId);

        friendship.setStatus(friendshipStatus);
        notificationService.deleteInviteFriendNotificationOnAccept(friendshipId, friendship.getReceiver().getId());

        return friendshipRepository.save(friendship);
    }

    @Transactional
    public Friendship createFriendship(Long receiverId, Long senderId) {
        if (friendshipRepository.existsByInitiatorIdAndReceiverIdOrInitiatorIdAndReceiverId(
                senderId, receiverId, receiverId, senderId)) {
            throw new ResourceAlreadyTaken("Friendship already established between the accounts.");
        }

        Friendship newFriendship = new Friendship();

        Account initiator = ServiceUtils.getAccountByIdOrThrow(accountRepository, senderId);
        Account receiver = ServiceUtils.getAccountByIdOrThrow(accountRepository, receiverId);

        newFriendship.setInvitationDate(LocalDateTime.now());
        newFriendship.setStatus(FriendshipStatus.PENDING);

        newFriendship.setInitiator(initiator);
        newFriendship.setReceiver(receiver);

        notificationService.createInviteFriendNotification(receiverId, newFriendship);

        return friendshipRepository.save(newFriendship);
    }
}
