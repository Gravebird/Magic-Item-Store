INSERT INTO Class
    (Class_ID, Book_ID, Class_Name, Class_is_Prestige, 
    Class_is_Domain, Class_Hit_Dice, Class_Base_Skill_Points, 
    Class_Base_Attack_Bonus, Class_Fort_Save, Class_Ref_Save, 
    Class_Will_Save, Class_is_Caster)
VALUES
    (50,3,"Knight of the Pearl", true, false, 10, 2, "Good",
    "Good", "Poor", "Good", false),
    
    (51,3,"Legendary Captain", true, false, 8, 4, "Medium",
    "Good", "Poor", "Good", false),
    
    (52,3,"Leviathan Hunter", true, false, 10, 4, "Good",
    "Good", "Poor", "Poor", false),
    
    (53,3,"Scarlet Corsair", true, false, 8, 4, "Good",
    "Poor", "Good", "Poor", false),
    
    (54,3,"Sea Witch", true, false, 4, 2, "Poor",
    "Good", "Poor", "Good", true),
    
    (55,3,"Stormcaster", true, false, 4, 2, "Poor",
    "Good", "Good", "Poor", true),
    
    (56,3,"Wavekeeper", true, false, 8, 4, "Medium",
    "Good", "Poor", "Good", true),
    
    (57,3,"Blackwater", false, true, null, null, null, null, null, null, true),
    
    (58,3,"Ocean", false, true, null, null, null, null, null, null, true),
    
    (59,3,"Seafolk", false, true, null, null, null, null, null, null, true),
    
    (60,3,"Storm", false, true, null, null, null, null, null, null, true);