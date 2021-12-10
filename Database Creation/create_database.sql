-- Create dnd database and populate it with database

-- Drop database - start from scratch
DROP DATABASE IF EXISTS dnd;
CREATE DATABASE dnd;
USE dnd;

-- Drop all tables - start from scratch
DROP TABLE IF EXISTS Class_Spells;
DROP TABLE IF EXISTS Class;
DROP TABLE IF EXISTS Spell_Item;
DROP TABLE IF EXISTS Spell;
DROP TABLE IF EXISTS Wonderous_Item;
DROP TABLE IF EXISTS Magic_Weapon;
DROP TABLE IF EXISTS Magic_Armor;
DROP TABLE IF EXISTS Material_For_Weapon;
DROP TABLE IF EXISTS Material_For_Armor;
DROP TABLE IF EXISTS Weapon;
DROP TABLE IF EXISTS Armor;
DROP TABLE IF EXISTS Material;
DROP TABLE IF EXISTS Book;

-- Create all tables

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

CREATE TABLE Wonderous_Item (
	Magic_Item_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Magic_Item_Name varchar(40) NOT NULL,
    Magic_Item_Cost decimal(9,2) NOT NULL,
    Magic_Item_Description TEXT,
    PRIMARY KEY (Magic_Item_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Spell (
	Spell_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Spell_Name varchar(32) NOT NULL,
    Spell_Arcane bool NOT NULL,
    Spell_Divine bool NOT NULL,
    Spell_School varchar(13) NOT NULL CHECK (Spell_School IN ("Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation", "Universal", "Other")),
    Spell_Subschool varchar(19) CHECK (Spell_Subschool IN ("Calling", "Creation", "Healing", "Summoning", "Teleportation", "Scrying", "Charm", "Compulsion", "Figment", "Glamer", "Pattern", "Phantasm", "Shadow", "Creation or Calling")),
    Spell_Descriptor varchar(55),
    Spell_Min_Level int NOT NULL CHECK (Spell_Min_Level BETWEEN 0 AND 9),
    Spell_Components varchar(18) NOT NULL,
    Spell_Casting_Time varchar(29) NOT NULL,
    Spell_Range varchar(37) NOT NULL,
    Spell_Effect_or_Target varchar(183),
    Spell_Duration varchar(62) NOT NULL,
    Spell_Saving_Throw varchar(48),
    Spell_Resistance varchar(31),
    Spell_Short_Description varchar(100),
    Spell_Description TEXT,
    Spell_Material_Component varchar(696),
    Spell_Focus varchar(300),
    Spell_XP_Cost varchar(136),
    PRIMARY KEY (Spell_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Spell_Item (
	Spell_Item_ID int NOT NULL UNIQUE,
    Book_ID int NOT NULL,
    Spell_Item_Name varchar(30) NOT NULL,
    Spell_Item_Cost decimal(9,2) NOT NULL,
    Spell_Item_Type varchar(10) NOT NULL,
    Spell_ID int,
    PRIMARY KEY (Spell_Item_ID, Book_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID),
    FOREIGN KEY (Spell_ID) REFERENCES Spell(Spell_ID)
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
    PRIMARY KEY (Spell_ID, Class_ID),
    FOREIGN KEY (Class_ID) REFERENCES Class(Class_ID),
    FOREIGN KEY (Spell_ID) REFERENCES Spell(Spell_ID)
);

-- Insert data
source insert_book.dump;
source insert_weapon.dump;
source insert_armor.dump;
source insert_class.dump;
source insert_magic_armor.dump;
source insert_magic_weapon.dump;
source insert_material.dump;
source insert_material_for_armor.dump;
source insert_material_for_weapon.dump;
source insert_spell.dump;
source insert_class_spells.dump;