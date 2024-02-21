package pl.bussintime.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "event_localization")
public class EventLocalization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull
    private BigDecimal latitude;

    @Column
    @NotNull
    private BigDecimal longitude;

    @Column
    @Size(max = 100, message = "City must be at most 100 characters long")
    private String city;

    @Column
    @Size(max = 100, message = "Postal Code must be at most 100 characters long")
    private String postalCode;

    @Column
    @Size(max = 100, message = "Address must be at most 100 characters long")
    private String address;
}
