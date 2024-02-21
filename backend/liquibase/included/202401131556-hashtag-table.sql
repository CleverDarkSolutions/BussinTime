--liquibase foramtted sql
--changeset psroka:9

CREATE TABLE hashtag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    entity_type VARCHAR(50),
    entity_id BIGINT
);