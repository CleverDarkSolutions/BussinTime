package pl.bussintime.backend.exception;

public class ResourceAlreadyTaken extends RuntimeException {
    public ResourceAlreadyTaken() {
    }

    public ResourceAlreadyTaken(String message) {
        super(message);
    }
}
