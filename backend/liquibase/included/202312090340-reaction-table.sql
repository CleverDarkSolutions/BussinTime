--liquibase foramtted sql
--changeset psroka:5

CREATE TABLE REACTION (
    id SERIAL PRIMARY KEY,
    reaction_type VARCHAR(20) NOT NULL,
    entity_type VARCHAR(20) NOT NULL,
    account_id BIGINT NOT NULL,
    entity_id BIGINT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES ACCOUNT(id) ON DELETE CASCADE
);