package pl.bussintime.backend.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.Event;
import pl.bussintime.backend.model.enums.AccountEventStatus;
import pl.bussintime.backend.model.enums.EventJoinRequestStatus;
import pl.bussintime.backend.service.EventService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/event")
@Validated
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/getEventsByAccount/{accountId}")
    public ResponseEntity<List<Event>> getEventsByAccount(@PathVariable Long accountId) {
        List<Event> events = eventService.getEventsByAccount(accountId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/getEventParticipants/{eventId}")
    public ResponseEntity<List<Account>> getEventParticipants(@PathVariable Long eventId) {
        List<Account> accounts = eventService.getEventParticipants(eventId);
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/getPublicAndPersonalEvents/{accountId}")
    public ResponseEntity<List<Event>> getPublicAndPersonalEvents(@PathVariable Long accountId) {
        List<Event> events = eventService.getPublicAndPersonalEvents(accountId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/getEventsWhereAccountIsHost/{accountId}")
    public ResponseEntity<List<Event>> getEventsWhereAccountIsHost(@PathVariable Long accountId,
                                                          @RequestParam AccountEventStatus accountEventStatus) {
        List<Event> events = eventService.getEventsByAccountEventStatus(accountId, accountEventStatus);
        return ResponseEntity.ok(events);
    }

    @GetMapping("{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Long eventId) {
        Event event = eventService.getEventById(eventId);
        return ResponseEntity.ok(event);
    }

    @GetMapping("host/{eventId}")
    public ResponseEntity<Map<String, Object>> getHostAccountByEventId(@PathVariable Long eventId) {
        Map<String, Object> hostAndEvent = eventService.getHostAccountAndEventByEventId(eventId);
        return ResponseEntity.ok(hostAndEvent);
    }

    @GetMapping("isParticipating/{accountId}/{eventId}")
    public ResponseEntity<Boolean> checkIfAccountIsInEvent(@PathVariable Long accountId,
                                                           @PathVariable Long eventId) {
        return ResponseEntity.ok(eventService.checkIfAccountIsInEvent(accountId, eventId));
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody @Valid Event event,
                                             @RequestParam Long accountId) {
        Event newEvent = eventService.createEvent(event, accountId);
        return ResponseEntity.ok(newEvent);
    }

    @PostMapping("/joinEvent/{accountId}/{eventId}")
    public ResponseEntity<String> joinEvent(@PathVariable Long accountId,
                                            @PathVariable Long eventId) {
        eventService.joinEvent(eventId, accountId);
        return ResponseEntity.ok("Account with id: " + accountId + " joined event with id " + eventId);
    }

    @PostMapping("/inviteToEvent/{eventId}")
    public ResponseEntity<String> createEventInvitation(@PathVariable Long eventId,
                                                        @RequestParam Long invitedAccountId) {
        String message = eventService.createEventInvitation(invitedAccountId, eventId);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/requestToJoinEvent")
    public ResponseEntity<String> createJoinEventRequest(@RequestParam Long eventId,
                                                         @RequestParam Long requesterId) {
        String message = eventService.createJoinEventRequest(eventId, requesterId);
        return ResponseEntity.ok(message);
    }

    @PutMapping("{eventId}")
    public ResponseEntity<Event> updateEvent(@RequestBody @Valid Event event,
                                             @PathVariable Long eventId) {
        Event updatedEvent = eventService.updateEvent(event, eventId);
        return ResponseEntity.ok(updatedEvent);
    }

    @PutMapping("/setEventInvitationRequestStatus")
    public ResponseEntity<String> setJoinEventRequestStatus(@RequestParam EventJoinRequestStatus eventJoinRequestStatus,
                                                            @RequestParam Long eventJoinRequestId) {
        String message = eventService.setJoinEventRequestStatus(
                eventJoinRequestStatus, eventJoinRequestId);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/status/{eventId}")
    public ResponseEntity<AccountEventStatus> updateAccountStatus(@RequestParam AccountEventStatus accountEventStatus,
                                                                  @RequestParam String accountName,
                                                                  @PathVariable Long eventId) {
        AccountEventStatus newAccountEventStatus = eventService.updateAccountStatus(accountName, eventId, accountEventStatus);
        return ResponseEntity.ok(newAccountEventStatus);
    }

    @DeleteMapping("/removeFromEvent/{eventId}/{accountId}")
    public void kickFromEvent(@PathVariable Long eventId,
                              @PathVariable Long accountId) {
        eventService.kickFromEvent(eventId, accountId);
    }

    @DeleteMapping("{eventId}")
    public void deleteEventById(@PathVariable Long eventId) {
        eventService.deleteEventById(eventId);
    }

    @DeleteMapping("/rejectInvitation")
    public void rejectInvitationToEvent(@RequestParam Long eventId,
                                        @RequestParam Long accountId) {
        eventService.rejectInvitationToEvent(eventId, accountId);
    }
}
