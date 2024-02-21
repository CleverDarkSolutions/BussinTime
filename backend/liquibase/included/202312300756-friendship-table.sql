--liquibase foramtted sql
--changeset psroka:7

CREATE TABLE FRIENDSHIP (
    id SERIAL PRIMARY KEY,
    invitation_date TIMESTAMP NOT NULL,
    receiver_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    initiator_id BIGINT NOT NULL,
    FOREIGN KEY (receiver_id) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (initiator_id) REFERENCES account(id) ON DELETE CASCADE
);