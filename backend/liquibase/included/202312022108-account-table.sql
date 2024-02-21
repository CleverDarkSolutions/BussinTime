--liquibase foramtted sql
--changeset psroka:1

CREATE TABLE ACCOUNT (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    country VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    address VARCHAR(100) NOT NULL,
    direct_messages VARCHAR(20) NOT NULL,
    photo_path VARCHAR(255),
    security_role VARCHAR(10),
    gps BOOLEAN NOT NULL,
    online_status VARCHAR(10),
    private_profile BOOLEAN NOT NULL,
    share_usage_data BOOLEAN NOT NULL,
    description TEXT,
    age INTEGER NOT NULL
);