--liquibase foramtted sql
--changeset psroka:2

CREATE TABLE EVENT_LOCALIZATION (
    id SERIAL PRIMARY KEY,
    latitude NUMERIC(7, 5) NOT NULL,
    longitude NUMERIC(7, 5) NOT NULL,
    city VARCHAR(100),
    postal_code VARCHAR(100),
    address VARCHAR(100)
);

CREATE TABLE EVENT (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    photo_path VARCHAR(255),
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    event_visibility VARCHAR(20) NOT NULL,
    localization_id BIGINT REFERENCES EVENT_LOCALIZATION(id)
);

CREATE TABLE ACCOUNT_EVENT (
    id SERIAL PRIMARY KEY,
    account_status VARCHAR(20) NOT NULL,
    account_id BIGINT REFERENCES ACCOUNT(id) ON DELETE CASCADE NOT NULL,
    event_id BIGINT REFERENCES EVENT(id) ON DELETE CASCADE NOT NULL
);