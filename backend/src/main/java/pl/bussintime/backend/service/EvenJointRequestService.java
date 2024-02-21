package pl.bussintime.backend.service;

import org.springframework.stereotype.Service;
import pl.bussintime.backend.exception.ResourceAlreadyTaken;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.model.Event;
import pl.bussintime.backend.model.EventJoinRequest;
import pl.bussintime.backend.model.enums.EventJoinRequestStatus;
import pl.bussintime.backend.repository.EventJoinRequestRepository;

import java.time.LocalDateTime;

@Service
public class EvenJointRequestService {
    private final EventJoinRequestRepository eventJoinRequestRepository;

    public EvenJointRequestService(EventJoinRequestRepository eventJoinRequestRepository) {
        this.eventJoinRequestRepository = eventJoinRequestRepository;
    }

    public EventJoinRequest createJoinEventRequest(Account host, Account requester, Event event) {
        if (eventJoinRequestRepository.existsByHostIdAndRequesterIdAndEventId(
                host.getId(), requester.getId(), event.getId())) {
            throw new ResourceAlreadyTaken("Request has been already sent.");
        }

        EventJoinRequest newEventJoinRequest = new EventJoinRequest();

        newEventJoinRequest.setHost(host);
        newEventJoinRequest.setRequester(requester);
        newEventJoinRequest.setEvent(event);

        newEventJoinRequest.setRequest_date(LocalDateTime.now());
        newEventJoinRequest.setStatus(EventJoinRequestStatus.PENDING);

        return eventJoinRequestRepository.save(newEventJoinRequest);
    }
}
