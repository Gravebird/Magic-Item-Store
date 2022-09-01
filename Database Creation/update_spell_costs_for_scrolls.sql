
-- Most classes follow the standard spell progression
UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Base_Cost_For_Scroll = 25.00 * Spell_Level * (Spell_Level * 2 - 1)
WHERE 
Class.Class_Is_Prestige = False AND 
Class.Class_Is_Domain = False AND
Class.Class_Name NOT IN ("Bard", "Paladin", "Ranger", "Sorceror");


-- For classes without standard spell progression, we need to update them specifically
-- Bard, Paladin, Ranger
-- UPDATE Class_Spells
-- JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
-- SET Class_Spells.Spell_Base_Cost_For_Scroll = 25 * Class_Spells.Spell_Level
-- WHERE Class.Class_Name = "Bard"