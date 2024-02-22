-- Create User Database for magic item store

SELECT "Dropping databases...";
-- Drop database - start from scratch
DROP DATABASE IF EXISTS MIS_User_Data;
DROP DATABASE IF EXISTS cookie_user;
CREATE DATABASE MIS_User_Data;
CREATE DATABASE cookie_user;


USE MIS_User_Data;


CREATE TABLE users (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    username varchar(45) NOT NULL,
    hash varchar(200) NOT NULL,
    salt varchar(100) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Shop (
    shop_id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id INT NOT NULL,
    shop_name varchar(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    PRIMARY KEY (shop_id)
);

-- Drop all users - start from scratch

DROP USER IF EXISTS 'magic_item_store'@'localhost';

-- Create all tables



-- Create DB Users

SELECT "Creating users...";

CREATE USER 'magic_item_store'@'localhost' IDENTIFIED BY 'A00768125';

-- Apply grants

SELECT "Granting permissions...";

GRANT SELECT, INSERT, UPDATE, DELETE ON * TO 'magic_item_store'@'localhost';
