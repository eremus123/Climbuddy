CREATE DATABASE climbuddy;
CREATE USER db_user WITH ENCRYPTED PASSWORD 'example';
\c climbuddy;
GRANT ALL ON SCHEMA public TO db_user;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE gyms(
 id SERIAL PRIMARY KEY,
 gymname VARCHAR(20),
 address VARCHAR(50),
 openingghours VARCHAR(8),
 resetdate DATE
);

CREATE TABLE passes(
 username VARCHAR(20),
 purchasedate DATE,
 expirydate DATE,
 costprice SMALLINT,
 sellingprice SMALLINT,
 quantity SMALLINT,
 gymid INTEGER NOT NULL,
 CONSTRAINT fk_gym FOREIGN KEY (gymid) REFERENCES gyms(id)
);

CREATE TABLE users(
 username VARCHAR(20) PRIMARY KEY,
 password VARCHAR(50),
 gymid INTEGER NOT NULL,
 sessionid INTEGER NOT NULL,
 CONSTRAINT fk_gym FOREIGN KEY (gymid) REFERENCES gyms(id),
 CONSTRAINT fk_session FOREIGN KEY (sessionid) REFERENCES sessions(id)
);

CREATE TABLE sessions(
 id SERIAL PRIMARY KEY,
 sessiondate DATE,
 hostname VARCHAR(20),
 attendee VARCHAR(20),
 gymid INTEGER NOT NULL,
 CONSTRAINT fk_gym FOREIGN KEY (gymid) REFERENCES gyms(id)
);

CREATE TABLE roles(
 role VARCHAR(10) PRIMARY KEY,
);
INSERT INTO roles(role) VALUES ('user'),('admin');
