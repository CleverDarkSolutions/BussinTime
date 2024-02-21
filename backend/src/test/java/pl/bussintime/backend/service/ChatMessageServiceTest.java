//package pl.bussintime.backend.service;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.*;
//import pl.bussintime.backend.model.PrivateChatMessage;
//import pl.bussintime.backend.model.Account;
//import pl.bussintime.backend.repository.ChatMessageRepository;
//import pl.bussintime.backend.repository.ChatRoomRepository;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//class ChatMessageServiceTest {
//
//    @Mock
//    private ChatMessageRepository chatMessageRepository;
//    @Mock
//    private ChatRoomService chatRoomService;
//    @Mock
//    private ChatRoomRepository chatRoomRepository;
//    @Mock
//    private AccountService accountService;
//
//    @InjectMocks
//    private ChatMessageService chatMessageService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testSaveChatMessage() {
//        PrivateChatMessage privateChatMessage = new PrivateChatMessage();
//        privateChatMessage.setSender(new Account());
//        privateChatMessage.setRecipient(new Account());
//
//        when(chatRoomService.getChatRoomName(any(), any(), eq(true))).thenReturn(Optional.of("chatName"));
//        when(chatMessageRepository.save(any(PrivateChatMessage.class))).thenReturn(privateChatMessage);
//
//        PrivateChatMessage result = chatMessageService.save(privateChatMessage);
//
//        assertNotNull(result);
//        verify(chatMessageRepository).save(privateChatMessage);
//    }
//
//    @Test
//    void testFindChatMessages() {
//        Long senderId = 1L, recipientId = 2L;
//        List<PrivateChatMessage> messages = new ArrayList<>();
//        Account sender = new Account();
//        Account recipient = new Account();
//
//        when(accountService.getAccountById(senderId)).thenReturn(sender);
//        when(accountService.getAccountById(recipientId)).thenReturn(recipient);
//        when(chatRoomService.getChatRoomName(sender, recipient, false)).thenReturn(Optional.of("chatName"));
//        when(chatMessageRepository.findByChatName("chatName")).thenReturn(messages);
//
//        List<PrivateChatMessage> result = chatMessageService.findChatMessages(senderId, recipientId);
//
//        assertNotNull(result);
//        verify(chatMessageRepository).findByChatName("chatName");
//    }
//}
