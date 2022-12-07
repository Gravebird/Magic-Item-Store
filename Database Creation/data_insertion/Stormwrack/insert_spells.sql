
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
    null,null),
    
    (610,3,"Blackwater Taint","Necromancy",null,"Evil, Water", "V, S, M",
    "1 standard action","Medium","20-ft. radius",null,"1 round/level (D)",
    "Fortitude Partial","Yes",
    "Desecrate water, deal 1d6/2 levels negative energy damage, bestow a negative level.",
    "<p>In the dark, sunless abysses of the deep ocean, shadows gather, the cold beckons, and the corpses of many things in the oceans lie slowly rotting. These black waters are often poisoned with the energies of undeath. When this spell is cast, you call up the cold blackness of those stygian depths, infusing the waters in the spell's area with negative energy. Those in or entering the area must make a Fortitude save to resist its terrible power.</p><p>Those who fail the save are chilled to the bone, taking 1d6 points of damage per two levels (to a maximum of 10d6) and gain a negative level. Those who make the save take half damage and avoid the negative level. All undead in the area are healing qd6 points of damage per two caster levels (maximum of 10d6). Furthermore, the spell's area is treated as though there were a <em>desecrate</em> spell active within it.</p><p>This area of blackwater remains in place for the spell's duration, affecting creatures who enter the area in subsequent rounds. A creature can only be affected once by the spell, regardless of success or failure on the saving throw, so creatures who leave and reenter the area take no additional effect (although the <em>desecrate</em> effect remains throughout the spell's duration).</p>",
    "Material Component: Bone or scale of a fish that dwells in the deep, sunless parts of the ocean.",
    null,null),
    
    (611,3,"Blackwater Tentacle","Conjuration","Creation","Evil, Water","V, S, M",
    "1 standard action","Close","One tentacle",null,"1 round/level (D)",
    "Fortitude partial","No",
    "Create blackwater tentacle that attacks your foe.",
    "<p>You create a tentacle-shaped mass of blackwater, drawn from the deepest ocean trenches, to attack an enemy as you direct it. The tentacle appears at a particular point within range and can't move from that location. It attacks the opponent you designate once each round, starting with the round the spell is cast. It has a reach of 20 feet (though it can't make attacks of opportunity).</p><p>Its attack bonus is equal to your caster level plus the ability modifier you would normally use to set the save DC (Wisdom for cleric or druid, Intelligence for wizard, Charisma for sorceror). The tentacle deals 2d8 + caster level (max. +20) points of damage with a successful hit. Any Large or smaller creature hit by a blackwater tentacle must succeed on a Fortitude save or gain a negative level. Multiple hits by the same tentacle are cumulative, but the negative levels last only for the duration of the spell.</p><p>The tentacle never provides nor benefits from a flanking bonus. Once a tentacle has been directed to attack a foe, it continues to do so until the spell is redirected to a new target (a move action).</p><p>The tentacle has 5 hit points per caster level and an AC of 10 + your caster level. It automatically fails all saves. If reduced to 0 hp, the tentacle is destroyed.</p>",
    "Material Component: Powdered squid beak and a single dried sucker from a kraken's tentacle.",
    null,null),
    
    (612,3,"Control Currents","Transmutation",null,"Water","V, S",
    "1 standard action","20 ft./level","20-ft./level radius emanation centered on you",null,
    "10 min./level","None","No",
    "Changes current direction and speed.",
    "<p>You alter the flow of water in the area surrounding you. You can change the direction of an existing current, boost its strength, or cause still water to flow at a desired rate. The new current speed and direction persists until the spell ends or you decide to alter the effect, which requires concentration. You can choose to create an area of calm water up to 80 feet in diameter at the center of the affected area if you so desire, and you can create a limited effect in a smaller circular area within the spell's range.</p><p><em>Current Direction: </em>You can choose one of two basic current patterns to function over the spell's area.</p><ul><li>You can direct the current to flow in one direction across the entire area from one side to the other.</li><li>You can create a rotation, causing the water to swirl around the center in a clockwise or counterclockwise direction.</li></ul><p><em>Current Strength: </em>For every three caster levels, you can increase or decrease a current's speed by 10 feet. For example, a 9th level druid could increase the speed of a vigorous current (20 feet per round) to a dangerous current (50 feet per round) or reduce it to calm, placid water. See Currents and Streams, page 10 of Stormwrack, for more information about current strength and Swim checks.</p>",
    null,null,null),
    
    (613,3,"Dark Tide","Necromancy",null,"Evil, Water","V, S, DF",
    "1 full round","Long","One-half mile radius spread",null,"1 hour/level (D)",
    "Fortitude half","Yes",
    "Infuse water over a large area with negative energy and 1d6 damage/hour.",
    "<p>You infuse the target area with the enervating presence of the blackwater depths, creating a tide of blackwater that spreads out from the designated point of origin at a rate of 100 feet per round until it fills the entire area. The water is black and terribly chilling, and its touch causes a sense of fear in those affected by it.</p><p>Those within the area must make a Fortitude save when they first enter the blackwater (or when it first surrounds them). Failure indicates that they take 1 point of Strength damage. Additionally, every creature in the area takes 1d6 points of negative energy damage for every hour they remain in the dark, murky waters (no save). Spells that protect against negative energy damage will prevent the Strength damage.</p><p>Creatures who take damage from the <em>dark tide</em> are considered shaken as long as they remain in the area.</p><p>This spell is a favored first move of the sahuagin and other blackwater-dwelling creatures before they attack the settlements of their enemies.</p>",
    null,null,null),
    
    (614,3,"Depthsurge","Evocation",null,"Water","V, S, M",
    "1 standard action","Long","20 ft. radius",null,"Instantaneous",
    "Fortitude partial","Yes",
    "Water slam deals 2d6 + caster level damage to all within 20-ft. radius, pushes targets back, sinks ships.",
    "<p>The water within the area suddenly explodes outward in a massive surge, as if driven by a powerful explosion. Each creature or object in the area is subject to damage equal to 2d6 + caster level. Any creature struck by this attack must then succeed on a Fortitude save or be driven 10 feet away from the center of the blast.</p><p>If a ship is in the area, the captain must immediately make a sinking check (DC equal to the spell save DC). See Sinking, page 32 of Stormwrack.</p><p>At least half of the spell's area must contain water at least 10 feet deep, or else the spell fails. You must center the effect at or below the water's surface.</p>",
    "Material Component: A sphere of volcanic rock",
    null,null),
    
    (615,3,"Detect Ship","Divination",null,null,"V, S, F",
    "1 standard action","Special",null,"You","24 hours (D)",
    "None","No",
    "Detect and identify ships.",
    "<p>You gain the ability to discern the presence of ships around you. You perceive ships located within a distance of 1 mile per caster level, regardless of current visibility (or even whether or not they are beyond the horizon). You need not be seeking them to become aware that they are there - this spell will alert you to the presence of a ship if you are below decks or asleep. Exactly what can be ascertained depends on whether the ships in question are within sight or not yet visible.</p><p><em>Not Visible: </em>You sense only the presence of ships other than your own in the area. A DC 15 Profession (sailor) check allows you to determine the number, direction, and range to each new ship you sense. If you sense a ship's direction and range, you continue to be aware of this information until the other ship is no longer in range of the spell.</p><p><em>Within Sight: </em>If a ship is actually within sight, you can gain additional information by studying the vessel for 1 round. You need not be able to see the vessel clearly - a spot on the horizon is sufficient. A Profession (sailor) check gives you information about the ship or ships:</p><table><thead><tr><th><strong>Check Result</strong></th><th><strong>Information</strong></th></tr></thead><tbody><tr><td>10</td><td>Type of ship</td></tr><tr><td>12</td><td>Course, speed, and time to intercept (if possible)</td></tr><tr><td>15</td><td>What kind of weaponry the ship is carrying</td></tr><tr><td>18</td><td>Ship's name</td></tr><tr><td>20</td><td>Any signs of allegiance (pirate flags, symbols of nation of origin, etc.)</td></tr><tr><td>25</td><td>Port of call of the sighted ship</td></tr></tbody></table><p>This spell cannot penetrate illusions.</p>",
    null,"Focus: A small disk of ground glass, hung on a golden chain and worn about the neck while the spell is in effect. This focus is worth 50 gp.",
    null),
    
    (616,3,"Disguise Ship","Illusion","Glamer",null,"V, S, M",
    "1 standard action","Touch",null,"One ship","1 hour/level (D)",
    "Will disbelief (if interacted with)","No",
    "Disguises a ship.",
    "<p>You cloak a ship in illusion, making it appear as a ship of another type of your choice. You can choose what it appears as down to small details such as what weaoonry it bears and what flag it is flying. You can make the ship to be any other water-going vessel, though it cannot seem to be more than 50% smaller or larger.</p><p>Creatures within the area are not hidden or changed in appearance, nor are their possessions.</p>",
    "Material Component: A tiny replica of a ship",
    null,null),
    
    (617,3,"Doom of the Seas","Conjuration","Summoning","Evil","V, S, DF, XP",
    "1 full round","Touch","One summoned creature",null,"1 round/level (D)",
    "None","No",
    "Summons a fiendish kraken under your command.",
    "<p>It is said that in the deepest recesses of blackwater caverns dwell krakens of immense power, horrific creatures touched by malevolent extraplanar powers. Though this might certainly be true, it is likely that most experiences with such creatures comes as a result of this spell.</p><p>With this spell, you summon a fiendish kraken from the depths. The doom of the seas obeys you for the duration of the spell.</p>",
    null,null,"XP Cost: 500 XP."),
    
    (618,3,"Favorable Wind","Evocation",null,"Air","V, S",
    "1 standard action","60 ft.","Cone-shaped emanation",null,"10 min./level (D)",
    "Fortitude negates","No",
    "Produces a strong wind that lasts 10 min./level",
    "<p>This spell produces a stream of wind that can fill a ship's sails, disperse vapors and gases, and keep flying creatures at bay. The wind force is strong, with a speed of about 30 mph. It begins where you stand and blows directly away from you; you can easily propel a sailing vessel by standing astern of the mast and directing the wind forward to fill the sails.</p><p>Tiny or smaller creatures in the path of the wind are knocked prone, or if flying are blown back 1d6x10 feet.</p><p>Small creatures are checked and cannot make headway against the wind. Small airborne creatures are instead blown back 1d6x5 feet.</p><p>Medium and larger creatures can move normally within the effect.</p><p>A <em>favorable wind</em> can't push a creature beyond the limit of its range.</p><p>Any creature, regardless of size, takes a -2 penalty on ranged attacks and on Listen checks in the area of a <em>favorable wind</em>.</p><p>The wind automatically extinguishes candles, torches, and similar unprotected flames.</p><p>In addition to the above-noted effects, <em>favorable wind</em> can do anything that a strong natural wind could do. It can fan a large fire, disperse gases and vapors to the limit of its range in 1 round, and make sailing difficult for small craft nearby.</p>",
    null,null,null),
    
    (619,3,"Fins to Feet","Transmutation",null,null,"V, S",
    "1 standard action","Touch",null,"Willing creature touched","1 hour/level",
    "Fortitude negates (harmless)","Yes (harmless)",
    "Transforms tails, tentacles, or finned extremities into humanoid legs and feet.",
    "<p>This spell transforms tails, tentacles, or finned extremities into humanoid legs and feet. Creatures so affected lose any natural swim speed they possess but gain a land speed instead. Transmuted Medium creatures have a base land speed of 30 feet, Small and smaller creatures have a base land speed of 20 feet, and Large or larger creatures have a base land speed of 40 feet.</p><p>The creature loses any natural attacks based on its tail or tentacles.</p>",
    null,null,null),
    
    (620,3,"Flowsight","Divination","Scrying",null,"V, S, M/DF",
    "1 minute","Touch","60-ft. radius",null,"1 round/level (D)",
    "Will negates; see text","Yes",
    "You can scry creatures in contact with a body of water.",
    "<p>By touching a nearby sorce of water - a standing pool, a stream, or even a portion of a larger body of water - you can perceive creatures and objects in contact with the water.</p><p>You can concentrate to focus <em>flowsight</em> on a given creature. You retain your full visual acuity, including any magical effects, as well as any auditory enhancements you might have. This action makes the subject potentially aware of the magical scrying; on a Will save, it prevents you from learning more about it, and you cannot try again on that subject for 24 hours. However, you can turn your consciousness to another subject in contacted with the water and make a new scrying attempt each round.</p>",
    "Arcane material component: A piece of limestone",
    null,null),
    
    (621,3,"Jaws of the Moray","Transmutation",null,null,"V, S",
    "1 standard action","Touch",null,"Creature touched","1 min./level",
    "Will negates (harmless)","Yes (harmless)",
    "Subject gains a bite attack.",
    "<p>This spell grants the subject a bite attack, which deals damage as indicated below. As a primary attack, it adds the creature's Strength modifier to damage. It can also be used as a secondary natural attack in conjunction with a manufactured weapon. Such secondary attacks do not interfere with the primary attack as attacking with an off-hand weapon would do, but the subject takes the usual -5 penalty (or -2 with the Multiattack feat) for the bite attack when used as a secondary natural attack.</p><p>If the subject hits with its bite attack, it attaches itself to the foe and deals automatic bite damage each round it remains attached. It does not need to make a grapple check, and it does not provoke attacks of opportunity. An attached attacker loses its Dexterity bonus to Armor Class. It cannot use other weapons while attached, but each attack upon from the grappled foe requires a successful grapple check. Others can attack an attached creature with a weapon or grapple. To remove the attached creature through grappling, the opponent must achieve a pin against it.</p><p>A creature with a natural bite attack can use its own bite damage, if greater, but still gains the ability to attach itself.</p><table><thead><tr><th><strong>Size</strong></th><th><strong>Damage</strong></th></tr></thead><tbody><tr><td>Fine</td><td>1d2</td></tr><tr><td>Diminutive</td><td>1d3</td></tr><tr><td>Tiny</td><td>1d4</td></tr><tr><td>Small</td><td>1d6</td></tr><tr><td>Medium</td><td>1d8</td></tr><tr><td>Large</td><td>2d6</td></tr><tr><td>Huge</td><td>2d8</td></tr><tr><td>Gargantuan</td><td>4d6</td></tr><tr><td>Colossal</td><td>4d8</td></tr></tbody></table>",
    null,null,null),
    
    (622,3,"Jig of the Waves","Enchantment","Compulsion","Mind-Affecting","V, S",
    "1 standard action","Close","One or more creatures in a 10-ft.-radius burst",null,"Concentration + 1d4 rounds",
    "Will negates","Yes",
    "Force creature to dance a jig which causes penalties and forces random movement.",
    "<p>You cause one or more creatures to begin dancing a merry jig. This spell affects a number of HD of creatures equal to the caster level. Creatures with the fewest HD are affected first. Among creatures with equal HD, those who are closest to the spell's point of origin are affected first. Hit Dice that are not sufficient to affect a creature are wasted.</p><p>Those who are dancing receive a -2 penalty on attack rolls, saving throws, skill checks, ability checks, and Armor Class for the time that they dance. Though they can take actions normally (using the penalties given above), their movement is not their own.</p><p>Each round, a creature affected by this spell must take a move action to move half her speed in a random direction. If this movement would place the target in danger (such as dancing into a fire or off the deck), the dance causes the target to stop just short of the threat. Targets can still take their actions, either before or after their movement as they choose.</p>",
    null,null,null),
    
    (623,3,"Kuo-Toa Skin","Transmutation",null,null,"V, S, M/DF",
    "1 standard action","Touch",null,"Creature touched","1 hour/level",
    "Will negates (harmless)","Yes (harmless)",
    "Subject gains +8 on Escape Artist checks and cannot be ensared by webs.",
    "<p>The subject's skin, as well as clothing, armor, and other personal effects (including worn magic items), take on an oily sheen like the slippery skin of kuo-toas. For the duration of the spell, the subject gains a +8 bonus on Escape Artist checks and cannot be snared by webs (magical or otherwise).",
    "Arcane Material Component: A kuo-toa scale",
    null,null),
    
    (624,3,"Maelstrom","Conjuration","Creation","Water","V, S, DF",
    "1 full round","Long","Whirpool 120 ft. wide and 60 ft. deep",null,"1 round/level",
    "Reflex negates","No",
    "Conjures a deadly whirpool to suck in and batter foes.",
    "<p>This spell causes a deadly vortex to form in water. A body of water at least 120 feet wide and 60 feet deep must be present, or the spell is wasted.</p><p>Waterborne creatures or objects within 50 feet of the vortex (below and on all sides) must make Reflex saves or be sucked in. These creatures take 3d8 points of damage upon being sucked in. Trained swimmers can attempt Swim checks instead if their skill modifier is higher than their Reflex save bonus. Waterborne vessels avoid being sucked in if their operators make Profession (sailor) checks against the same DC as the spell's saving throw.</p><p>Once inside, creatures and objects take 3d8 points of battering damage each round. They remain trapped for 2d4 rounds. Subjects of Large or smaller size are ejected from the bottom of the vortex. Huge, Gargantuan, or Colossal subjects are ejected from the top.</p>",
    null,null,null),
    
    (625,3,"Megalodon Empowerment","Transmutation",null,null,"V, S, M",
    "1 standard action","Personal",null,"You","1 hour/level or 1 round/level (D)",
    null,null,
    "Gain scent, water breathing, swim speed for 1 hour/level.",
    "<p>The mighty megalodon is a terror to most things that swim. However, it is also undeniably perfect in its form, made to be the ultimate hunting machine. When this spell is cast, you take on some of the essence of this greatest of sharks. You become a predator without peer, capable of finding and destroying your prey.</p><p>When the spell is initially cast, you take what is called the Form of the Hunter: your features undergo a subtle change, becoming more angular. Your skin darkens to a blue-black hue and becomes slightly rough to the touch. Your sense of smell sharpens, granting you the scent special ability and a +10 racial bonus to Survival checks for the purpose of tracking by scent. Additionally, your swim speed increases by 10 feet; if you do not already possess a swim speed then you gain a swim speed equal to your normal land movement. You also gain the ability to breathe water. You retain this form for up to 1 hour per caster level (as noted above).</p><p>At any time during the spell's duration, you can shift into the terrible Form of the Killer as a standard action. Doing so dramatically reduces the remaining time of the spell, however, reducing it to 1 round per caster level, regardless of how much time was originally remaining.</p><p>In the Form of the Killer, you swell in size, increasing by one size category (see page 291 of the <em>Monster Manual</em> for guidelines on changes to abilities and traits for such a change). You retain the scent and swim speed benefits of the Form of the Hunter, and the rough hide of the megalodon fully manifests - those who strike you with unarmed or natural attacks must make a Reflex save or take 1d4 points of damage.</p><p>You also gain bite and claw natural attacks and are considered to have the Multiattack feat for the purpose of using them. These natural attacks deal damage according to your new size (see page 296 of the <em>Monster Manual</em> for details): for a Medium caster this gives a bite attack for 1d8 points of damage and two claw attacks for 1d6 points of damage).</p><p>Finally, your base attack bonus equals your character level, you gain a +4 natural armor bonus (in addition to that gained from the size increase), and you gain a +3 competence bonus on Fortitude and Reflex saves.</p><p>You lose the ability to cast spells (but not to use spell-like abilities). If you possess the wild shape ability, you can assume the shapes of animals one size category larger than normal.</p><p>Assuming the Form of the Killer lasts for the duration of the spell - once it has been done, you cannot return to the Form of the Hunter without recasting.</p>",
    "Material Component: A potion of water breathing and three teeth from a shark of at least Large size.",
    null,null),
    
    (626,3,"Capable Caravel","Conjuration","Creation",null,"V, S, F",
    "10 minutes","Close","Ship plus extradimensional space, up to three 10-ft. cubes/level (S)",null,"1 day/2 levels (D)",
    "None","No",
    "Creates magical ship with extradimensional staterooms.",
    "<p>You conjure into existence a fine, seaworthy ship to carry you and your companions safely and comfortably.</p><p>A caravel is a fairly small, double-decked sailing ship (see page 98 of <em>Stormwrack</em> for more information). It holds a generous amount of cargo and offers cramped quarters for crew and passengers. The ship produced by this spell has even more room for cargo and passengers. The ship produced by this spell has even more room for cargo and passengers within an extradimensional space.</p><p>The entry point to this space is a hatch on the aft upper deck. Lifting the hatch reveals a set of wooden stairs, which descend about 6 feet to a horizontal shimmering in the air about 4 feet wide. Only those you designate can enter this space, and the extradimensional portal is shut and made invisible behind you when you enter. Those without authorization to enter instead continue descending the steps to an ordinary cargo hold. You can open the portal again from your own side at will.</p><p>Those who pass beyond the portal's entrance find themselves in a magnificent foyer with many state-rooms whose doors open from this space. The atmosphere is clean, fresh, and warm.</p><p>You can create any deck plan you desire within the limit of the spell's effect. The cabins are furnished, and the galley contains sufficient foodstuffs and preparation equipment to serve three full meals per day per person per caster level. A staff of near-transparent pursers (up to two per caster level), liveried and obedient, wait upon all who enter. They function as <em>unseen servant</em> spells except that they are visible and can go anywhere within the extradimensional space.</p><p>Since the place can be entered only through its special portal, outside conditions do not affect the passenger space, nor do conditions inside it pass to the plane beyond. Bad weather or other marine hazards can still threaten the vessel, but even if it sinks, the passenger space remains safe and isolated (though exiting it might prove difficult).</p><p>The ship is crewed by a minimum complement of spectral deckhands, which perform the basic tasks of maintenance. These, like the cabin servants, behave as <em>unseen servants</em> but can travel anywhere on board ship and can enter the extradimensional space if you so direct. The spectral deckhands respond to the direction of the helmsman, reducing the number of crew necessary to control the caravel to 1. If you do not provide a real helmsman, the ship will steer itself on the last course a living helmsman provided but will not be able to avoid collisions or hazards or adjust to changing conditions.</p>",
    null,"Focus: A miniature ship carved from mahogany, rigged with silk sails and gold thread, with a total value of 500 gp.",
    null);