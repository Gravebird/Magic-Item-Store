
-- Most classes follow the standard spell progression
UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = Class_Spells.Spell_Level * 2 - 1
WHERE
Class.Class_Is_Prestige = False AND 
Class.Class_Is_Domain = False AND
Class.Class_Name NOT IN ("Bard", "Paladin", "Ranger", "Sorceror") AND
Class_Spells.Spell_Level > 0;

UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = 1
WHERE
Class.Class_Is_Prestige = False AND 
Class.Class_Is_Domain = False AND
Class.Class_Name NOT IN ("Paladin", "Ranger") AND
Class_Spells.Spell_Level = 0;

-- For classes without standard spell progression, we need to update them specifically
-- Bard, Paladin, Ranger, Sorceror

-- For bard, we need to use several queries as there is no formula that matches the progression (that I can find anyway)
UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = Class_Spells.Spell_Level * 2
WHERE
Class.Class_Name = "Bard" AND
Class_Spells.Spell_Level IN (1,2);

UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = 7
WHERE
Class.Class_Name = "Bard" AND
Class_Spells.Spell_Level = 3;

UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = 10
WHERE
Class.Class_Name = "Bard" AND
Class_Spells.Spell_Level = 4;

UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = 13
WHERE
Class.Class_Name = "Bard" AND
Class_Spells.Spell_Level = 5;

UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = 16
WHERE
Class.Class_Name = "Bard" AND
Class_Spells.Spell_Level = 6;

-- For Paladin and Ranger, we can do them together since they have the same progression
-- Paladins and Rangers have 1/2 caster level...
UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = Class_Spells.Spell_Level * 2
WHERE
Class.Class_Name IN ("Paladin", "Ranger") AND
Class_Spells.Spell_Level IN (1,2);

UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = 5
WHERE
Class.Class_Name IN ("Paladin", "Ranger") AND
Class_Spells.Spell_Level = 3;

UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = 7
WHERE
Class.Class_Name IN ("Paladin", "Ranger") AND
Class_Spells.Spell_Level = 4;

-- For sorceror, it has a slightly different progression than wizard...
UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = 1
WHERE
Class.Class_Name = "Sorceror" AND
Class_Spells.Spell_Level = 1;

UPDATE Class_Spells
JOIN Class ON Class.Class_ID = Class_Spells.Class_ID
SET Class_Spells.Spell_Minimum_Caster_Level = Class_Spells.Spell_Level * 2
WHERE
Class.Class_Name = "Sorceror" AND
Class_Spells.Spell_Level > 1;