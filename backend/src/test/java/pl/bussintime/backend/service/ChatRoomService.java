package pl.bussintime.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Optional;
import pl.bussintime.backend.model.Account;
import pl.bussintime.backend.repository.ChatRoomRepository;

class ChatRoomServiceTest {

    @Mock
    private ChatRoomRepository chatRoomRepository;

    @InjectMocks
    private ChatRoomService chatRoomService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetChatRoomNameNotCreateNew() {
        Account sender = new Account();
        Account recipient = new Account();

        when(chatRoomRepository.findBySenderAndRecipient(sender, recipient))
                .thenReturn(Optional.empty());

        Optional<String> result = chatRoomService.getChatRoomName(sender, recipient, false);

        assertFalse(result.isPresent());
    }
}
