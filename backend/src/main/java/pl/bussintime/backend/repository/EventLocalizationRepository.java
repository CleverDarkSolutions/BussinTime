package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.EventLocalization;

import java.math.BigDecimal;

@Repository
public interface EventLocalizationRepository extends JpaRepository<EventLocalization, Long> {
    EventLocalization findByLatitudeAndLongitude(BigDecimal latitude, BigDecimal longitude);
}
