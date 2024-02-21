package pl.bussintime.backend.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ApiRequestException;
import pl.bussintime.backend.exception.ResourceAlreadyTaken;
import pl.bussintime.backend.exception.ResourceNotFoundException;
import pl.bussintime.backend.model.*;
import pl.bussintime.backend.model.dto.EventVisibility;
import pl.bussintime.backend.model.enums.AccountEventStatus;
import pl.bussintime.backend.model.enums.EventJoinRequestStatus;
import pl.bussintime.backend.repository.*;
import pl.bussintime.backend.service.utility.ServiceUtils;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final EventLocalizationRepository eventLocalizationRepository;
    private final AccountEventRepository accountEventRepository;
    private final AccountRepository accountRepository;
    private final NotificationService notificationService;
    private final EvenJointRequestService evenJointRequestService;
    private final EventJoinRequestRepository eventJoinRequestRepository;

    public EventService(EventRepository eventRepository,
                        EventLocalizationRepository eventLocalizationRepository,
                        AccountEventRepository accountEventRepository,
                        AccountRepository accountRepository,
                        NotificationService notificationService,
                        EvenJointRequestService evenJointRequestService,
                        EventJoinRequestRepository eventJoinRequestRepository) {
        this.eventRepository = eventRepository;
        this.eventLocalizationRepository = eventLocalizationRepository;
        this.accountEventRepository = accountEventRepository;
        this.accountRepository = accountRepository;
        this.notificationService = notificationService;
        this.evenJointRequestService = evenJointRequestService;
        this.eventJoinRequestRepository = eventJoinRequestRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + id));
    }

    public Map<String, Object> getHostAccountAndEventByEventId(Long eventId) {
        AccountEvent accountEvent = getHostAccountEventByEventId(eventId);

        Account host = accountEvent.getAccount();
        Event event = accountEvent.getEvent();

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("host", host);
        resultMap.put("event", event);

        return resultMap;
    }

    public List<Event> getEventsByAccountEventStatus(Long accountId, AccountEventStatus accountEventStatus) {
        Optional<List<AccountEvent>> accountEventsOptional = accountEventRepository.findByAccountIdAndAccountStatus(accountId, accountEventStatus);

        if (accountEventsOptional.isPresent()) {
            List<AccountEvent> accountEvents = accountEventsOptional.get();

            return accountEvents.stream()
                    .map(AccountEvent::getEvent)
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }

    @Transactional
    public void deleteEventById(Long id) {
        getEventById(id);

        eventRepository.deleteById(id);
    }

    @Transactional
    public Event createEvent(Event newEvent, Long accountId) {
        isEventNameTaken(newEvent.getName());

        newEvent.setIsActive(true);
        newEvent.setLocalization(findExistingLocalizationOrCreateNew(newEvent.getLocalization()));

        newEvent = eventRepository.save(newEvent);

        createAccountEventRelation(newEvent.getId(), accountId, AccountEventStatus.HOST);

        return newEvent;
    }

    public Event updateEvent(Event updatedEvent, Long eventId) {
        Event existingEvent = getEventById(eventId);

        if (!updatedEvent.getName().equals(existingEvent.getName())) {
            isEventNameTaken(updatedEvent.getName());
        }

        BeanUtils.copyProperties(updatedEvent, existingEvent, "id");

        EventLocalization existingLocalization = findExistingLocalizationOrCreateNew(updatedEvent.getLocalization());
        existingEvent.setLocalization(existingLocalization);

        return eventRepository.save(existingEvent);
    }

    public Boolean checkIfAccountIsInEvent(Long accountId, Long eventId) {
        Optional<AccountEvent> accountEvent = accountEventRepository.findByAccountIdAndEventId(accountId, eventId);

        return accountEvent.isPresent();
    }

    private EventLocalization findExistingLocalizationOrCreateNew(EventLocalization eventLocalization) {
        //Now we compare by latitude and longitude, might need to adjust that in the future
        EventLocalization existingLocalization = eventLocalizationRepository
                .findByLatitudeAndLongitude(eventLocalization.getLatitude(), eventLocalization.getLongitude());

        return existingLocalization != null ? existingLocalization : eventLocalizationRepository.save(eventLocalization);
    }

    public void createAccountEventRelation(Long eventId, Long accountId, AccountEventStatus accountEventStatus) {
        Event event = getEventById(eventId);
        Account account = ServiceUtils.getAccountByIdOrThrow(accountRepository, accountId);

        AccountEvent accountEvent = new AccountEvent();

        accountEvent.setEvent(event);
        accountEvent.setAccount(account);
        accountEvent.setAccountStatus(accountEventStatus);

        accountEventRepository.save(accountEvent);
    }

    public void joinEvent(Long eventId, Long accountId) {
        checkIfAccountIsAlreadyPartOfEvent(accountId, eventId);

        notificationService.deleteInviteToEventNotification(eventId, accountId);

        createAccountEventRelation(eventId, accountId, AccountEventStatus.GUEST);
    }

    public void rejectInvitationToEvent(Long eventId, Long accountId) {
        notificationService.deleteInviteToEventNotification(eventId, accountId);
    }

    public AccountEventStatus updateAccountStatus(String name, Long eventId, AccountEventStatus accountEventStatus) {
        Account account = ServiceUtils.getAccountByUserNameOrThrow(accountRepository, name);

        AccountEvent accountEvent = getAccountEvent(account.getId(), eventId);

        accountEvent.setAccountStatus(accountEventStatus);
        accountEventRepository.save(accountEvent);

        return accountEventStatus;
    }

    public String createEventInvitation(Long receiverId, Long eventId) {
        checkIfAccountIsAlreadyPartOfEvent(receiverId, eventId);

        Event event = getEventById(eventId);
        notificationService.createInviteToEventNotification(receiverId, event);

        Account recipientAccount = ServiceUtils.getAccountByIdOrThrow(accountRepository, receiverId);

        return "You have invited user " + recipientAccount.getUsername() + " to event " + event.getName();
    }

    @Transactional
    public String createJoinEventRequest(Long eventId, Long requesterId) {
        Optional<AccountEvent> accountEventOptional = accountEventRepository.findHostByEventId(eventId);

        if (accountEventOptional.isPresent()) {
            Event event = accountEventOptional.get().getEvent();
            Account host = accountEventOptional.get().getAccount();
            Account requester = ServiceUtils.getAccountByIdOrThrow(accountRepository, requesterId);

            if (Objects.equals(host.getId(), requesterId)) {
                throw new ApiRequestException("Host can't request to join own event");
            }

            EventJoinRequest eventJoinRequest = evenJointRequestService.createJoinEventRequest(host, requester, event);
            notificationService.createJoinRequestNotification(eventJoinRequest);

            return "Request to join event " + event.getName() + "has been sent to user " + host.getUsername();
        } else {
            throw new ResourceNotFoundException("Can't find related host");
        }
    }

    @Transactional
    public String setJoinEventRequestStatus(EventJoinRequestStatus eventJoinRequestStatus, Long eventJoinRequestId) {
        EventJoinRequest eventJoinRequest = eventJoinRequestRepository.getReferenceById(eventJoinRequestId);
        eventJoinRequest.setStatus(eventJoinRequestStatus);

        if (eventJoinRequestStatus.equals(EventJoinRequestStatus.ACCEPTED)) {
            createAccountEventRelation(eventJoinRequest.getEvent().getId(), eventJoinRequest.getRequester().getId(), AccountEventStatus.GUEST);



            notificationService.deleteEventInviteRequest(eventJoinRequestId, eventJoinRequest.getHost().getId());
        } else {
            notificationService.deleteEventInviteRequest(eventJoinRequestId, eventJoinRequest.getHost().getId());
        }

        return "Status of invite changed to " + eventJoinRequestStatus;
    }

    public void kickFromEvent(Long eventId, Long accountId) {
        getEventById(eventId);
        ServiceUtils.getAccountByIdOrThrow(accountRepository, accountId);

        AccountEvent accountEvent = getAccountEvent(accountId, eventId);
        AccountEvent hostAccountEvent = getHostAccountEventByEventId(eventId);

        if (accountEvent.getAccount().equals(hostAccountEvent.getAccount())) {
            deleteEventById(eventId);
        }

        accountEventRepository.delete(accountEvent);
    }

    public List<Event> getPublicAndPersonalEvents(Long accountId) {
        List<Event> publicEvents = eventRepository.findByEventVisibility(EventVisibility.PUBLIC);
        List<AccountEvent> participatingEvents = accountEventRepository.findByAccountId(accountId);

        List<Event> resultEvents = publicEvents.stream()
                .filter(event -> !containsEvent(participatingEvents, event))
                .collect(Collectors.toList());

        resultEvents.addAll(participatingEvents.stream().map(AccountEvent::getEvent).toList());

        return resultEvents;
    }

    private boolean containsEvent(List<AccountEvent> accountEvents, Event event) {
        return accountEvents.stream().anyMatch(accountEvent -> accountEvent.getEvent().equals(event));
    }

    public List<Event> getEventsByAccount(Long accountId) {
        List<AccountEvent> accountEvents = accountEventRepository.findByAccountId(accountId);
        return getRelatedItems(accountEvents, AccountEvent::getEvent);
    }

    public List<Account> getEventParticipants(Long eventId) {
        List<AccountEvent> accountEvents = accountEventRepository.findByEventId(eventId);
        return getRelatedItems(accountEvents, AccountEvent::getAccount);
    }

    private <T, U> List<U> getRelatedItems(List<AccountEvent> accountEvents, Function<AccountEvent, T> mapper) {
        List<U> relatedItems = new ArrayList<>();

        if (!accountEvents.isEmpty()) {
            for (AccountEvent accountEvent : accountEvents) {
                T relatedItem = mapper.apply(accountEvent);
                relatedItems.add((U) relatedItem);
            }
        }

        return relatedItems;
    }

    private void isEventNameTaken(String name) {
        if (eventRepository.findByName(name) != null) {
            throw new ResourceAlreadyTaken("Event name is already taken.");
        }
    }

    private AccountEvent getAccountEvent(Long accountId, Long eventId) {
        return accountEventRepository
                .findByAccountIdAndEventId(accountId, eventId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "AccountEvent not found for account id: " + accountId + " and eventId: " + eventId));
    }

    private AccountEvent getHostAccountEventByEventId(Long eventId) {
        return accountEventRepository.findHostByEventId(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + eventId));
    }

    private void checkIfAccountIsAlreadyPartOfEvent(Long accountId, Long eventId) {
        Optional<AccountEvent> accountEvent = accountEventRepository.findByAccountIdAndEventId(accountId, eventId);

        if (accountEvent.isPresent()) throw new ApiRequestException("This account already is assigned to this event");
    }
}