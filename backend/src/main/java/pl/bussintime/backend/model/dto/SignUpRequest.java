package pl.bussintime.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.bussintime.backend.model.enums.Gender;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
    String userName;
    String email;
    String password;
    Gender gender;
    String photoPath;
    String description;
    String country;
    String city;
    String address;
    int age;
    LocalDate birthDate;
}
