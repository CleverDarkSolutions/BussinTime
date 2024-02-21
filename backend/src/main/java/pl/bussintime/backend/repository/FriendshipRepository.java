package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.Friendship;
import pl.bussintime.backend.model.enums.FriendshipStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    List<Friendship> findByReceiverIdAndStatusOrInitiatorIdAndStatus(
            Long receiverId, FriendshipStatus status1, Long initiatorId, FriendshipStatus status2
    );

    Optional<Friendship> findByReceiverIdAndInitiatorIdAndStatus(Long accountId, Long userToCheckId, FriendshipStatus status);

    boolean existsByInitiatorIdAndReceiverIdOrInitiatorIdAndReceiverId(
            Long initiatorId1, Long receiverId1, Long initiatorId2, Long receiverId2);

}
