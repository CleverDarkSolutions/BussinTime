package pl.bussintime.backend.service;

import pl.bussintime.backend.model.Event;

import pl.bussintime.backend.repository.EventRepository;
import pl.bussintime.backend.repository.EventLocalizationRepository;
import pl.bussintime.backend.repository.AccountEventRepository;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class EventServiceTest {

    @Mock
    private EventRepository eventRepository;
    @Mock
    private EventLocalizationRepository eventLocalizationRepository;
    @Mock
    private AccountEventRepository accountEventRepository;
    @Mock
    private AccountService accountService;

    @InjectMocks
    private EventService eventService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllEvents() {
        List<Event> events = new ArrayList<>();
        when(eventRepository.findAll()).thenReturn(events);

        List<Event> result = eventService.getAllEvents();

        assertNotNull(result);
        assertEquals(events, result);
    }

    @Test
    void testGetEventById() {
        Long eventId = 1L;
        Event event = new Event();
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

        Event result = eventService.getEventById(eventId);

        assertNotNull(result);
        assertEquals(event, result);
    }


}