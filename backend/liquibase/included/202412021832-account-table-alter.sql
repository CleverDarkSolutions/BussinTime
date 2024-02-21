--liquibase foramtted sql
--changeset psroka:11

ALTER TABLE ACCOUNT
ADD COLUMN birth_date DATE;