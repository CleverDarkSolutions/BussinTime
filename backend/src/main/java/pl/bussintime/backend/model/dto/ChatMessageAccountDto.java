package pl.bussintime.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.bussintime.backend.model.Account;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessageAccountDto {
    private Long id;

    public static ChatMessageAccountDto from(Account account) {
        return ChatMessageAccountDto.builder()
                .id(account.getId())
                .build();
    }
}