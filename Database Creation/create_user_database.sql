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

CREATE TABLE Armor (
    Armor_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    shop_id INT NOT NULL,
    Armor_Name varchar(20) NOT NULL,
    Armor_Description TEXT,
    Armor_Category varchar(6) NOT NULL CHECK (Armor_Category IN ("Light", "Medium", "Heavy", "Shield", "Extra")),
    Armor_Total_Cost decimal(9,2) NOT NULL,
    Armor_Base_AC_Bonus int NOT NULL,
    Armor_Max_Dex int,
    Armor_Check_Penalty int NOT NULL,
    Armor_Spell_Failure int NOT NULL,
    Armor_30_Speed int,
    Armor_20_Speed int,
    Armor_Weight decimal(4,2) NOT NULL,
    Armor_Base_ID int NOT NULL,
    Armor_Property_Summary varchar(150),
    FOREIGN KEY (shop_id) REFERENCES Shop (shop_id),
    PRIMARY KEY (Armor_ID)
);

CREATE TABLE Armor_Property (
    Armor_Property_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    Armor_ID INT NOT NULL,
    Property_Name varchar(32) NOT NULL,
    Property_Description TEXT,
    Property_Base_ID INT NOT NULL,
    FOREIGN KEY (Armor_ID) REFERENCES Armor (Armor_ID),
    PRIMARY KEY (Armor_Property_ID)
);

CREATE TABLE Weapon (
    Weapon_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    shop_id INT NOT NULL,
    Weapon_Name varchar(25) NOT NULL,
    Weapon_Description TEXT,
    Weapon_Category varchar(7) NOT NULL CHECK (Weapon_Category IN ("Simple", "Martial", "Exotic")),
    Weapon_Type varchar(16) NOT NULL CHECK (Weapon_Type IN ("Unarmed Melee", "Light Melee", "One-Handed Melee", "Two-Handed Melee", "Ranged")),
    Weapon_Total_Cost decimal(9,2) NOT NULL,
    Weapon_Small_Damage varchar(9),
    Weapon_Medium_Damage varchar(9),
    Weapon_Critical varchar(16),
    Weapon_Range_Increment int,
    Weapon_Damage_Type varchar(11),
    Weapon_Weight decimal(4,2) NOT NULL,
    Weapon_Base_ID INT NOT NULL,
    Weapon_Property_Summary varchar(150),
    FOREIGN KEY (shop_id) REFERENCES Shop (shop_id),
    PRIMARY KEY (Weapon_ID)
);

CREATE TABLE Weapon_Property (
    Weapon_Property_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    Weapon_ID INT NOT NULL,
    Property_Name varchar(20) NOT NULL,
    Property_Description TEXT,
    Property_Base_ID INT NOT NULL,
    FOREIGN KEY (Weapon_ID) REFERENCES Weapon (Weapon_ID),
    PRIMARY KEY (Weapon_Property_ID)
);

CREATE TABLE Magic_Item (
    Magic_Item_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    shop_id INT NOT NULL,
    Magic_Item_Name varchar(46) NOT NULL,
    Magic_Item_Description TEXT,
    Magic_Item_Type varchar(13) NOT NULL CHECK (Magic_Item_Type IN ("Wondrous Item","Ring","Rod","Staff")),
    Magic_Item_Cost decimal(9,2) NOT NULL,
    Magic_Item_Caster_Level int NOT NULL,
    Magic_Item_Aura varchar(64),
    Magic_Item_Base_ID int NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES Shop (shop_id),
    PRIMARY KEY (Magic_Item_ID)
);

CREATE TABLE Misc_Item (
    Misc_Item_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    shop_id INT NOT NULL,
    Misc_Item_Name varchar(30) NOT NULL,
    Misc_Item_Type VARCHAR(28) NOT NULL CHECK (Misc_Item_Type IN ('Trade Goods','Adventuring Gear','Special Substances and Items','Tools and Skill Kits','Clothing','Food, Drink, and Lodging','Mounts and Related Gear','Transport','Spellcasting and Services')),
    Misc_Item_Cost decimal(9,2) NOT NULL,
    Misc_Item_Weight decimal(5,2),
    Misc_Item_Description TEXT,
    Misc_Item_Base_ID INT NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES Shop (shop_id),
    PRIMARY KEY (Misc_Item_ID)
);

CREATE TABLE Potion (
    Potion_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    shop_id INT NOT NULL,
    Spell_ID INT NOT NULL,
    Potion_Base_ID INT NOT NULL,
    Potion_name varchar(45) NOT NULL,
    Potion_type varchar(6) NOT NULL CHECK (Potion_type IN ('potion','oil')),
    Potion_cost decimal(9,2) NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES Shop (shop_id),
    PRIMARY KEY (Potion_ID)
);

CREATE TABLE Wand_or_Scroll (
    Wand_or_Scroll_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    shop_id INT NOT NULL,
    Spell_ID INT NOT NULL,
    Class_ID INT NOT NULL,
    Wand_or_Scroll_Name varchar(62) NOT NULL,
    Wand_or_Scroll_Type varchar(6) NOT NULL CHECK (Wand_or_Scroll_Type IN ("Wand","Scroll")),
    Wand_or_Scroll_Cost decimal(9,2) NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES Shop (shop_id),
    PRIMARY KEY (Wand_or_Scroll_ID)
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
