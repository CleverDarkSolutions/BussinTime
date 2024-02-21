package pl.bussintime.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import pl.bussintime.backend.model.enums.AccountOnlineStatus;
import pl.bussintime.backend.model.enums.DirectMessagesScope;
import pl.bussintime.backend.model.enums.Gender;
import pl.bussintime.backend.model.enums.SecurityRole;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "account")
public class Account implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Size(max = 20, message = "User name must be at most 20 characters long")
    @NotBlank(message = "User name cannot be null")
    private String userName;

    @Column
    @Size(max = 50, message = "Email must be at most 50 characters long")
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email cannot be null")
    private String email;

    @Column
    @Size(max = 255, min = 5, message = "Password must be at most 255 characters long and at least 5")
    @NotBlank(message = "Password cannot be null")
    private String password;

    @Column
    @Size(max = 30, message = "Country must be at most 30 characters long")
    @NotBlank(message = "Country cannot be null")
    private String country;

    @Column
    @Size(max = 30, message = "City must be at most 30 characters long")
    @NotBlank(message = "City cannot be null")
    private String city;

    @Column
    @NotNull(message = "Gender cannot be null")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column
    @Size(max = 100, message = "Address must be at most 100 characters long")
    @NotBlank(message = "Address cannot be null")
    private String address;

    @Column
    @NotNull(message = "DirectMessages cannot be null")
    @Enumerated(EnumType.STRING)
    private DirectMessagesScope directMessages;

    @Column
    @Size(max = 255, message = "Photo path must be at most 255 characters long")
    private String photoPath;

    @Column
    @NotNull(message = "GPS cannot be null")
    private Boolean gps;

    @Column
    @NotNull(message = "PrivateProfile cannot be null")
    private Boolean privateProfile;

    @Column
    @NotNull(message = "ShareUsageData cannot be null")
    private Boolean shareUsageData;

    @Column
    private AccountOnlineStatus onlineStatus;

    @Column
    private String description;

    @Column
    @NotNull(message = "Age cannot be null")
    @Min(value = 16, message = "Age must be greater than or equal to 16")
    @Max(value = 150, message = "Age must be less than or equal to 150 (you can't be that old)")
    private Integer age;

    @Column
    @NotNull(message = "Creation date cannot be null")
    LocalDateTime createdAt;

    @Column
    @NotNull(message = "Update date cannot be null")
    LocalDateTime updatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "account", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Set<AccountEvent> accountEvents;

    @JsonIgnore
    @OneToMany(mappedBy = "initiator", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Set<Friendship> friendships;

    @OneToOne(mappedBy = "account")
    private Premium premium;

    @Column
    @NotNull(message = "Role cannot be null")
    @Enumerated(EnumType.STRING)
    private SecurityRole securityRole;

    @Column
    @Temporal(TemporalType.DATE)
    private LocalDate birthDate;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(securityRole.name()));
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}