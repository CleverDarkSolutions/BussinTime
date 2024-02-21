package pl.bussintime.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bussintime.backend.model.Premium;

@Repository
public interface PremiumRepository extends JpaRepository<Premium, Long> {
}
