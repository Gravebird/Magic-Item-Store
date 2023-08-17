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

SELECT "Inserting Generic Weapons and Armor...";
source data_insertion/core/insert_generic_weapon_and_armor.sql;

SELECT "Inserting Special Materials...";
source data_insertion/core/insert_material.dump;

SELECT "Inserting PH Spells...";
source data_insertion/core/player_handbook_spells.sql;

SELECT "Creating Links between classes and spells...";
source data_insertion/core/insert_player_handbook_class_spells.sql;

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