-- Create User Database for magic item store

SELECT "Dropping database...";
-- Drop database - start from scratch
DROP DATABASE IF EXISTS MIS_User_Data;
CREATE DATABASE MIS_User_Data;
USE MIS_User_Data;

-- Drop all tables - start from scratch

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS stores;

-- Drop all users - start from scratch

DROP USER IF EXISTS 'magic_item_store'@'localhost';

-- Create all tables

SELECT "Creating database...";

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE stores (
    id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Create DB Users

SELECT "Creating users...";

CREATE USER 'magic_item_store'@'localhost' IDENTIFIED BY 'A00768125';

-- Apply grants

SELECT "Granting permissions...";

GRANT SELECT, INSERT, UPDATE, DELETE ON * TO 'magic_item_store'@'localhost';



-- Insert test users

SELECT "Inserting test users...";

INSERT INTO users (username, password) VALUES
    ('test', MD5('test')), ('test2', MD5('test2')), ('test3', MD5('test3'));