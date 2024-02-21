--liquibase foramtted sql
--changeset psroka:10

CREATE TABLE RATING (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255),
    score INTEGER,
    entity_type VARCHAR(50),
    creation_date TIMESTAMP,
    entity_id BIGINT,
    account_id BIGINT,
    FOREIGN KEY (account_id) REFERENCES ACCOUNT(id) ON DELETE CASCADE
);