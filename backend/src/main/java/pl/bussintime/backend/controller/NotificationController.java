package pl.bussintime.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bussintime.backend.model.Notification;
import pl.bussintime.backend.service.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<List<Notification>> getListOfNotificationsByAccountId(@PathVariable Long accountId) {
        List<Notification> notifications = notificationService.getListOfNotificationsByAccountIdExcludingMessages(accountId);
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/setNotificationToNoticed")
    public ResponseEntity<Notification> setNotificationToNoticed(@RequestParam Long notificationId) {
        Notification notification = notificationService.setNotificationToNoticed(notificationId);
        return ResponseEntity.ok(notification);
    }
}
