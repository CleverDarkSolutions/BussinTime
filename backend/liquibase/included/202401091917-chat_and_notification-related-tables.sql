--liquibase foramtted sql
--changeset psroka:8

CREATE TABLE PRIVATE_CHAT_ROOM (
    id SERIAL PRIMARY KEY,
    chat_name VARCHAR(255),
    sender_id BIGINT,
    recipient_id BIGINT,
    FOREIGN KEY (sender_id) REFERENCES account (id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES account (id) ON DELETE CASCADE
);

CREATE TABLE PRIVATE_CHAT_MESSAGE (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255),
    message_time TIMESTAMP,
    message_type VARCHAR(50),
    chat_name VARCHAR(255),
    sender_id BIGINT,
    recipient_id BIGINT,
    chat_room_id BIGINT,
    FOREIGN KEY (sender_id) REFERENCES account (id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES account (id) ON DELETE CASCADE,
    FOREIGN KEY (chat_room_id) REFERENCES private_chat_room (id) ON DELETE CASCADE
);

CREATE TABLE EVENT_JOIN_REQUEST (
    id SERIAL PRIMARY KEY,
    request_date TIMESTAMP NOT NULL,
    host_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    requester_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    FOREIGN KEY (host_id) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (requester_id) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
);

CREATE TABLE NOTIFICATION (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP,
    message VARCHAR(255),
    notification_status VARCHAR(50),
    notification_type VARCHAR(50),
    photo_path VARCHAR(255),
    recipient_id BIGINT,
    friendship_id BIGINT,
    event_join_request_id BIGINT,
    event_id BIGINT,
    FOREIGN KEY (recipient_id) REFERENCES account (id) ON DELETE CASCADE,
    FOREIGN KEY (friendship_id) REFERENCES FRIENDSHIP (id) ON DELETE CASCADE,
    FOREIGN KEY (event_join_request_id) REFERENCES EVENT_JOIN_REQUEST (id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES EVENT (id) ON DELETE CASCADE
);