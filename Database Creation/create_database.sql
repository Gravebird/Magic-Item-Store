-- Create dnd database and populate it with database


SELECT "Dropping database...";
-- Drop database - start from scratch
DROP DATABASE IF EXISTS dnd;
CREATE DATABASE dnd;
USE dnd;

-- Drop all tables - start from scratch
DROP TABLE IF EXISTS Class_Spells;
DROP TABLE IF EXISTS Class;
DROP TABLE IF EXISTS Spell_Item;
DROP TABLE IF EXISTS Spell;
DROP TABLE IF EXISTS Ring;
DROP TABLE IF EXISTS Rod;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS Potion;
DROP TABLE IF EXISTS Wondrous_Item;
DROP TABLE IF EXISTS Magic_Weapon;
DROP TABLE IF EXISTS Magic_Armor;
DROP TABLE IF EXISTS Material_For_Weapon;
DROP TABLE IF EXISTS Material_For_Armor;
DROP TABLE IF EXISTS Weapon;
DROP TABLE IF EXISTS Armor;
DROP TABLE IF EXISTS Material;
DROP TABLE IF EXISTS Book;

-- Create all tables

SELECT "Creating database...";

CREATE TABLE Book (
	Book_ID int NOT NULL UNIQUE,
    Book_Name varchar(30) NOT NULL,
    Book_Version varchar(10) NOT NULL,
    Book_Print_Date date,
    PRIMARY KEY (Book_ID)
);

CREATE TABLE Material (
	Material_ID int NOT NULL UNIQUE,
	Book_ID int NOT NULL,
    Material_Name varchar(18) NOT NULL,
    Material_Description TEXT,
    PRIMARY KEY (Material_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Armor (
	Armor_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Armor_Name varchar(20) NOT NULL,
    Armor_Category varchar(6) NOT NULL CHECK (Armor_Category IN ("Light", "Medium", "Heavy", "Shield")),
    Armor_Cost decimal(9,2) NOT NULL,
    Armor_AC_Bonus int NOT NULL,
    Armor_Max_Dex int,
    Armor_Check_Penalty int NOT NULL,
    Armor_Spell_Failure int NOT NULL,
    Armor_30_Speed int,
    Armor_20_Speed int,
    Armor_Weight decimal(4,2) NOT NULL,
    Armor_Rarity varchar(8) NOT NULL CHECK (Armor_Rarity IN ("Common", "Uncommon")),
    Armor_Description TEXT,
    PRIMARY KEY (Armor_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Weapon (
	Weapon_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Weapon_Name varchar(25) NOT NULL,
    Weapon_Category varchar(7) NOT NULL CHECK (Weapon_Category IN ("Simple", "Martial", "Exotic")),
    Weapon_Type varchar(16) NOT NULL CHECK (Weapon_Type IN ("Unarmed Melee", "Light Melee", "One-Handed Melee", "Two-Handed Melee", "Ranged")),
    Weapon_Cost decimal(9,2) NOT NULL,
    Weapon_Small_Damage varchar(9),
    Weapon_Medium_Damage varchar(9),
    Weapon_Critical varchar(8),
    Weapon_Range_Increment int,
    Weapon_Damage_Type varchar(11),
    Weapon_Weight decimal(4,2) NOT NULL,
    Weapon_Rarity varchar(8) NOT NULL CHECK (Weapon_Rarity IN ("Common", "Uncommon")),
    Weapon_Description TEXT,
    PRIMARY KEY (Weapon_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Material_For_Armor (
    Armor_ID int NOT NULL,
    Material_ID int NOT NULL,
    PRIMARY KEY (Armor_ID, Material_ID),
    FOREIGN KEY (Armor_ID) REFERENCES Armor(Armor_ID),
    FOREIGN KEY (Material_ID) REFERENCES Material(Material_ID)
);

CREATE TABLE Material_For_Weapon (
    Weapon_ID int NOT NULL,
    Material_ID int NOT NULL,
    PRIMARY KEY (Weapon_ID, Material_ID),
    FOREIGN KEY (Weapon_ID) REFERENCES Weapon(Weapon_ID),
    FOREIGN KEY (Material_ID) REFERENCES Material(Material_ID)
);

CREATE TABLE Magic_Armor (
	Magic_Armor_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Magic_Armor_Name varchar(32) NOT NULL,
    Magic_Armor_Modifier int,
    Magic_Armor_Cost decimal(9,2),
    Magic_Armor_Can_Be_Shield bool NOT NULL,
    Magic_Armor_Can_Be_Armor bool NOT NULL,
    Magic_Armor_Description TEXT,
    PRIMARY KEY (Magic_Armor_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Magic_Weapon (
	Magic_Weapon_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Magic_Weapon_Name varchar(20) NOT NULL,
    Magic_Weapon_Modifier int NOT NULL,
    Melee_Slashing bool,
    Melee_Piercing bool,
    Melee_Bludgeoning bool,
    Ranged_Weapon bool,
    Thrown_Weapon bool,
    Ranged_Ammunition bool,
    Magic_Weapon_Description TEXT,
    PRIMARY KEY (Magic_Weapon_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Wondrous_Item (
	Magic_Item_ID int NOT NULL UNIQUE AUTO_INCREMENT,
    Book_ID int NOT NULL,
    Magic_Item_Name varchar(46) NOT NULL,
    Magic_Item_Description TEXT,
    Magic_Item_Caster_Level int NOT NULL,
    Magic_Item_Cost decimal(9,2) NOT NULL,
    Magic_Item_Aura varchar(64),
    Magic_Item_Creation_Reqs varchar(239),
    PRIMARY KEY (Magic_Item_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Spell (
	Spell_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Spell_Name varchar(32) NOT NULL,
    Spell_School varchar(13) NOT NULL,
    Spell_Subschool varchar(19),
    Spell_Descriptor varchar(55),
    Spell_Components varchar(456) NOT NULL,
    Spell_Casting_Time varchar(29) NOT NULL,
    Spell_Range varchar(51) NOT NULL,
    Spell_Effect varchar(183),
    Spell_Target varchar(186),
    Spell_Duration varchar(85) NOT NULL,
    Spell_Saving_Throw varchar(74),
    Spell_Resistance varchar(42),
    Spell_Short_Description varchar(105),
    Spell_Description TEXT,
    Spell_Material_Component varchar(696),
    Spell_Focus varchar(406),
    Spell_XP_Cost varchar(307),
    Spell_Minimum_Material_Cost decimal(9,2) DEFAULT 0.00,
    Spell_Minimum_XP_Cost int DEFAULT 0,
    PRIMARY KEY (Spell_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Potion (
    Potion_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Spell_ID int NOT NULL,
    Potion_name varchar(36) NOT NULL,
    Potion_type varchar(6) NOT NULL CHECK (Potion_type IN ('potion','oil')),
    Potion_cost decimal(9,2) NOT NULL,
    Potion_level int NOT NULL,
    PRIMARY KEY (Potion_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID),
    FOREIGN KEY (Spell_ID) REFERENCES Spell(Spell_ID)
);

CREATE TABLE Ring (
    Ring_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Ring_Name varchar(31) NOT NULL,
    Ring_Description TEXT,
    Ring_Caster_Level int NOT NULL,
    Ring_Cost decimal(9,2) NOT NULL,
    Ring_Aura varchar(37),
    Ring_Creation_Reqs varchar(119),
    PRIMARY KEY (Ring_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Rod (
    Rod_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Rod_Name varchar(30) NOT NULL,
    Rod_Description TEXT,
    Rod_Caster_Level int NOT NULL,
    Rod_Cost decimal(9,2) NOT NULL,
    Rod_Aura varchar(60),
    Rod_Creation_Reqs varchar(155),
    PRIMARY KEY (Rod_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Staff (
    Staff_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Staff_Name varchar(16) NOT NULL,
    Staff_Description TEXT,
    Staff_Caster_Level int NOT NULL,
    Staff_Cost decimal(9,2) NOT NULL,
    Staff_Aura varchar(60),
    Staff_Creation_Reqs varchar(239),
    PRIMARY KEY (Staff_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Class (
    Class_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Class_Name varchar(20) NOT NULL,
    Class_is_Prestige bool NOT NULL,
    Class_is_Domain bool NOT NULL,
    Class_Hit_Dice int CHECK (Class_Hit_Dice IN (4, 6, 8, 10, 12)),
    Class_Base_Skill_Points int CHECK (Class_Base_Skill_Points IN (2, 4, 6, 8)),
    Class_Base_Attack_Bonus varchar(6) CHECK (Class_Base_Attack_Bonus IN ("Poor", "Medium", "Good")),
    Class_Fort_Save varchar(4) CHECK (Class_Fort_Save IN ("Poor", "Good")),
    Class_Ref_Save varchar(4) CHECK (Class_Ref_Save IN ("Poor", "Good")),
    Class_Will_Save varchar(4) CHECK (Class_Will_Save IN ("Poor", "Good")),
    PRIMARY KEY (Class_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Class_Spells (
    Spell_ID int NOT NULL,
    Class_ID int NOT NULL,
    Spell_Level int NOT NULL CHECK (Spell_Level BETWEEN 0 AND 9),
    Spell_Minimum_Caster_Level int DEFAULT NULL,
    Scroll_Total_Cost decimal(9,2) DEFAULT NULL,
    Wand_Total_Cost decimal(9,2) DEFAULT NULL,
    PRIMARY KEY (Spell_ID, Class_ID),
    FOREIGN KEY (Class_ID) REFERENCES Class(Class_ID),
    FOREIGN KEY (Spell_ID) REFERENCES Spell(Spell_ID)
);


-- Create indexes

SELECT "Creating indexes...";

CREATE INDEX Spell_Name_I02
ON Spell (Spell_Name);

CREATE INDEX Class_Spells_Scroll_Cost_I02
ON Class_Spells (Scroll_Total_Cost);

CREATE INDEX Class_Spells_Wand_Cost_I03
ON Class_Spells (Wand_Total_Cost);

CREATE INDEX Class_Name_I02
ON Class (Class_Name);

CREATE INDEX Wondrous_Item_Name_I02
ON Wondrous_Item (Magic_Item_Name);

CREATE INDEX Wondrous_Item_Cost_I03
ON Wondrous_Item (Magic_Item_Cost);


-- Insert data
SELECT "Inserting Books...";
source data_insertion/core/insert_book.dump;

SELECT "Inserting Weapons...";
source data_insertion/core/insert_weapon.dump;

SELECT "Inserting Armor...";
source data_insertion/core/insert_armor.dump;

SELECT "Inserting Classes...";
source data_insertion/core/insert_class.dump;

SELECT "Inserting Magic Armor...";
source data_insertion/core/insert_magic_armor.dump;

SELECT "Inserting Magic Weapons...";
source data_insertion/core/insert_magic_weapon.dump;

SELECT "Inserting Special Materials...";
source data_insertion/core/insert_material.dump;
source data_insertion/core/insert_material_for_armor.dump;
source data_insertion/core/insert_material_for_weapon.dump;

SELECT "Inserting PH Spells...";
source data_insertion/core/player_handbook_spells.sql;

SELECT "Creating Links between classes and spells...";
source data_insertion/core/insert_player_handbook_class_spells.sql;

SELECT "Updating spell costs...";
source update_spell_min_caster_level.sql;
source update_spell_costs.sql;

SELECT "Inserting Potions...";
source data_insertion/core/insert_potion.sql;

SELECT "Inserting Rings...";
source data_insertion/core/insert_rings.sql;

SELECT "Inserting Rods...";
source data_insertion/core/insert_rods.sql;

SELECT "Inserting Staffs...";
source data_insertion/core/insert_staffs.sql;

SELECT "Inserting Wondrous Items...";
source data_insertion/core/insert_wondrous_item.sql;