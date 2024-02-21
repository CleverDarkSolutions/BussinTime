--liquibase foramtted sql
--changeset psroka:3

CREATE TABLE PREMIUM (
    id SERIAL PRIMARY KEY,
    premium_type VARCHAR(20) NOT NULL,
    payment_date TIMESTAMP,
    expiration_date TIMESTAMP,
    days_left INTEGER,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    account_id BIGINT,
    FOREIGN KEY (account_id) REFERENCES ACCOUNT(id) ON DELETE CASCADE
);