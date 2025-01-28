INSERT INTO Spell
(Spell_ID, Book_ID, Spell_Name, Spell_School, Spell_Subschool,
Spell_Descriptor, Spell_Components, Spell_Casting_Time, Spell_Range,
Spell_Effect, Spell_Target, Spell_Duration, Spell_Saving_Throw,
Spell_Resistance, Spell_Short_Description, Spell_Description,
Spell_Material_Component, Spell_Focus, Spell_XP_Cost)
VALUES
    (652,4,"Antifire Sphere","Abjuration",null,null,"V, S",
    "1 standard action","Touch","10-ft.-radius emanation from touched creature",null,"10 min./level",
    "Will negates (harmless)","No; see text",
    "Creatures within sphere gain immunity to fire damage.",
    "<p>You bring into being a mobile, spherical energy field that protects against fire. All creatures within the area of the spell gain immunity to fire damage. In addition, the sphere prevents the entrance of any creature with the fire subtype and hedges out such creatures that are in the area when the spell is cast. You must overcome a creature's spell resistance to keep it at bay.</p>",
    null,null,null),

    (653,4,"Ashen Union","Necromancy",null,null,"V, S, M",
    "1 standard action","Medium",null,"One living creature","Instantaneous",
    "Fortitude half and Fortitude partial; see text","Yes",
    "Drains moisture from a creature, possibly killing it and destroying its body.",
    "<p>You drain all the moisture from the body of a living creature, dealing it 1d6 points of dessication damage per two caster levels (maximum 10d6). A creature that makes a successful Fortitude save takes half damage. If the subject takes damage from this spell (whether its first save was successful or not) equal to more than half of its current hit points, it must make another Fortitude saving throw or die as its body expels all remaining fluid, leaving behind only a fragile husk that powders to ash at the least touch. A victim's equipment is unaffected. A creature that is affected but not slain by the spell is dehydrated (see page 15 of <em>Sandstorm</em>).</p>",
    "Material Component: A piece of dried fruit and a pinch of dust.",
    null,null),

    (654,4,"Ashstar","Conjuration","Creation","Evil","V, S",
    "1 standard action","Medium","One ashstar; see text",null,"1 round/level",
    "Fortitude negates","No",
    "Hovering construct dehydrates a wounded creature.",
    "You create a magical construct called an ashstar. It shoots from your hand and hovers in the air anywhere within the limit of the range. Each round, you can move the ashstar anywhere within range by spending a move action to concentrate on the new position. The ashstar gives off a reddish light, akin to the hazy light within a sandstorm, providing shadowy illumination in a 20-foot radius. A creature you designate within 10 feet of the ashstar that takes damage from any source must make a Fortitude saving throw. On a failed save, the damage is considered dessication damage, and the victim becomes dehydrated (see page 15 of <em>Sandstorm</em>).</p><p>An ashstar can be attacked as if it were an object. It has hardness 10 and 20 hit points.</p>",
    null,null,null),

    (655,4,"Awaken Sand","Transmutation",null,null,"V, S, DF, XP",
    "24 hours","Touch",null,"15ft. area of sand touched","Instantaneous",
    "None","No",
    "A region of sand forms into a Huge, sentient creature.",
    "<p>You awaken a region of sand, or similar material, to humanlike sentience. To succeed, you must make a DC 18 Will save. The <em>awakened</em> sand is friendly toward you. You have no special empathy or connection with sand you awaken, although it serves you in specific tasks or endeavors to communicate your desire to it.</p><p>The sand creature you awaken has the same statistics as a Huge animated object with a base land speed of 40 feet and a burrow speed of 20 feet. Unlike normal animated objects, <em>awakened</em> sand beings have the earth subtype, and their Intelligence, Wisdom, and Charisma scores are each 3d6. A sand being has immunity to polymorphing. The awakened sand can speak one language you know, plus one additional language per point of Intelligence bonus (if any) it has.</p><p>A sand creature can engulf Large or smaller creatures as a standard action. It cannot make a slam attack during a round in which it engulfs. The sand creature merely has to move over the opponents, affecting as many as it can cover. Opponents can make attacks of opportunity against the creature, but if they do so they are not entitled to a saving throw. Those who do not attempt attacks of opportunity must succeed on a DC 19 Reflex save or be engulfed; on a success, they are pushed back or aside (opponent's choice) as the creature moves forward. Engulfed opponents are considered grappled and are trapped within the sand creature's body. The sand creature deals 1d6+3 points of damage to trapped opponents each round after the one in which it engulfed them. Opponents that need to breathe risk suffocation (see page 304 of the <em>Dungeon Master's Guide</em>). The save DC is Strength-based.</p><p>Sand creatures are amorphous and can do anything sand would be expected to do - hide perfectly atop other sand, form into dunes and drifts, and pour through small openings (although passing through an opening two or more size categories smaller than the creature takes a full-round action).</p>",
    null,null,"XP Cost: 500 XP"),

    (656,4,"Black Sand","Necromancy",null,"Darkness,Evil","V, S",
    "1 standard action","Medium","20-ft.-radius spread",null,"1 min./level",
    "Reflex negates; see text","Yes",
    "Creates a 20-ft.-radius area of black sand",
    "<p>This spell creates an area of black sand (see page 20 of <em>Sandstorm</em>), infused with shadowstuff and negative energy. A region of black sand literally swallows light, emitting magical darkness rising to a height of 20 feet over the surface. Creatures that come in contact with the sand take 1d4 points of damage per round from negative energy (no save). Those reduced to 0 hit points crumble into black sand themselves. Creatures can make Reflex saves to avoid being caught in the area upon which the spell is first cast. Only the surface of the sand is affected by the spell, so creatures burrowing beneath an area of black sand are unaffected unless they break the surface. Creatures that do so immediately take damage from the spell.</p><p><em>Black sand</em> can be made permanent with a <em>permanency</em> spell.</p>",
    null,null,null),
    
    (657,4,"Blast of Sand","Conjuration","Creation","Earth","V, S, M",
    "1 standard action","30 ft.","Cone-shaped burst",null,"Instantaneous",
    "Reflex half","No",
    "Cone deals 1d6 damage/level.",
    "<p>Sand sprays from your outstretched palm with enough force to strip flesh from bone and scour surfaces. The spell deals 1d6 points of damage per caster level (maximum 10d6). Do not divide damage from <em>sand scour</em> by four when applying it to objects.</p>",
    "Material Component: A pinch of sand",
    null,null),
    
    (658,4,"Body Blaze","Evocation",null,"Fire","V, S, M",
    "1 standard action","Personal; see text",null,"You","1 round/level (D)",
    null,null,
    "You are surrounded by fire and leave a wall-like trail of flame in your wake.",
    "<p>You are surrounded in flame, which does not harm you or your equipment. When you move, you leave a vertical trail of flame in your wake. The sheet of flame left behind you is up to 20 feet high, 2 inches wide, and lengthens as you move, exactly following the path you take across a horizontal surface - you leave no trail on vertical surfaces or through the air because the sheet of flame must be anchored on a horizontal surface.</p><p>The blazing wall deals 2d6 points of damage +1 point of fire damage per caster level (maximum +20) to any creature passing through it. If you pass through a quare more than once, the damage dealt by the wall to creatures moving through that square does not increase. You take no damage from your own blazing wall.</p><p>If you overrun a creature or otherwise manage to pass through its square, each creature takes damage as if passing through the wall. If any 5-foot length of wall takes 20 points of cold damage or more in 1 round, that section goes out.</p>",
    "Material Component: A small piece of phosphorus.",
    null,null),

    (659,4,"Choking Sands","Necromancy",null,null,"V, S, M",
    "1 standard action","Touch",null,"Living creature touched","Instantaneous; see text",
    "Fortitude negates; see text","Yes",
    "Touched creature begins to suffocate on sand.",
    "<p>You coat the target's lungs with dust and sand. The target can cough up the sand by taking a full-round action and making a Fortitude save. If it chooses not to do so, it must make Constitution checks to avoid suffocation (see page 304 of the <em>Dungeon Master's Guide</em>).</p>",
    "Material Component: A tiny stuffed animal filled with sand.",
    null,null),

    (660,4,"Cloak of Shade","Abjuration",null,null,"V, S, DF",
    "1 standard action","Touch",null,"Creature touched","1 hour/level (D)",
    "None","Yes (harmles)",
    "Touched creature gains protection from heat and sun.",
    "<p>The subject is wrapped in an envelope of perfect shade. Inside the cloak, the temperature is one band lower than the actual temperature (see Heat Dangers, page 12 of <em>Sandstorm</em>), but the spell has no effect on unearthly or hotter heat, nor does it offer any protection against fire damage. The target is treated as though it is in shade, thereby protected from sunburn, able to begin recovering from sun glare, and able to begin healing nonlethal damage taken from exposure to heat. <em>Cloak of Shade</em> has no effect on <em>light</em>, <em>daylight</em>, <em>sunburst</em>, and similar magical light effects, and it offers no protection from damage that creatures vulnerable to sunlight might take from the sun.</p>",
    null,null,null),

    (661,4,"Control Sand","Transmutation",null,null,"V, S, DF",
    "1 standard action","Long","Dust or sand in a volume of 10 ft./level wide by 10 ft./level long by 2 ft./level deep (S)",null,"10 min./level (D)",
    "None; see text","No",
    "Raise or lower the level of sand.",
    "<p>Depending on the version you choose, <em>control sand</em> raises or lowers fine particles of material, such as dust or sand.</p><p>For either version, the caster can reduce one horizontal dimension by half and double the other horizontal dimension.</p><p><em>Lower Sand:</em> This effect causes sand to reduce its depth by as much as 2 feet per caster level, to a minimum depth of 1 inch. The dust and sand is lowered within a square-shaped depression whose sides are up to 10 feet long per caster level. In extremely large and deep sand piles, such as a sand dune, the spell creates a pit that sweeps creatures downward (without dealing damage), putting them at risk and rendering them unable to leave by normal movement for the duration of the spell. When cast on earth elementals, dust paraelementals, and other earth- or dust-based creatures, this spell acts as a <em>slow</em> spell (Will negates). The spell has no effect on other creatures.</p><p><em>Raise Sand:</em> This effect causes dust and sand to rise in height, just as the <em>lower sand</em> version causes it to lowerr. Creatures and objects on top of the dust or sand are raised along with the top level of sand.</p>",
    null,null,null),

    (662,4,"Desert Binding","Enchantment","Compulsion","Mind-Affecting","V, S, M",
    "1 minute","Close",null,"One living creature","See text (D)",
    "Will negates; see text","Yes",
    "Imprisons creature as sand in an hourglass or wind in the waste.",
    "<p>This spell functions like <em>binding</em> (see page 204 of the <em>Player's Handbook</em>), except as noted here.</p><p><em>Sand in the Hourglass:</em> The subject assumes the form of a minute portion of sand, each grain of which looks like its head. Held in a clear glass container, usually an hourglass, the subject remains aware of its surroundings (from multiple viewpoints) and can speak (from multiple tiny mouths), but it cannot leave the hourglass, attack, or use any other abilities. The subject does not need to breathe, eat, or drink while subject to <em>sand in the hourglass</em>, not does it age. Shattering the hourglass before the spell ends slays the bound creature, and its body remains sand (effectively destroyed). The duration is one year per caster level, after which time the victim reforms into its original shape, destroying the hourglass. Reduce the save DC by 4.</p><p><em>Wind in the Waste:</em> The subject is transformed into a howling wind blowing across the waste. The vitcim retains knowledge of its prior existance, but has no abilities other than to howl with the wind. Because of its insubstantial nature, the subject is nearly impossible to define or specifically locate. The DM might allow the victim to be found through special means or through powerful magic (such as <em>limited wish</em>). The duration is one year per caster level, after which the subject returns to its original shape in the location where it was first subjected to <em>wind in the waste</em>. Reduce the save DC by 4.</p>",
    "Material Component: As the binding spell; see page 204 of the Player's Handbook.",
    null,null),

    (663,4,"Desert Diversion","Conjuration","Teleporation",null,"V, S",
    "1 standard action","Medium","Ray",null,"1 min./level",
    "None","Yes",
    "Those attempting planar travel are diverted to a random wasteland.",
    "<p>A gray ray flecked with red springs from your outstretched hand. You must make a ranged touch attack to hit the target. A target struck is covered with a glittering red field that usurps some forms of planar travel. Forms of travel taken over by <em>desert diversion</em> include <em>dimension door</em>, <em>ethereal jaunt</em>, <em>etherealness</em>, <em>gate</em>, <em>greater teleport</em>, <em>plane shift</em>, <em>shadow walk</em>, <em>teleport</em>, <em>teleport object</em>, <em>teleportation circle</em>, and similar spells and spell-like abilities. If the subject of <em>desert diversion</em> casts one of the above spells, he and those traveling with him (or anyone using the <em>gate</em> or <em>teleportation circle</em> are diverted. This spell can also be cast upon a <em>gate</em> or <em>teleportation circle</em>, thereafter diverting all who use the affected spell for the duration of <em>desert diversion</em>.</p><p>Subjects are diverted to a wasteland location, chosen by the caster or randomly determined. Until <em>desert diversion</em> ends or is dispelled, the subjects of the spell cannot use any of the abovementioned spells to travel from the area. If they try, the casting simply returns them to the same spot in the middle of the waste. When the duration expires, the diversion ends, and subjects return to their point of origin.</p>",
    null,null,null),

    (664,4,"Desiccate","Necromancy",null,null,"V, S, M",
    "1 standard action","Close",null,"One living creature","Instantaneous",
    "Fortitude partial","Yes",
    "Deals 1d6/2 levels dessication damage and dehydrates living creature.",
    "<p>You evaporate moisture from the body of a living creature, dealing it 1d6 points of dessication damage per two caster levels (maximum 5d6) and making it dehydrated (see page 15 of <em>Sandstorm</em>). A successful Fortitude save results in half damage and negates the dehydration. A plant or elemental of the water subtype takes 1d8 points of damage per caster level (maximum 10d8). An elemental of the earth subtype takes only 1d4 points of damage per two caster levels (maximum 5d4).</p>",
    "Material Component: A pinch of dust.",
    null,null),

    (665,4,"Desiccate, Mass","Necromancy",null,null,"V, S, M",
    "1 standard action","Close",null,"One living creature/level, no two of which can be more than 30 ft. apart","Instantaneous",
    "Fortitude partial","Yes",
    "Desiccates several creatures.",
    "<p>This spell functions like <em>desiccate</em>, except that it affects multiple creatures. Desiccate description below for convenience:</p><p>You evaporate moisture from the body of a living creature, dealing it 1d6 points of dessication damage per two caster levels (maximum 5d6) and making it dehydrated (see page 15 of <em>Sandstorm</em>). A successful Fortitude save results in half damage and negates the dehydration. A plant or elemental of the water subtype takes 1d8 points of damage per caster level (maximum 10d8). An elemental of the earth subtype takes only 1d4 points of damage per two caster levels (maximum 5d4).</p>",
    "Material Component: A pinch of dust.",
    null,null),
    
    (666,4,"Dispel Water","Abjuration",null,null,"V, S",
    "1 standard action","Medium","See text","See text","Instantaneous",
    "See text","See text",
    "Cancels water spells and effects or dismisses water creatures.",
    "<p>You call on the power of the waste to counter and dismiss water creatures, spells, and effects. However, <em>dispel water</em> cannot counter an instantaneous spell or effect.</p><p>You choose to use <em>dispel water</em> in one of three ways: to dry up a body of water, to counter a water-based spell or effect, or to dismiss an extraplanar creature of the water subtype.</p><p><em>Dry Up Water:</em> This effect instantly destroys 200 cubic feet of water per level. Remaining water rushes in to fill the void. Cast in a large body of water, such as an ocean, the destruction of 1,000 or more cubic feet of water produces a strong current that pulls boats and creatures down. Creatures caught in the current must make a DC 20 Swim check to avoid going under. A creature that fails the Swim check is pulled down to a depth of 10 feet per caster level and must hold its breath or begin to drown (see page 304 of the <em>Dungeon Master's Guide</em>). The current might capsize vessels: The chance is 95% for a craft shorter than 20 feet long, 50% for one from 20 to 60 feet long, and 20% for one over 60 feet long.</p><p><em>Counterspell:</em> Used in this way, <em>dispel water</em> targets a spellcaster and is cast as a counterspell (see page 170 of the <em>Player's Handbook</em>). It only counters spells and spell-like abilities that have the water descriptor, or appear on the Water domain spell list, or clearly involve water (such as <em>create food and water</em>, <em>sleet storm</em>, and <em>wall of ice</em>. To successfully counter the other spell, you must make a dispel check (1d20 + your caster level, maximum +20) against a DC equal to 11 + the spell's caster level.</p><p><em>Dismiss Water Creature:</em> Cast in this way, <em>dispel water</em> targets a single extraplanar creature of the water subtype within range. The creature can negate the effect with a successful Will save (and its spell resistance, if any, applies). If it fails to save or resist the spell, the creature is forced back to its home plane.</p>",
    null,null,null),

    (667,4,"Flashflood","Conjuration","Creation","Water","V, S, DF",
    "1 standard action","120 ft.","Cone-shaped spread",null,"1 round",
    "See text","No",
    "Wave of water smashes everything in its path and floods area.",
    "<p>You create a roaring, frothing wall of water 10 feet high that erupts from where you stand and surges forward, sweeping away or smashing down nearly everything in its path. The effect lasts for 1 round, although the water created by the spell does not disappear after 1 round, during which time creatures on the ground within the area cannot move or attack. A spellcaster on the ground must make a Concentration check (DC 20 + spell level) to successfull cast a spell.</p><p>The force of the water and debris deals those caught in the area 1d6 points of nonlethal damage plus another 1d6 points per five caster levels (maximum 4d6). Any creature or object that is not soundly secured is pushed violently to the outer edge of the area. If this forces the creature or object into a solid surface, it takes 8d6 points of damage. A creature holding onto a sturdy object can make a DC 20 Strength check to avoid being moved. A creature not already holding onto such an object can make a DC 20 Reflex save or Swim check to grab one. A creature of Huge size or larger can make a DC 30 Strength check to dig in its feet and simply withstand the oncoming wave. A creature that fails any of these checks falls prone in addition to being swept away.</p><p>The specific effects and aftereffects of a <em>flashflood</em> spell on the environment depend on the nature of the terrain where it is cast. When the spell is completed, a total volume of 100,000 cubic feet of water (400 5-foot squares, in a 120-ft. cone, 10 feet deep) is left behind. This water behaves like ordinary water - draining away and leaving puddles in most cases, or perhaps forming a shallow lake or pond. Unless the caster has taken care to create the <em>flashflood</em> in a cleared area, however, the water left behind is full of debris, dirt, and perhaps a few corpses. Such water is unfit to drink.</p><p><em>Cave, Cavern, or Tunnel:</em> The sudden surge of water knocks down support beams, but otherwise has no real effect, aside from filling the tunnel with water to a depth of 10 feet. If the area is insufficient to support 100,000 cubic feet of water, the water level rises above 10 feet until the entire volume is filled, or it spills outward from the confines of the original 400 squares. What happens is based on the layout of the area. In the case of level terrain, the water simply drains away over the course of a minute or so, leaving pools in depressions from which it cannot drain. When the ground in a tunnel is not level, the water might flood sections of the tunnel. In such cases, determine whether the flooded area is sufficient to contain the entire volume of water created - and, if not, how deeply the water floods the next level up. Any creatures caught in water over their heads might drown.</p><p>For example, Miyish casts <em>flashflood</em> in the dungeon of a ruined castle. The dungeon's total volume is only 40,000 cubic feet (160 squares, with a 10-foot ceiling). The remaining 60,000 cubic feet of water has to go somewhere, so it rushes up and out the entrance to the dungeon. Since the terrain above the dungeon is another level of the castle, and is basically watertight, the water collects up here. The total volume of this level is 80,000 cubic feet (320 squares, with a 10-foot ceiling), leaving 20,000 cubic feet of air. Since the water has nowhere to go but up, and has gone as high as it can, the water on this level is 7-1/2 feet deep (60,000 cubic feet divided by 8,000 - the square footage of 320 5-doot squares). If Miyish can't swim or breathe water, he has made a grave tactical error by casting <em>flashflood</em> in an area too small to contain it.</p><p><em>Cliffs:</em> Casting <em>flashflood</em> at the base of a cliff has no effect on the cliff. Casting <em>flashflood</em> from the top of a cliff can force creature and objects over the edge, so that they take falling damage.</p><p><em>Open Ground:</em> Creatures on open ground are safest from the worst effects of <em>flashflood</em>. They might be knocked prone by the force of the water, or even swept 120 feet (24 squares) away, but they are not in any particular danger of drowning or being crushed.</p><p><em>Structure(s):</em> Any structure standing on open ground takes 60 points of damage, enough to collapse a typical wooden building, but not a structure made of stone, masonry, or reinforced masonry. Hardness reduces this damage, but it isn't halved as damage dealt to objects normally is. Any creature caught inside a collapsing structure takes 8d6 points of bludgeoning damage (Reflex DC 15 half). The debris is swept away by the <em>flashflood</em>.</p><p><em>River, Lake, or Marsh:</em> The river, lake, or marsh overflows its banks, though with rivers the effect is transitory. In the cases of lakes and marshes, destermine how much the body of water overflows, given the 100,000 cubic feet of water added to it. Only calculate this amount if the total surface area of the lake or marsh is less than 40,000 square feet - and even then, it's only academic unless its important to determine whether something on the shore gets wet.</p>",
    null,null,null),

    (668,4,"Flaywind Burst","Evocation",null,"Air, Earth","V, S, M",
    "1 round","60 ft.","Cone-shaped burst",null,"Instantaneous",
    "See text","No",
    "Blows away and knocks down smaller creatures and deals 1d6 damage/level.",
    "<p>This spell produces a brief windstorm (approximately 70 mph), filled with scouring, supernatural grit that literally strips flesh. In addition to the possible effects of the wind, creatures within the area of a <em>flaywind burst</em> spell take 1d6 points of damage per caster level (maximum 10d6) from the scouring sands. A successful Reflex save halves this damage.</p><p>A creature within the area of <em>flaywind burst</em> must make a Fortitude save or experience the effects of the wind's force. A small or smaller creature is knocked down and rolled 1d4x10 feet, taking 1d4 points of nonlethal damage per 10 feet. If flying, a Small or smaller creature is blown back 2d6x10 feet and takes 2d6 points of nonlethal damage. Medium creatures are knocked prone, or if flying are blown back 1d6x10 feet. Large or Huge creatures are unable to move forward against the force of the blast, or if flying are blown back 1d x5 feet. Gargantuan or larger creatures can move normally within a <em>flaywind burst</em>. <em>Flaywind burst</em> can't move a creature beyond its range.</p><p>In addition the the effects noted, <em>flaywind burst</em> can do anything else that a windstorm-force sandstorm would be expected to do, such as briefly obscure vision, heel over a boat, or blow gases and vapors to the limit of its area.</p>",
    "Material Component: A pinch of sand and the wing feather of a vulture.",
    null,null),
    
    (669,4,"Flesh to Salt","Transmutation",null,null,"V, S, M",
    "1 standard action","Medium",null,"One creature","Instantaneous",
    "Fortitude partial; see text","Yes",
    "Turns creature into a statue of salt.",
    "<p>You call the essence of salt forth in the target, dealing 1d6 points of damage per two caster levels (maximum 10d6). If the target takes more than half of its current hit points in damage from the spell, it must make a Fortitude saving throw or its body completely crystalizes. The subject, but not its carried gear, turns into a mindless, inert statue. If a statue resulting from this spell is broken or damaged, the subject has similar damage or deformities if ever returned to its original state. The creature is not dead, but it does not seem to be alive either when viewed with spells such as <em>deathwatch</em>.</p><p>The transformed creature takes on the consistency of rock salt (hardness 2, 5 hp per inch of thickness). Salt statues are extremely susceptible to dissolution by water - if exposed to flooding or heavy rain, they take damage that is not reduced by hardness. A constant blast of water (for example, a geyser from a <em>decanter of endless water</em>) deals 10 points of damage per minute. A steady rain deals 1 point of damage per minute.</p><p>A <em>stone to flesh</em> spell affects salt as if it were stone, returning an affected creature to its original state..</p>",
    "Material Component: A lump of rock salt.",
    null,null),

    (670,4,"Flesh to Salt, Mass","Transmutation",null,null,"V, S, M",
    "1 standard action","Medium",null,"One or more creatures, no two of which can be more than 30 ft. apart","Instantaneous",
    "See text","No",
    "Turns several creatures into statues of salt.",
    "<p>This spell functions like <em>flesh to salt</em>, except that it affects multiple creatures. You can transform one additional creature for every four caster levels, to a maximum of five creatures at 20th level. Flesh to Salt is included below for convenience:</p><p>You call the essence of salt forth in the target, dealing 1d6 points of damage per two caster levels (maximum 10d6). If the target takes more than half of its current hit points in damage from the spell, it must make a Fortitude saving throw or its body completely crystalizes. The subject, but not its carried gear, turns into a mindless, inert statue. If a statue resulting from this spell is broken or damaged, the subject has similar damage or deformities if ever returned to its original state. The creature is not dead, but it does not seem to be alive either when viewed with spells such as <em>deathwatch</em>.</p><p>The transformed creature takes on the consistency of rock salt (hardness 2, 5 hp per inch of thickness). Salt statues are extremely susceptible to dissolution by water - if exposed to flooding or heavy rain, they take damage that is not reduced by hardness. A constant blast of water (for example, a geyser from a <em>decanter of endless water</em>) deals 10 points of damage per minute. A steady rain deals 1 point of damage per minute.</p><p>A <em>stone to flesh</em> spell affects salt as if it were stone, returning an affected creature to its original state..</p>",
    "Material Component: A lump of rock salt.",
    null,null),

    (671,4,"Freedom of Breath","Abjuration",null,null,"V, S, M",
    "1 standard action","Touch",null,"Creature touched","10 min./level",
    "Will negates (harmless)","Yes (harmless)",
    "Protects against suffocation and dangerous vapors.",
    "<p>The subject can breathe freely in conditions that ordinarily inhibit respiration, such as sandstorms. While <em>freedome of breath</em> is in effect, the subject does not need to make Constitution checks to avoid the onset of suffocation unless no breathable substance is available (such as for a human underwater, or buried under sand). The spell also protects against stenches, such as those produced by a troglodyte or a <em>stinking cloud</em> spell. The subject does not have to make saves or checks against nausea and similar effects from strong odors. <em>Freedome of breath</em> also grants a +2 bonus on Fortitude saves and Constitution checks to resist poisonous vapors, such as those from a volcanic caldera or a <em>cloudkill</em> spell, for the duration of the spell.</p>",
    "Material Component: A sliver of mica.",
    null,null),

    (672,4,"Fuse Sand","Transmutation",null,"Earth","V, S, M",
    "1 standard action","Close","Up to two 10-ft. cubes per level (S)",null,"Instantaneous",
    "See text","No",
    "Hardens sand and may trap creatures.",
    "<p>This spell causes normal sand to melt slightly and stick, forming a relatively soft and porous building material (see Dungeon Waste Terrains, page 31 of <em>Sandstorm</em>). Any creature in the sand is allowed a Reflex save to escape before the area hardens. Creatures that are unable to escape become trapped and must be broken out. A creature trapped beneath the surface begins to suffocate (see page 304 of the <em>Dungeon Master's Guide</em>). The fused sand has hardness 3 and 5 hp per inch of thickness, and a break DC of 22.</p>",
    "Material Component: A glass marble.",
    null,null),

    (673,4,"Haboob","Conjuration","Creation","Air, Earth","V, S, M",
    "1 standard action","Medium","Abrasive dust spreads in 20-ft. radius, 20 ft. high",null,"1 min./level",
    "None or Reflex half; see text","No",
    "Cloud of dust obscures sight and abrades those passing through it.",
    "<p>A thick haze or swirling dust and sand swirls out from the point you designate. The effect obscures all sight, including darkvision, beyond 5 feet. A creature within 5 feet has concealment. Creatures further away have total concealment. Unprotected, nonmagical flames are automatically extinguished, and there is a 50% chance that protected flames will be snuffed.</p><p>In addition to obscuring sight, the swirling dust abrades any creature within it or attempting to move through it. Any creature passing through the haze takes 1d4 points of damage per two caster levels (maximum 5d4), with no save allowed. If you conjure <em>haboob</em> so that it appears where creatures are located, each creature takes damage as if passing through the haze. Such creatures take half damage with a successful Reflex save, but if these creatures do not leave the affected area at their next opportunity, they take full damage from the abrading sands (no save) as if they had voluntarily entered the area. Any creature that remains within the affected area for more than 1 round likewise takes damage automatically (no save).</p><p>A moderate wind (11+ mph) disperses the dust in 8 rounds; a strong wind (21+ mph) disperses it in 4 rounds. This spell does not function underwater.</p>",
    "Material Component: A pinch of ash, dust, or sand.",
    null,null),

    (674,4,"Halo of Sand","Abjuration",null,"Earth","V, S, DF",
    "1 standard action","Personal",null,"You","10 min./level",
    null,null,
    "Swirling sand grants +1 deflection bonus/3 levels.",
    "<p><em>Halo of sand</em> creates a thin band of sand that swirls and twists around your body, helping to deflect incoming attacks. The sand does not make it difficult for others to see you, but it grants a +1 deflection bonus to AC. This deflection bonus increases by 1 for every three caster levels above 3rd, to a maximum of +4 at caster level 12th.</p>",
    null,null,null),

    (675,4,"Hydrate","Conjuration","Healing",null,"V, S",
    "1 standard action","Touch",null,"Living creature touched","Instantaneous",
    "Will half; see text","Yes; see text",
    "Heals dessication damage.",
    "<p>This spell allows you to create moisture within the body of a living creature, healing damage from dehydration. <em>Hydrate</em> heals 2d8 points +1 point per caster level (maximum +10) of dessication damage, removes all nonlethal damage from dehydration, and clears up any lingering effects of the dehydrated condition.</p><p>When cast on a creature of the fire subtype, <em>hydrate</em> deals damage instead of healing. Such a creature can apply spell resistance and attempt a Will save to take half damage.</p>",
    null,null,null),

    (676,4,"Impede Sun's Brilliance","Abjuration",null,null,"S",
    "1 standard action","Close","Cylinder (10-ft. radius, 20 ft. high)",null,"10 min./level (D)",
    "None","No",
    "Diminishes the heat and light of the sun in an area.",
    "<p>This spell reduces the sun's light to a comfortable glow in a stationary area, dropping the temperature by 20 degrees. Creatures inside the effect gain a one-step improvement in protection against heat, are not subject to sunburn, and can begin to recover from sun glare and nonlethal damage due to heat (see Chapter 1 of <em>Sandstorm</em>). <em>Impede sun's brilliance</em> has no effect on <em>light</em>, <em>daylight</em>, <em>sunburst</em>, and similar magical light effects, and it offers no protection from damage that creatures vulnerable to sunlight might take from the sun.</p>",
    null,null,null),

    (677,4,"Locate Water","Divination",null,null,"V, S, F/DF",
    "1 standard action","Long","Cone-shaped emanation",null,"Concentration, up to 10 min./level",
    "None","No",
    "Reveals location, size, and quality of water sources.",
    "<p>You sense the direction of a substantial body of water. The amount of information revealed depends on how long you search a particular area.</p><p><em>1st Round:</em> Presence or absence of water.</p><p><em>2nd Round:</em> Number of water sources in the area and the rough size of the largest one present.</p><p><em>3rd Round:</em> The size (see below) and location of each source of water. If a water source is outside your line of sight, then you discern its direction but not its exact location.</p><p><em>Size:</em> For the purpose of this spell, the size categories of bodies of water are as follows.</p><p>Small: A small pond or pool (200 cubic feet or less) or a brook (5 feet across or smaller).</p><p>Medium: A large pond or small lake (up to 20,000 cubic feet) or a good-sized stream (up to 30 feet across).</p><p>Large: A large lake (up to 10 million cubic feet) or a broad river.</p><p>Vast: An ocean or an inland sea.</p><p>Creatures cannot be found by this spell. The spell ignores small quantities of water, such as filled bottles and skins. The spell reveals nothing about the quality of the water or how easy it is to reach.</p><p>The presence of fire or magma within the spell's area blocks it.</p>",
    null,"Arcane Focus: A forked hazel wand.",null),

    (678,4,"Mantle of the Fiery Spirit","Transmutation",null,null,"V, S, M, XP",
    "1 standard action","Touch",null,"Creature touched","Instantaneous",
    "Will negates (harmless)","Yes (harmless)",
    "Permanently grants one ceature the fire subtype.",
    "<p><em>Mantle of the fiery spirit</em> permanently grants the target the fire subtype.</p>",
    "Material Component: A burning lump of coal and a fire opal worth 5,000 gp.",null,
    "XP Cost: 2,000 XP."),

    (679,4,"Mephit Mob","Conjuration","Summoning","See text","V, S",
    "1 minute","Medium","Two or more summoned creatures, no two of which can be more than 30 ft. apart",null,"10 min./level (D)",
    "None","No",
    "Summons 2d6 mephits of a kind you designate.",
    "<p>This spell summons 2d6 mephits of a kind you designate. These are average mephits, as described in the <em>Monster Manual</em> and in Chapter 6 of <em>Sandstorm</em>. The mephits appear where you choose and act immediately, on your turn. They attack your opponents to the best of their ability. If you can communicate with the mephits, you can direct them not to attack, to attack particular enemies, or to perform other actions. You can dismiss them singly, or in groups, at any time.</p><p>Summoned mephits cannot summon or otherwise conjure another creature, nor can they use any teleportation or planar travel abilities. Mephits cannot be summoned into an environment that cannot support them.</p><p>When you use a summoning spell to summon an air, earth, fire, or water creature, it is a spell of that type. For example, <em>mephit mob</em> is an earth sell when you cast it to summon salt mephits.</p>",
    null,null,null),

    (680,4,"Mummify","Necromancy",null,null,"V, S, M/DF",
    "1 standard action","Touch",null,"One living creature","Instantaneous",
    "Fortitude partial; see text","Yes",
    "Touched living creature dies and is mummified.",
    "<p>You flash-dry a creature, killing it and preserving it in an instantaneous mummification process. A creature that makes a successful Fortitude saving throw instead takes 6d6 points of dessication damage and is dehydrated. If the damage kills the target, it is still mummified.</p>",
    "Arcane Material Component: A strip of salted cloth",
    null,null),

    (681,4,"Parboil","Evocation",null,"Fire","V, S, M/DF",
    "1 standard action","Close","20-ft.-radius spread",null,"Instantaneous",
    "Fortitude partial; see text","Yes",
    "Flash-heats air dealing fire and Intelligence damage to one or more creatures.",
    "<p>You flash-heat the air in an area, boiling the blood and baking the brains of creatures caught inside. The hot air deals 6d6 points of fire damage and 2d4 points of Intelligence damage. Creatures that make successful Fortitude saves take half fire damage and no Intelligence damage.</p>",
    "Arcane Material Component: Water and a pinch of sulfur",
    null,null),

    (682,4,"Parching Touch","Necromancy",null,null,"V, S",
    "1 standard action","Touch",null,"Living creature or creatures touched (up to one/level)","Instantaneous",
    "Fortitude partial; see text","Yes",
    "One touch/level deals 1d6 dessication damage and possbly 1 Con damage.",
    "<p>Your hand glows with a dull, ruby light, and your touch drains moisture from the body of a living creature, dealing 1d6 points of dessication damage. A plant or elemental of the water subtype instead takes 1d8 points of dessication damage. A touched creature also takes 1 point of Constitution damage and is dehydrated unless it makes a successful Fortitude saving throw. You can use this melee touch attack up to once per caster level.</p>",
    null,null,null),

    (683,4,"Protection from Dessication","Abjuration",null,null,"V, S, DF",
    "1 standard action","Touch",null,"Living creature touched","10 min./levl or until discharged",
    "Fortitude negates (harmless)","Yes (harmless)",
    "Absorb 10 points/level of dessication damage.",
    "<p>The warded creature gains temporary immunity to dehydration of any kind. While protected by the spell, the subject cannot become dehydrated even if it takes dessication damage. Once the spell has prevented a total of 10 points of damage from dehydration per caster level (maximum 100 points), whether that damage is dessication damage or nonlethal damage, it is discharged.</p>",
    null,null,null),
    
    (684,4,"Sandform","Transmutation",null,null,"V, S, M",
    "1 standard action","Personal",null,"You","1 min./level (D)",
    null,null,
    "You become an oozelike being of sand.",
    "<p>This spell transforms your body, along with all equipment worn or carried, into living sand. You take the form of an ooze, and you gain immunity to poison, sleep effects, paralysis, polymorphing, and stunning for the duration of the spell. You are not subject to extra damage from critical hits or flanking. Since, unlike an ooze, you are not mindless and retain your Intelligence, Wisdom, and Charisma scores, you can still be affected by mind-affecting spells and abilities. While in <em>sandform</em>, you don't experience the environmental effects of heat or dehydration, but you can still take fire or dessication damage. You become blind, but you gain blindsight out to 60 feet. Your base attack bonus, base saves, alignment, level, class, hit points, type (and subtype), extraordinary abiltiies, spells, and spell-like abilities remain unchanged, but your supernatural abilities are suppressed in <em>sandform</em>. You can cast spells for which you have components.</p><p>The new form can be disorienting. Any time you are in a demanding situation (such as combat), you must succeed on a DC 19 Will save or take a -2 penalty on all attack rolls, saves, skill checks, and ability checks until the situation passes.</p><p>While in <em>sandform</em>, you have a base land speed of 20 feet. You can pass through openings as small as a quarter of an inch in diameter, although passing through a space two or more size categories smaller than yours takes a full-round action. You also gain a natural attack - an abrsasive slam with a gritty pseudopod that grants 5 additional feet of reach. A successful hit deals bludgeoning damage according to your size:</p><table><thead><tr><th><strong>Caster Size</strong></th><th><strong>Slam Damage</strong></th></tr></thead><tbody><tr><td>Fine</td><td>-</td></tr><tr><td>Diminutive</td><td>1</td></tr><tr><td>Tiny</td><td>1d4</td></tr><tr><td>Small</td><td>1d6</td></tr><tr><td>Medium</td><td>1d8</td></tr><tr><td>Large</td><td>2d6</td></tr><tr><td>Huge</td><td>3d6</td></tr><tr><td>Gargantuan</td><td>4d6</td></tr><tr><td>Colossal</td><td>5d6</td></tr></tbody></table><p>The number of times you can attack with this pseudopod each round is determined by your base attack bonus, and you apply 1-1/2 times your Strength bonus on damage as though attacking with a two-handed weapon. However, you cannot wield weapons while in <em>sandform</em>.</p><p>In sandy terrain, you gain a burrow speed equal to your base land speed. You also gain a +10 circumstance bonus on all Hide checks and you have concealment.</p><p>Upon death, you revert to your original form.</p>",
    "Material Component: A handful of sand taken from an elemental with the earth subtype.",
    null,null),
    
    (685,4,"Sandstorm","Conjuration","Creation","Air, Earth","V, S",
    "1 standard action","40 ft./level","40 ft./level radius cylinder 40 ft. high",null,"10 min./level",
    "Fortitude negates","No",
    "Creates a controlled duststorm.",
    "<p>You create a duststorm or sandstorm. <em>Sandstorm uses the parameters of <em>control winds</em> (see page 214 of the <em>Player's Handbook</em>), differing from that spell as shown above and as follows. A spellcaster who knows <em>sandstorm</em> need not be in an area of exposed, sandy soil to create the effects describes below - this spell conjures both sand and wind.</p><p><em>Dustorm Strength:</em> For every three caster levels, you can increase or decrease wind strength by one level. Wind speeds of less than severe are insuffiennt to carry suspended sand. (Wind strength and related duststorm effects are briefly summarized below, with more detail found on page 16 of <em>Sandstorm</em>.) Each round on your turn, creatures in the area must make Fortitude saves or suffer the effects of being in the wind, as well as the effects of suspended grit.</p><p>A severe wind (31+ mph) causes minor ship and building damage, and creates a duststorm with fine grains of sand that reduces visibility, smother unprotected flames, and even chokes protected flames.</p><p>A windstorm (51+ mph) drives most flying creatures from the skies, uproots small trees, knocks down light wooden structures, tears off roofs, and endangers ships. Wind of this speed creates a sandstorm that badly reduces visibility and deals 1d2 points of nonlethal damage each round to anyone caught out in the open.</p><p>Hurricane force winds (75+ mph) destroy wooden buildings, sometimes uproot even large trees, and cause most ships to founder. Wind of this speed creates a flensing sandstorm that severely reduces visibility and deals 1d3 points of lethal damage each round to anyone caught out in the open.</p><p>A tornado (175+ mph) destroys all nonfortified buildings and often uproots large trees. Tornado-force sandstorms are of the flensing variety.</p>",
    null,null,null),
    
    (686,4,"Scalding Mud","Transmutation",null,"Earth, Fire","V, S, M/DF",
    "1 standard action","Medium",null,null,"Permanent; see text",
    "See text","No",
    "Transmute rock or earth into boiling muck.",
    "<p>This spell functions like <em>transmute rock to mud</em> (see page 295 of the <em>Player's Handbook</em>), except that it can be cast on sand, earth, and unworked, nonmagical rock (within the normal restrictions for <em>transmute rock to mud</em>), and the mud created is boiling hot. Creatures mired in the hot mud take 5d6 points of fire damage per round, while those completely submerged in the sludge take 10d6 points of fire damage per round. Creatures atop the mud (such as those standing on straw) take 1d6 points of fire damage each round from hot steam. Damage from boiling mud continues for 1d3 rounds after exposure ceases, but this additional damage is only 1d6 points of fire damage per round.</p><p>The transmuted material cools after a period of 1 round per caster level. The number of dice of damage the mud deals is halved each round after this duration expires. The transmuted rock remains as mud even after it cools. It eventually dries into soil, as per <em>transmute rock to mud</em>.</p>",
    "Arcane Material Component: A pinch of a mixture of clay, sulfur, and water.",
    null,null),
    
    (687,4,"Scimitar of Sand","Evocation",null,"Earth","V, S, M/DF",
    "1 standard action","0 ft.","Scimitar of grinding sand",null,"1 min./level (D)",
    "Fortitude partial","Yes",
    "Sand sword deals 1d6 damage +1/2 levels and renders the target dehydrated.",
    "<p>A curved, 3-foot long blade of sand springs forth from your hand, screaming and churning like a caged sandstorm. Attacks with a <em>scimitar of sand</em> are melee touch attacks. The blade deals 1d6 points of damage +1 point per two caster levels (maximum +10). The blade is not solid, so your Strength modifier does not apply to the damage. You can use a <em>scimitar of sand</em> without penalty even if you lack proficiency with a normal scimitar. In addition to being dealt damage, a creature struck by your weapon must succeed on a Fortitude save or become dehydrated.</p>",
    "Arcane Material Component: A pinch of sand, salt, and iron filings.",
    null,null),
    
    (688,4,"Searing Exposure","Evocation",null,"Fire, Light", "V, S, M/DF",
    "1 standard action","Medium",null,"One living creature","Instantaneous",
    "Fortitude partial; see text","Yes",
    "Target suffers hours of wasteland exposure in a moment.",
    "<p>You expose the target to the effect of hours of exposure to severe heat and the desert sun in only a moment. The subject must make a Fortitude saving throw or take 1d4 points of nonlethal damage per caster level (maximum 15d4). Nonlethal damage that exceeds the subject's hit points is considered lethal damage. In addition, the subject is dazzled (as if by sun glare), dehydrated, and sunburned (see Chapter 1 of <em>Sandstorm</em>). Protection from heat and exposure (such as a keepcool salve or a hydration suit; see Chapter 4 of <em>Sandstorm</em>) helps mitigate these effects, providing the target with a +4 bonus on the Fortitude save. A creature wearing heavy clothing or armor takes a -4 penalty on the Fortitude saving throw, but is not sunburned. Those that succeed on their Fortitude saves take half damage, are dehydrated, and are dazzled for 1d4+1 rounds.</p>",
    "Arcane Material Component: A shard of thick glass",
    null,null),
    
    (689,4,"Skin of the Cactus","Abjuration",null,null,"V, S, M",
    "1 standard action","Touch",null,"Living creature touched","10 min./level",
    "None","Yes (harmless)",
    "Grants natural armor, thorns, and resistance to dehydration.",
    "<p>This spell grants a living creature the toughness, resilience, and needles of a cactus. The effect grants a +3 enhancement bonus to the creature's existing natural armor bonus. This enhancement bonus increases to +4 at caster level 10th and to a maximum of +5 at caster level 13th.</p><p>In addition to the enhancement bonus, <em>skin of the cactus</em> causes the subject to grow needles from its skin, clothing, or armor. Any creature grappling the subject or striking it with natural weapons takes 1d6 points of piercing damage from the needles.</p><p>Finally, the subject of this spell is protected from nonlethal damage due to dehydration. <em>Skin of the cactus</em> provides the subject with a +4 bonus on saves to resist becoming dehydrated from heat or exposure, but it offers no protection against dessication damage or spells that cause a target to become dehydrated.</p><p>The enhancement bonus provided by <em>skin of the cactus</em> stacks with the target's natural armor bonus, but not with other enhancement bonuses to natural armor. A creature without natural armor has an effective natural armor bonus of +0, much as a character wearing only normal clothing has an armor bonus of +0.</p>",
    "Material Component: A cactus spine.",
    null,null),
    
    (690,4,"Sleep Mote","Enchantment","Compulsion","Mind-Affecting","V, S, M/DF",
    "1 standard action","Medium","5-ft.-diameter sphere",null,"1 round/level; see text",
    "Will partial","Yes",
    "Dust devil of magic sand puts foes to sleep.",
    "<p>You create a dust devil composed of slumber-inducing particles. It flies at a speed of 30 feet per round (perfect maneuverability), and you can concentrate on controlling its every movement or specify a simple program. Directing the vortex's movement is a move action, while changing its programmed movement is a standard action. If you don't move or program the vortex, it merely stays at rest, spinning and howling. The vortex dissipates if it exceeds the spell's range.</p><p>If the <em>sleep mote</em> enters a space with a creature, it stops moving for the round and causes a magical slumber to come upon any creature whose space it completely engulfs that fails a Will saving throw (thus, creatures larger than Medium size have immunity to a <em>sleep mote</em>. Even on a successful Will saving throw, affected creatures are sleepy, and take a -2 penalty on all Wisdom, Intelligence, and Charisma checks for the spell's duration.</p><p>Sleeping creatures are helpless. Sapping or wounding awakens an affected creature, but normal noise does not. Awakening a creature is a standard action (an application of the aid another action). <em>Sleep mote</em> has no effect on unconscious creatures.</p>",
    "Arcane Material Component: A pinch of fine sand and a live cricket.",
    null,null),
    
    (691,4,"Slipsand","Transmutation",null,null,"V, S, M",
    "1 standard action","Close","One 10-ft.-cube region of slipsand/level",null,"Permanent",
    "See text","No",
    "Creates a volume of slipsand.",
    "<p>This spell turns an area of natural sand into a pit of deadly slipand (see page 25 of <em>Sandstorm</em>). Supernatural sandlike materials, such as black sand or slumber sand, are not affected by the spell. A creature unable to free itself from the slipsand immediately sinks to the bottom and must hold its breath or begin to suffocate.</p><p>If <em>slipsand</em> is cast on a structure of fused sand or on a sandy foundation, it causes the affected part (or more) of the structure to collapse. If the spell is cast on a building's material, slipsand spreads out to fill the available space, possibly burying those within its area. The collapsing structure is also dangerous (see Cave-ins and Collapses, page 66 of the <em>Dungeon Master's Guide</em>).</p><p><em>Slipsand</em> creates a magic trap that is difficult to detect. A character must succeed on a Survival check (DC equals the save DC of the spell) to notice a pit of slipsand. Running or charging characters have no chance to detect the trap. A rogue can find the trap with a successful Search check, but cannot disable it. The DC is 25 + spell level, or 29 for <em>slipsand</em>.</p>",
    "Material Component: A pinch of slipsand.",
    null,null),
    
    (692,4,"Soul of the Waste","Transmutation",null,"Earth","V, S, DF",
    "1 standard action","Personal",null,"You","10 min./level (D)",
    null,null,
    "Meld into surrounding sand.",
    "<p>You meld your body and possessions into an accumulation of sand, dust, ash, or even loose earth. The area must be large enough to acommodate your body in all three dimensions. When the casting is complete, you and not more than 100 pounds of nonliving gear merge with the sand. While in the sand, you remain aware of the passage of time, can cast spells on yourself, and can still hear on the surface above you, but you cannot see or communicate.</p><p>Since the substance you inhabit is an accumulation of many particles, it is difficult to damage the material (and you). If some creature were to shovel or otherwise remove sufficient sand from the area so that you no longer fit within it, you are expelled and take 5d6 points of damage. Any time before the duration expires, you can step out of the sand (or become physical while still partially or wholly within the sand). If the spell's duration expires or the effect is dispelled before you voluntarily exit, you are violently expelled and take 5d6 points of damage.</p><p>The following spells affect you if you cast upon the sand you are occupying: <em>Control sand</em> and <em>move earth</em> merely move you along with their effects. <em>Transmute sand to glass</em> or <em>transmute sand to stone</em> expels you and slays you instantly unless you make a DC 18 Fortitude save, in which case you are expelled and take 5d6 points of damage.</p>",
    null,null,null),
    
    (693,4,"Storm Mote","Evocation",null,"Air, Earth","V, S, M/DF",
    "1 standard action","Medium","Cylinder (5-ft. radius, 10 ft. high)",null,"1 round/level",
    "Fortitude half","Yes",
    "Dust devil of flesning sand.",
    "<p>You create a whirling vortex of sand. It flies at a speed of 60 feet per round (perfect maneuverability), and you can concentrate on controlling its every movement or specify a simple program. Directing the vortex's movement is a move action, while changing its programmed movement is a standard action. If you don't move or program the vortex, it merely stays at rest, spinning and howling. The vortex dissipates if it exceeds the spell's range.</p><p>If a <em>storm mote</em> enters a space with a creature, it stops moving for the round and deals 2d8 points of damage to the creature. A successful Fortitude save reduces the damage by half.</p><p>Those outside the vortex have concealment against those inside. The vortex extinguishes all nonmagical flame.</p>",
    "Arcane Material Component: A pinch of sand",
    null,null),
    
    (694,4,"Summon Desert Ally I","Conjuration","Summoning",null,"V, S, DF",
    "1 round","Close","One summoned creature",null,"1 round/level (D)",
    "None","No",
    "Calls dustform creature to fight.",
    "<p>This spell summons a dustform creature (see page 161). It appears where you designate and acts immediately on your turn. It attacks your opponents to the best of its ability. If you can communicate with the creature, you can direct it not to attack, to attack particular enemies, or to perform other actions.</p><p>A summoned creature cannot summon or otherwise conjure another creature, nor can it use any teleporation or planar travel abilities. Creatures cannot be summoned into an environment that cannot support them.</p><p>This spell conjures one of the creatures from the 1st-level list on the accompanying Summon Desert Ally table. You choose which kind of creature to summon, and you can change that choice each time you cast the spell. All the creatures on the table are neutral unless otherwise noted.</p>",
    null,null,null),
    
    (695,4,"Summon Desert Ally II","Conjuration","Summoning",null,"V, S, DF",
    "1 round","Close","One or more creatures, no two of which can be more than 30 ft. apart",null,"1 round/level (D)",
    "None","No",
    "Calls dustform creature to fight.",
    "<p>This spell functions like <em>summon desert ally I</em>, except that you can summon one 2nd-level creature or 1d3 1st-level creatures of the same kind.</p>",
    null,null,null),
    
    (696,4,"Summon Desert Ally III","Conjuration","Summoning",null,"V, S, DF",
    "1 round","Close","One or more creatures, no two of which can be more than 30 ft. apart",null,"1 round/level (D)",
    "None","No",
    "Calls dustform creature to fight.",
    "<p>This spell functions like <em>summon desert ally I</em>, except that you can summon one 3rd-level creature or 1d3 2nd-level creatures of the same kind, or 1d4+1 1st-level creatures of the same kind.</p>",
    null,null,null),
    
    (697,4,"Summon Desert Ally IV","Conjuration","Summoning",null,"V, S, DF",
    "1 round","Close","One or more creatures, no two of which can be more than 30 ft. apart",null,"1 round/level (D)",
    "None","No",
    "Calls dustform creature to fight.",
    "<p>This spell functions like <em>summon desert ally I</em>, except that you can summon one 4th-level creature or 1d3 3rd-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.</p>",
    null,null,null),
    
    (698,4,"Summon Desert Ally V","Conjuration","Summoning",null,"V, S, DF",
    "1 round","Close","One or more creatures, no two of which can be more than 30 ft. apart",null,"1 round/level (D)",
    "None","No",
    "Calls dustform creature to fight.",
    "<p>This spell functions like <em>summon desert ally I</em>, except that you can summon one 5th-level creature or 1d3 4th-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.</p>",
    null,null,null),

    (699,4,"Summon Desert Ally VI","Conjuration","Summoning",null,"V, S, DF",
    "1 round","Close","One or more creatures, no two of which can be more than 30 ft. apart",null,"1 round/level (D)",
    "None","No",
    "Calls dustform creature to fight.",
    "<p>This spell functions like <em>summon desert ally I</em>, except that you can summon one 6th-level creature or 1d3 5th-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.</p>",
    null,null,null),

    (700,4,"Summon Desert Ally VII","Conjuration","Summoning",null,"V, S, DF",
    "1 round","Close","One or more creatures, no two of which can be more than 30 ft. apart",null,"1 round/level (D)",
    "None","No",
    "Calls dustform creature to fight.",
    "<p>This spell functions like <em>summon desert ally I</em>, except that you can summon one 7th-level creature or 1d3 6th-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.</p>",
    null,null,null),

    (701,4,"Summon Desert Ally VIII","Conjuration","Summoning",null,"V, S, DF",
    "1 round","Close","One or more creatures, no two of which can be more than 30 ft. apart",null,"1 round/level (D)",
    "None","No",
    "Calls dustform creature to fight.",
    "<p>This spell functions like <em>summon desert ally I</em>, except that you can summon one 8th-level creature or 1d3 7th-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.</p>",
    null,null,null),

    (702,4,"Summon Desert Ally IX","Conjuration","Summoning",null,"V, S, DF",
    "1 round","Close","One or more creatures, no two of which can be more than 30 ft. apart",null,"1 round/level (D)",
    "None","No",
    "Calls dustform creature to fight.",
    "<p>This spell functions like <em>summon desert ally I</em>, except that you can summon one 9th-level creature or 1d3 8th-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.</p><table>
    <thead>
        <tr>
            <th><strong>1st Level</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Baboon</td></tr>
        <tr><td>Badger</td></tr>
        <tr><td>Dire rat</td></tr>
        <tr><td>Dog</td></tr>
        <tr><td>Giant fire beetle</td></tr>
        <tr><td>Hawk</td></tr>
        <tr><td>Jackal*</td></tr>
        <tr><td>Monstrous centipede, Medium</td></tr>
        <tr><td>Monstrous scorpion, Small</td></tr>
        <tr><td>Monstrous spider, Small</td></tr>
        <tr><td>Owl</td></tr>
        <tr><td>Raven</td></tr>
        <tr><td>Serval*</td></tr>
        <tr><td>Snake, Small viper</td></tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th><strong>2nd Level</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Donkey</td></tr>
        <tr><td>Eagle</td></tr>
        <tr><td>Formian worker</td></tr>
        <tr><td>Giant ant, worker</td></tr>
        <tr><td>Hyena</td></tr>
        <tr><td>Monstrous scorpion, Medium</td></tr>
        <tr><td>Monstrous spider, Medium</td></tr>
        <tr><td>Riding dog</td></tr>
        <tr><td>Snake, Medium viper</td></tr>
        <tr><td>Vulture*</td></tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th><strong>3rd Level</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Ashworm*</td></tr>
        <tr><td>Bat swarm</td></tr>
        <tr><td>Camel</td></tr>
        <tr><td>Cheetah</td></tr>
        <tr><td>Dire badger</td></tr>
        <tr><td>Dire bat</td></tr>
        <tr><td>Giant ant, soldier</td></tr>
        <tr><td>Monstrous centipede, Large</td></tr>
        <tr><td>Snake, Large viper</td></tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th><strong>4th Level</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Ankheg</td></tr>
        <tr><td>Deinonychus</td></tr>
        <tr><td>Dire jackal*</td></tr>
        <tr><td>Giant ant, queen</td></tr>
        <tr><td>Giant eagle</td></tr>
        <tr><td>Giant owl</td></tr>
        <tr><td>Monstrous spider, Large</td></tr>
        <tr><td>Protoceratops*</td></tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th><strong>5th Level</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Dire vulture*</td></tr>
        <tr><td>Formian, warrior</td></tr>
        <tr><td>Lion</td></tr>
        <tr><td>Locust swarm</td></tr>
        <tr><td>Monstrous centipede, Huge</td></tr>
        <tr><td>Monstrous scorpion, Large</td></tr>
        <tr><td>Snake, Huge viper</td></tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th><strong>6th Level</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Diprotodon*</td></tr>
        <tr><td>Dire lion</td></tr>
        <tr><td>Giant stag beetle</td></tr>
        <tr><td>Hippopotamus*</td></tr>
        <tr><td>Megaraptor</td></tr>
        <tr><td>Monstrous centipede, Gargantuan</td></tr>
        <tr><td>Monstrous spider, Huge</td></tr>
        <tr><td>Rhinoceros</td></tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th><strong>7th Level</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Elephant</td></tr>
        <tr><td>Formian, taskmaster</td></tr>
        <tr><td>Giant banded lizard*</td></tr>
        <tr><td>Monstrous scorpion, Huge</td></tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th><strong>8th Level</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Dire tortoise*</td></tr>
        <tr><td>Dunewinder*</td></tr>
        <tr><td>Monstrous centipede, Colossal</td></tr>
        <tr><td>Monstrous spider, Gargantuan</td></tr>
        <tr><td>Triceratops</td></tr>
        <tr><td>Tyrannosaurus</td></tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th><strong>9th Level</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Monstrous scorpion, Gargantuan</td></tr>
        <tr><td>Monstrous spider, Colossal</td></tr>
    </tbody>
</table>
<p>* New monster described in Chapter 6 of <em>Sandstorm</em></p>",
    null,null,null),
    
    (703,4,"Sunstroke","Necromancy",null,null,"V, S",
    "1 standard action","Close",null,"One living creature","Instantaneous",
    "Fortitude partial; see text","Yes",
    "Target takes 2d6 nonlethal damage and is fatigued.",
    "<p>You cause a living creature to experience the effects of heatstroke. The target takes 2d6 points of nonlethal damage. If the target fails a Fortitude save, it immediately becomes fatigued, or exhausted if already fatigued. Since this spell causes heatstroke, the damage and fatigue dealt can only be healed after that condition is treated properly (see page 13 of <em>Sandstorm</em>).</p>",
    null,null,null),
    
    (704,4,"Surelife","Abjuration",null,null,"V, S, M",
    "1 round","Personal",null,"You","1 min./level",
    null,null,
    "Protects you from death due to hazards.",
    "<p>This spell protects you against some condition - such as being immersed in boiling oil or buried under an avalanche - that would ordinarily cause certain death. You can protect yourself only against a natural occurance or nonmagical condition, not against a spell or the action of a creature (such as the breath of a dragon or the swords of a group of bandits). At the time of the casting, you must specify the condition against which you wish to protect yourself, and the spell is effective against only that condition. Should you be subjected to that condition during the duration of the spell, you feel no discomfort and take no damage from the condition, though the spell does not protect any items you carry. If you are still subject to the condition at the end of the spell's duration, you experience its full normal effects.</p>",
    "Material Component: An ointment of peach syrup and cinnabar.",
    null,null),
    
    (705,4,"Symbol of Thirst","Enchantment","Compulsion","Mind-Affecting","V, S, M",
    "10 minutes","0 ft.; see text",null,"One symbol","See text",
    "Will negates","Yes",
    "Triggered rune overwhelms nearby creatures with thirst.",
    "<p>This spell functions like <em>symbol of death</em> (see page 289 of the <em>Player's Handbook</em>), except that all creatures within 60 feet of a <em>symbol of thirst are consumed by a terrible sense of thirst (as the <em>tormenting thirst</em> spell; see page 124 of <em>Sandstorm</em>) for 10 minutes per caster level.</p><p><em>Note:</em> Magic traps, such as <em>symbol of thirst</em>, are hard to detect and disable. A rogue (only) can use the Search skill to find a <em>symbol of thirst</em> and Disable Device to thwart it. The DC in each case is 25 + spell level, or 32 for <em>symbol of thirst</em>.</p>",
    "Material Component: Mercury and phosphorus, plus powdered diamond and opal with a total value of at least 5,000 gp.",
    null,null),
    
    (706,4,"Tormenting Thirst","Enchantment","Compulsion","Mind-Affecting","V, S",
    "1 standard action","Close",null,"One living creature","1 round/level",
    "Will negates","Yes",
    "Subject is overwhelmed by thirst.",
    "<p>This spell fills the subject with a terrible sense of thirst. Desperate and unable to focus on any other goal, it must drink as deeply as it can. The affected creature runs to the nearest body of water in sight, grabs and empties the closest container of water or liquor (even those carried by allies), or runs toward the nearest known source of water. No matter how much the subject drinks, the sensation of thirst is not quenched.</p><p>If denied the opportunity to quench its thirst, an affected creature flies into a rage similar to the barbarian class feature (see page 25 of the <em>Player's Handbook</em>). The subject attacks friend and foe alike in its quest to find water, though not necessarily with lethal force.</p>",
    null,null,null),
    
    (707,4,"Transcribe Symbol","Abjuration",null,null,"V, S, F",
    "1 standard action","Touch",null,"Magic symbol touched","10 minutes or until discharged",
    "None","No",
    "Safely moves an untriggered magical symbol to another location.",
    "<p>You place a protective spell upon your hand that allows you to touch an untriggered magic sigil (such as a <em>glyph of warding</em> or <em>symbol of death</em>), and even move it, without triggering it. To pick up the symbol in this manner, you must make a successful caster level check (DC 20 + spell level). Failure indicates that you trigger the magic sigil. If the check is successful, you transfer the sigil to your hand. You can then use a standard action to place it upon a surface of the sort on which it can normally be inscribed. The transferred sigil works normally thereafter and retains its original triggering conditions, although its new location might make those conditions difficult or impossible to achieve.</p><p>You can maintain the magic sigil on your hand as long as you concentrate, up to the duration of the spell. If your concentration lapses or the spell duration expires while the sigil is stored, it immediately triggers upon you (and only you), even if you would normally not meet its trigger conditions. The effect has the same saving throw and spell resistance aspects as the original sigil did. The only safe way to rid yourself of a stored sigil is to place it upon a suitable surface.</p>",
    null,"Focus: A piece of slate that is smooth on one side.",null),
    
    (708,4,"Transmute Sand to Glass","Transmutation",null,"Earth","V, S, M/DF",
    "1 standard action","Medium","Up to two 10-ft. cubes/level (S)",null,"Permanent",
    "See text","No",
    "Transforms two 10-ft. cubes per level.",
    "<p>This spell transforms a mass of normal sand of any depth into solid glass permanently. Any creature in the sand is allowed a Reflex save to escape before the area is hardened to glass. Creatures unable to escape the area become trapped and must be broken out. A creature so caught can break free by making a Strength check to break the glass or by dealing damage to the glass. Glass has hardness 1, 1 hit point per inch of thickness, and a break DC of 12, +1 per inch of thickness. A creature partially caught in the glass takes a -2 penalty on attack rolls and a -4 penalty to Dexterity, and is unable to move. When breaking glass, a creature takes 1d6 points of damage each time it makes a successful Strength check to break free. If broken free by others, the creature takes 1d6 points of damage from broken glass. A creature trapped beneath the surface of the glass may begin to suffocate (see page 304 of the <em>Dungeon Master's Guide</em>).</p>",
    "Arcane Material Component: A mixture of crushed glass and sand.",
    null,null),
    
    (709,4,"Transmute Sand to Stone","Transmutation",null,"Earth","V, S, M/DF",
    "1 standard action","Medium","Up to two 10-ft. cubes/level (S)",null,"Permanent",
    "See text","No",
    "Transforms two 10-ft. cubes per level.",
    "<p>This spell transforms a mass of sand of any depth into solid stone permanently. Any creature in the sand is allowed a Reflex save to escape before the area is hardened to stone. If the creature fails its save, it is entangled and can't move. It is not considered helpless, however, and it can break out by damaging the stone. Stone has hardness 8 and 15 hit points per inch of thickness. The creature can also make a Strength check to break free. The break DC is 20, +2 per inch of thickness of the stone.</p><p><em>Transmute sand to stone</em> counters and dispels <em>transmute stone to sand</em>.</p>",
    "Arcane Material Component: Sand, dirt, and water.",
    null,null),
    
    (710,4,"Transmute Stone to Sand","Transmutation",null,"Earth","V, S, M/DF",
    "1 standard action","Medium","Up to two 10-ft. cubes/level (S)",null,"Permanent",
    "See text","No",
    "Transforms two 10-ft. cubes per level.",
    "<p>This spell turns natural, uncut, or unworked stone of any sort into an equal volume of sand. If the spell is cast upon a boulder, for example, the boulder collapses into a heap of sand. Magical stone is not affected by this spell. The depth of the sand created cannot exceed 10 feet.</p><p>If <em>transmute stone to sand</em> is cast upon the ceiling of a cavern or tunnel, the sand falls to the floor and scatters in a pile 5 feet deep. For example, a 10th-level caster could convert twenty 10-foot cubes into sand. Piling on the floor, this sand would cover an area of forty 10-foot squares to a depth of 5 feet. The falling sand and ensuing cave-in deal 8d6 points of bludgeoning damage to anyone caught directly beneath the area, or half damage to those who succeed on Reflex saves.</p><p>Castles and large stone buildings generally have immunity to this spell, since <em>transmute stone to sand</em> can't affect worked stone and doesn't reach deep enough to undermine such building's foundations. However, small buildings or structures often rest upon foundations shallow enough to be damaged or even partially toppled by this spell.</p><p>The sand remains until a successful <em>dispel magic</em> or <em>transmute sand to stone</em> spell restores its substance - though not necessarily its form.</p>",
    "Arcane Material Component: Sandstone and granite.",
    null,null),
    
    (711,4,"Unearthly Heat","Transmutation",null,null,"V, S",
    "1 standard action","Touch",null,"Living creature touched","1 round/level",
    "Fortitude negates; see text","Yes",
    "Target is subjected to unearthly heat for 1 round/level.",
    "<p>Your touch raises the effective body temperature of the target as though it were exposed to unearthly heat. Each round, the subject takes 1d6 points of lethal damage and 1d4 points of nonlethal damage. A creature can make a Fortitude save each round for the spell's duration to negate the damage. A creature that takes damage from the spell is fatigued (or exhausted if it is already fatigued). Partially protected creatures can reduce the effects and make Fortitude saves to avoid damage and fatigue each round (see Protection against Heat, page 14 of <em>Sandstorm</em>). A creature wearing heavy clothing or armor takes a -4 penalty on its save.</p>",
    null,null,null);