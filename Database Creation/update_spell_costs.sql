
UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 1005.00
WHERE Spell.Spell_Name = "Astral Projection";

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 3000.00
WHERE Spell.Spell_Name = "Forbiddance";

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 1000.00
WHERE Spell.Spell_Name IN 
    ("Hallow", "Trap the Soul", "Unhallow", "Clone", "Instant Summons", "Reincarnate",
    "Symbol of Fear", "Symbol of Pain", "Symbol of Sleep", "Teleportation Circle");

UPDATE Spell
SET Spell.Spell_Minimum_XP_Cost = 300
WHERE Spell.Spell_Name = "Limited Wish";

UPDATE Spell
SET Spell.Spell_Minimum_XP_Cost = 5000
WHERE Spell.Spell_Name IN ("Miracle", "Wish");

UPDATE Spell
SET Spell.Spell_Minimum_XP_Cost = 500
WHERE Spell.Spell_Name IN 
    ("Permanency", "Atonement", "Planar Ally, Greater", "Restoration, Greater");

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 1000.00, Spell.Spell_Minimum_XP_Cost = 1000
WHERE Spell.Spell_Name = "Simulacrum";

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 25.00
WHERE Spell.Spell_Name IN 
    ("Animate Dead", "Arcane Lock", "Augury", "Bless Water", "Consecrate",
    "Curse Water", "Desecrate", "Divination", "Fire Trap", "Programmed Image");

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 50.00
WHERE Spell.Spell_Name IN 
    ("Create Undead", "Create Greater Undead", "Continual Flame", "Illusory Script",
    "Nondetection", "Phantom Trap", "Wall of Iron");

UPDATE Spell
SET Spell.Spell_Minimum_XP_Cost = 250
WHERE Spell.Spell_Name IN ("Awaken", "Planar Ally");

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 500.00
WHERE Spell.Spell_Name IN 
    ("Circle of Death", "Protection from Spells", "Sepia Snake Sigil", "Undeath to Death");

UPDATE Spell
SET Spell.Spell_Minimum_XP_Cost = 100
WHERE Spell.Spell_Name IN ("Commune", "Planar Ally, Lesser", "Vision");

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 1500.00
WHERE Spell.Spell_Name IN ("Forcecage", "Refuge", "Sympathy");

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 200.00
WHERE Spell.Spell_Name = "Glyph of Warding";

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 400.00
WHERE Spell.Spell_Name = "Glyph of Warding, Greater";

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 250.00
WHERE Spell.Spell_Name IN ("Legend Lore", "Stoneskin", "True Seeing", "Vision");

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 10.00
WHERE Spell.Spell_Name = "Magic Mouth";

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 100.00
WHERE Spell.Spell_Name IN ("Permanent Image", "Restoration");

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 5.00
WHERE Spell.Spell_Name = "Project Image";

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 5000.00
WHERE Spell.Spell_Name IN 
    ("Raise Dead", "Symbol of Death", "Symbol of Insanity", "Symbol of Persuasion",
    "Symbol of Stunning", "Symbol of Weakness", "Temporal Stasis");

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 10000.00
WHERE Spell.Spell_Name = "Resurrection";

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 300.00
WHERE Spell.Spell_Name = "Transformation";

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 25000.00
WHERE Spell.Spell_Name = "True Resurrection";

-- STORMWRACK SPELLS

UPDATE Spell
SET Spell.Spell_Minimum_Material_Cost = 750.00
WHERE Spell.Spell_Name = "Megalodon Empowerment";


-- Update cost of scrolls and wands
-- The following two queries must be run at the end of this file. Any additional
-- cost updates should be added before this comment

-- For scrolls the formula is 25 GP * spell level * caster level
-- Material cost is added to the scroll cost
-- XP cost is multiplied by 5 and added to scroll cost
-- 0 level spells cost 12.50 + material and xp cost
UPDATE Class_Spells
JOIN Spell on Spell.Spell_ID = Class_Spells.Spell_ID
SET Class_Spells.Scroll_Total_Cost = 
    (25.00 * Class_Spells.Spell_Level * Class_Spells.Spell_Minimum_Caster_Level)
    + Spell.Spell_Minimum_Material_Cost + (5 * Spell_Minimum_XP_Cost)
WHERE Class_Spells.Spell_Level > 0;

UPDATE Class_Spells
JOIN Spell on Spell.Spell_ID = Class_Spells.Spell_ID
SET Class_Spells.Scroll_Total_Cost = 
    12.50 + Spell.Spell_Minimum_Material_Cost + (5 * Spell_Minimum_XP_Cost)
WHERE Class_Spells.Spell_Level = 0;

-- For wands the formula is 750 GP * spell level * caster level
-- Material and XP costs are paid 50 times by the creator, so:
-- Material cost is multiplied by 50 and added to the wand cost
-- XP cost is multiplied by 5 * 50 (250) and added to the wand cost
-- BUT wands can only hold spells of up to 4th level
-- 0 level spells in wands cost 375 plus material and xp costs
UPDATE Class_Spells
JOIN Spell on Spell.Spell_ID = Class_Spells.Spell_ID
SET Class_Spells.Wand_Total_Cost = 
    (750.00 * Class_Spells.Spell_Level * Class_Spells.Spell_Minimum_Caster_Level)
    + (50 * Spell.Spell_Minimum_Material_Cost) + (250 * Spell_Minimum_XP_Cost)
WHERE Class_Spells.Spell_Level IN (1,2,3,4);

UPDATE Class_Spells
JOIN Spell on Spell.Spell_ID = Class_Spells.Spell_ID
SET Class_Spells.Wand_Total_Cost = 
    375 + (50 * Spell.Spell_Minimum_Material_Cost) + (250 * Spell_Minimum_XP_Cost)
WHERE Class_Spells.Spell_Level = 0;