
INSERT INTO Spell
(Spell_ID, Book_ID, Spell_Name, Spell_School, Spell_Subschool,
Spell_Descriptor, Spell_Components, Spell_Casting_Time, Spell_Range,
Spell_Effect, Spell_Target, Spell_Duration, Spell_Saving_Throw,
Spell_Resistance, Spell_Short_Description, Spell_Description,
Spell_Material_Component, Spell_Focus, Spell_XP_Cost)
VALUES

    (607,3,"Aboleth Curse","Necromancy",null,null,"V, S, M",
    "1 standard action","Touch",null,"Living creature touched",
    "Permanent","Fortitude negates","Yes",
    "Subject's skin undergoes a horrible transformation.",
    "<p>You bestow a dreadful affliction on the creature that you touch, similar to the effect of an aboleth's foul contact. The skin of the target creature transforms into a transparent, glistening membrane. A creature so transformed must keep this membrane moistened with cool, fresh water or take 1d12 points of damage every 10 minutes. In addition, its natural armor bonus (if any) decreases by 1, but it can never drop below 0. This tranformation does not affect natural armor bonuses provided by magic items.</p><p>This curse cannot be dispelled, but it can be removed with a <em>remove curse</em> spell if cast within 24 hours. Afterward, only a <em>heal</em>, <em>mass heal</em>, <em>limited wish</em>, <em>miracle</em>, or <em>wish</em> spell can remove the affliction.</p>",
    null, null, null),
    
    (608,3,"Air Breathing","Transmutation",null,"Air","S, M/DF",
    "1 standard action","Touch",null,"Living creatures touched",
    "2 hours/level","Will negates (harmless)","Yes (harmless)",
    "Subject breathes air as easily as water.",
    "<p>The transmuted creature can breathe air freely. Divide the duration evenly among all the creatures you touch.</p><p>This spell does not make creatures unable to breathe water.</p><p><em>Air breathing</em> counters and dispels </em>water breathing</em>.</p>",
    "Arcane Material Component: A tiny vial of water",null,null),
    
    (609,3,"Airy Water","Transmutation",null,"Air, Water", "S, M",
    "1 standard action","0 ft.","20-ft.-radius emanation centered on you",
    null,"10 min./level (D)","None","No",
    "Turn normal water into a breathable substance; negate underwater movement and melee attack penalties.",
    "<p>This spell turns normal water (or watery solutions) into a frothy substance that is as breathable as air. Both air-breathing and water-breathing creatures witin the area can breathe normally.</p><p>Moving through <em>airy water</em> is easier than moving through normal water. Swimmers make a DC 10 Swim check once per round; they swim at their normal speed on a success, or half their normal speed on a failure. Creatures with a swim speed can simply use their swim speed without penalty. Creatures can instead use their land speed to move along the bottom at their normal speed. Creatures walking on the bottom do not pay any movement penalty for walking on sand, stone, or pebble seafloor and only pay 2 squares of movement per square of muck or mud entered (see Marine Dungeon Terrain on page 21 of Stormwrack).</p><p>Finally, <em>airy water</em> negates underwater combat penalties for all melee attacks, although ranged attacks still take the normal underwater penalty.</p><p>The spell does not filter or purify solid particles, so casting <em>airy water</em> on very turbid liquids, for example, would produce an area filled with dust or smoke (and impose similar penalties).</p>",
    "Material Component: A small handful of alkaline salts.",
    null,null);