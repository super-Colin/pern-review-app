-- run as postgres user to create user and database on localhost
CREATE USER reviews WITH PASSWORD 'reviews123';
CREATE DATABASE reviews;
GRANT ALL PRIVILEGES ON DATABASE reviews TO reviews;
