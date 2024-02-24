
CREATE VIEW Magic_Item_Loot_Table
AS
(SELECT Magic_Item_ID AS ID,
		Book_ID,
	   Magic_Item_Name AS "Item_Name", 
	   Magic_Item_Cost AS "Cost", 
	   MIC_Item_Level AS "Item_Level",
       "Wondrous Item" AS "Type"
FROM Wondrous_Item)
UNION
(SELECT Potion_ID AS ID,
		Book_ID,
        CONCAT("Potion: ", Potion_Name) AS "Item_Name",
	   Potion_Cost AS "Cost",
       MIC_Item_Level AS "Item_Level",
       "Potion" AS "Type"
FROM Potion)
UNION
(SELECT Ring_ID AS ID,
		Book_ID,
        Ring_Name AS "Item_Name",
	   Ring_Cost AS "Cost",
       MIC_Item_Level AS "Item_Level",
       "Ring" AS "Type"
FROM Ring)
UNION
(SELECT Rod_ID AS ID,
		Book_ID,
        Rod_Name AS "Item_Name",
	   Rod_Cost AS "Cost",
       MIC_Item_Level AS "Item_Level",
       "Rod" AS "Type"
FROM Rod)
UNION
(SELECT Staff_ID AS ID,
		Book_ID,
        Staff_Name AS "Item_Name",
	   Staff_Cost AS "Cost",
       MIC_Item_Level AS "Item_Level",
       "Staff" AS "Type"
FROM Staff)
UNION
(SELECT CONCAT("S-",Class_Spells.Spell_ID,";C-",Class_Spells.Class_ID) AS ID,
		Spell.Book_ID,
		CONCAT("Scroll (",Class.Class_Name,"): ", Spell.Spell_Name) AS "Item_Name",
	   Class_Spells.Scroll_Total_Cost AS "Cost",
       Class_Spells.MIC_Scroll_Item_Level AS "Item_Level",
       "Scroll" AS "Type"
FROM Class_Spells
JOIN Spell ON Class_Spells.Spell_ID = Spell.Spell_ID
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
WHERE Class_Spells.Scroll_Total_Cost IS NOT NULL)
UNION
(SELECT CONCAT("S-",Class_Spells.Spell_ID,";C-",Class_Spells.Class_ID) AS ID,
		Spell.Book_ID,
		CONCAT("Wand (",Class.Class_Name,"): ", Spell.Spell_Name) AS "Item_Name",
	   Class_Spells.Wand_Total_Cost AS "Cost",
       Class_Spells.MIC_Wand_Item_Level AS "Item_Level",
       "Wand" AS "Type"
FROM Class_Spells
JOIN Spell ON Class_Spells.Spell_ID = Spell.Spell_ID
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
WHERE Class_Spells.Wand_Total_Cost IS NOT NULL)
UNION
(SELECT Generic_Weapon_ID AS ID,
		"0" AS Book_ID,
        CONCAT("Weapon +", Generic_Weapon_Enhancement) AS "Item_Name",
	   Generic_Weapon_Cost AS "Cost",
       MIC_Item_Level AS "Item_Level",
       "Weapon" AS "Type"
FROM Generic_Weapon)
UNION
(SELECT Generic_Armor_ID AS ID,
		"0" AS Book_ID,
        CONCAT("Armor +", Generic_Armor_Enhancement) AS "Item_Name",
	   Generic_Armor_Cost AS "Cost",
       MIC_Item_Level AS "Item_Level",
       "Armor" AS "Type"
FROM Generic_Armor)
UNION
(SELECT Misc_Item_ID AS ID,
Book_ID, Misc_Item_Name AS "Item_Name", Misc_Item_Cost AS "Cost",
MIC_Item_Level AS "Item_Level",
"Misc_Item" AS "Type"
FROM Misc_Item)
ORDER BY Cost, Item_Name;



CREATE VIEW Spell_List_By_Class AS
SELECT Spell.Spell_ID, Class.Class_Name, Class_Spells.Spell_Level, Spell.Spell_School, Spell.Spell_Name, Spell.Spell_Short_Description
FROM Spell
JOIN Class_Spells ON Spell.Spell_ID = Class_Spells.Spell_ID
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
ORDER BY Class.Class_Name, Class_Spells.Spell_Level, Spell.Spell_School, Spell.Spell_Name;



CREATE VIEW Scroll_And_Wand_Cost_Table AS
SELECT Book.Book_ID, Spell.Spell_Name, Class.Class_Name, Class_Spells.Spell_Level, Class_Spells.Scroll_Total_Cost, Class_Spells.Wand_Total_Cost, Spell.Spell_Short_Description, Spell.Spell_Description, MIC_Scroll_Item_Level, MIC_Wand_Item_Level
FROM Spell
JOIN Book ON Book.Book_ID = Spell.Book_ID
JOIN Class_Spells ON Spell.Spell_ID = Class_Spells.Spell_ID
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
ORDER BY Book.Book_ID, Class.Class_Name, Class_Spells.Spell_Level, Spell.Spell_Name;