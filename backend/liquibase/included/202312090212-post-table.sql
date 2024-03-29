--liquibase foramtted sql
--changeset psroka:4

CREATE TABLE POST (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    photo_path VARCHAR(255),
    title VARCHAR(50) NOT NULL,
    account_id BIGINT REFERENCES ACCOUNT(id) ON DELETE CASCADE NOT NULL,
    event_id BIGINT REFERENCES EVENT(id) ON DELETE CASCADE NOT NULL
);