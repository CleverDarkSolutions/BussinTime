package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.Event;
import pl.bussintime.backend.model.dto.EventVisibility;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findByName(String name);
    List<Event>  findByEventVisibility(EventVisibility eventVisibility);
}
