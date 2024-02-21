package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ResourceAlreadyTaken;
import pl.bussintime.backend.exception.ResourceNotFoundException;
import pl.bussintime.backend.model.*;
import pl.bussintime.backend.model.enums.NotificationStatus;
import pl.bussintime.backend.model.enums.NotificationType;
import pl.bussintime.backend.repository.*;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final FriendInviteNotificationRepository friendInviteNotificationRepository;
    private final EventInviteNotificationRepository eventInviteNotificationRepository;
    private final AccountRepository accountRepository;
    private final EventJoinRequestNotificationRepository eventJoinRequestNotificationRepository;

    public NotificationService(NotificationRepository notificationRepository,
                               FriendInviteNotificationRepository friendInviteNotificationRepository,
                               EventInviteNotificationRepository eventInviteNotificationRepository,
                               AccountRepository accountRepository,
                               EventJoinRequestNotificationRepository eventJoinRequestNotificationRepository) {
        this.notificationRepository = notificationRepository;
        this.friendInviteNotificationRepository = friendInviteNotificationRepository;
        this.eventInviteNotificationRepository = eventInviteNotificationRepository;
        this.accountRepository = accountRepository;
        this.eventJoinRequestNotificationRepository = eventJoinRequestNotificationRepository;
    }

    public Notification setNotificationToNoticed(Long notificationId) {
        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);

        if (optionalNotification.isPresent()) {
            Notification notification = optionalNotification.get();
            notification.setNotificationStatus(NotificationStatus.NOTICED);
            return notificationRepository.save(notification);
        }

        throw new ResourceNotFoundException("Notification not found with ID: " + notificationId);
    }

    public List<Notification> getListOfNotificationsByAccountIdExcludingMessages(Long accountId) {
        return notificationRepository.findByRecipientIdAndNotificationTypeNot(accountId, NotificationType.MESSAGE);
    }

    public void createInviteFriendNotification(Long recipientAccountId, Friendship friendship) {
        Account recipientAccount = ServiceUtils.getAccountByIdOrThrow(accountRepository, recipientAccountId);

        FriendInviteNotification friendInviteNotification = new FriendInviteNotification();

        friendInviteNotification.setFriendship(friendship);
        friendInviteNotification.setRecipient(recipientAccount);
        friendInviteNotification.setTimestamp(LocalDateTime.now());
        friendInviteNotification.setMessage("You have new friend invitation from " + friendship.getInitiator().getUsername());
        friendInviteNotification.setNotificationStatus(NotificationStatus.UNNOTICED);
        friendInviteNotification.setNotificationType(NotificationType.FRIEND_INVITE);

        notificationRepository.save(friendInviteNotification);
    }

    public void createJoinRequestNotification(EventJoinRequest eventJoinRequest) {
        Account host = eventJoinRequest.getHost();

        EventJoinRequestNotification eventJoinRequestNotification = new EventJoinRequestNotification();

        eventJoinRequestNotification.setRequest(eventJoinRequest);
        eventJoinRequestNotification.setRecipient(host);
        eventJoinRequestNotification.setTimestamp(LocalDateTime.now());
        eventJoinRequestNotification.setMessage(
                "You have new request to join event " + eventJoinRequest.getEvent().getName() + " from " + eventJoinRequest.getRequester().getUsername());
        eventJoinRequestNotification.setNotificationStatus(NotificationStatus.UNNOTICED);
        eventJoinRequestNotification.setNotificationType(NotificationType.JOIN_REQUEST);

        notificationRepository.save(eventJoinRequestNotification);
    }

    public void createInviteToEventNotification(Long recipientAccountId, Event event) {
        Optional<Notification> notification = eventInviteNotificationRepository.findByEventIdAndRecipientId(event.getId(), recipientAccountId);

        if (notification.isPresent()) throw new ResourceAlreadyTaken("This user has already been invited");

        Account recipientAccount = ServiceUtils.getAccountByIdOrThrow(accountRepository, recipientAccountId);

        EventInviteNotification inviteNotification = new EventInviteNotification();

        inviteNotification.setEvent(event);
        inviteNotification.setRecipient(recipientAccount);
        inviteNotification.setTimestamp(LocalDateTime.now());
        inviteNotification.setMessage("You have invitation to event " + event.getName());
        inviteNotification.setNotificationStatus(NotificationStatus.UNNOTICED);
        inviteNotification.setNotificationType(NotificationType.EVENT_INVITE);

        notificationRepository.save(inviteNotification);
    }

    public void deleteInviteFriendNotificationOnAccept(Long friendshipId, Long recipientId) {
        Optional<Notification> notification = friendInviteNotificationRepository.findByFriendshipIdAndRecipientId(friendshipId, recipientId);

        notification.ifPresent(notificationRepository::delete);
    }

    public void deleteInviteToEventNotification(Long eventId, Long recipientId) {
        Optional<Notification> notification = eventInviteNotificationRepository.findByEventIdAndRecipientId(eventId, recipientId);

        notification.ifPresent(notificationRepository::delete);
    }

    public void deleteEventInviteRequest(Long eventJoinRequestId, Long hostId) {
        Optional<Notification> notification = eventJoinRequestNotificationRepository.findByRequestIdAndRecipientId(eventJoinRequestId, hostId);

        notification.ifPresent(notificationRepository::delete);
    }
}
