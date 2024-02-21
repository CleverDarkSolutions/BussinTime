package pl.bussintime.backend.model.dto;

public record EditAccountRequest (
        String userName,
        String email,
        String country,
        String city,
        String address,
        String photoPath,
        String description
) {
}
