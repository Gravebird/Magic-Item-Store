const dnd_data_controller = require("../controller/dnd_data_controller");

/**
 * Checks if the given weapon name is the name of ammunition.
 * Returns 0 if not, or the amount of ammunition per stack if it is ammunition.
 * 
 * @param {String} weaponName the name of the weapon
 * @returns the number of ammunition of this weapon. (0 if not ammo, > 0 if ammo)
 */
function is_weapon_ammunition(weaponName) {
    let toCheck = 0;
    if (weaponName == "Dart") {
        return 1;
    } else if (weaponName.includes("Shuriken")) {
        toCheck = weaponName.substring(weaponName.length - 3);
    } else {
        toCheck = weaponName.substring(weaponName.length - 4)
    }

    if (toCheck.includes("(") && toCheck.includes(")")) {
        return parseInt(toCheck.substring(1, toCheck.length - 1));
    }
    return 0;
}

/**
 * Checks if the given weapon is a double sided weapon.
 * Returns true if so, false if not.
 * It checks by looking at the weapon medium damage and checking if there is
 * a / in there. Example, a double sided weapon would have 1d6/1d6 or something like that.
 * 
 * @param {*} baseWeapon The base weapon object from the database. This could maybe
 * be changed to the medium damage if the generation is taking too long.
 * @returns true if double weapon, false if not
 */
function isDoubleWeapon(baseWeapon) {
    if (baseWeapon.Weapon_Medium_Damage == null) {
        return false;
    }
    if (baseWeapon.Weapon_Medium_Damage.includes("/")) {
        return true;
    }
    return false;
}

/**
 * Determines the gold cost of making the given weapon into a masterwork weapon.
 * Most weapons cost 300 gold to make masterwork.
 * Ammunition and double weapons cost less or more.
 * 
 * @param {*} baseWeapon The base weapon object from the database
 * @returns The gold cost to make the given weapon masterwork.
 */
function getMasterworkCost(baseWeapon) {
    if (baseWeapon["Weapon_Medium_Damage"] != null && baseWeapon["Weapon_Medium_Damage"].includes("/")) {
        // Double Weapon = 600 gp
        return parseFloat(600);
    } else if (baseWeapon["Weapon_Name"] == "Dart") {
        // Darts are single ammunitions = 6 gp
        return parseFloat(6);
    } else {
        let toCheck;
        if (baseWeapon["Weapon_Name"].includes("Shuriken")) {
            // Shuriken have single-digit ammunition amounts
            toCheck = baseWeapon["Weapon_Name"].substring(baseWeapon["Weapon_Name"].length - 3);
        } else {
            toCheck = baseWeapon["Weapon_Name"].substring(baseWeapon["Weapon_Name"].length - 4);
        }
        if (toCheck.includes("(") && toCheck.includes(")")) {
            // Ammunition! cost is 6 gp per ammo
            amount = parseInt(toCheck.substring(1, toCheck.length - 1));
            return parseFloat(6 * amount);
        } else {
            // Normal weapon = 300 gp
            return parseFloat(300);
        }
    }
}

/**
 * Takes the property data and the base weapon object and organizes the property
 * data into a data object that is easier to work with.
 * 
 * @param {*} data the property data from the database (masterwork or enchantment)
 * @param {*} baseWeapon The base weapon object from the database
 * @returns the property data but organized in a way that is easier to work with
 */
function organizeWeaponPropertyData(data, baseWeapon) {
    let theProp = {};
    if (data == "Masterwork") {
        theProp["Property_Name"] = data;
        theProp["Property_Gold_Cost"] = getMasterworkCost(baseWeapon);
        theProp["Property_Bonus_Value"] = 0;
        theProp["Property_Description"] = "A masterwork weapon is a finely crafted version of a normal" +
            "weapon. Wielding it provides a +1 enhancement bonus on attack rolls." +
            "You can’t add the masterwork quality to a weapon after it is created; it must be crafted as a masterwork weapon (see the Craft skill," +
            "page 70). The masterwork quality adds 300 gp to the cost of a normal" +
            "weapon (or 6 gp to the cost of a single unit of ammunition, such as" +
            "an arrow). For example, a masterwork bastard sword costs 335 gp," +
            "while a set of 10 masterwork arrows costs 70 gp. Adding the" +
            "masterwork quality to a double weapon costs twice the normal" +
            "increase (+600 gp)." +
            "Masterwork ammunition is damaged (effectively destroyed)" +
            "when used. The enhancement bonus of masterwork ammunition" +
            "does not stack with any enhancement bonus of the projectile" +
            "weapon firing it." +
            "All magic weapons are automatically considered to be of" +
            "masterwork quality. The enhancement bonus granted by the" +
            "masterwork quality doesn’t stack with the enhancement bonus" +
            "provided by the weapon’s magic." +
            "Even though some types of armor and shields (such as spiked" +
            "shields) can be used as weapons, you can’t create a masterwork version of such an item that confers an enhancement bonus on attack" +
            "rolls. Instead, masterwork armor and shields have lessened armor" +
            "check penalties (see Masterwork Armor, page 126).";
    } else {
        theData = data[0];
        theProp["Property_Name"] = theData.Magic_Weapon_Name;
        // No enchantments on weapons with just gold costs
        theProp["Property_Gold_Cost"] = null;
        theProp["Property_Bonus_Value"] = theData.Magic_Weapon_Modifier;
        theProp["Property_Description"] = theData.Magic_Weapon_Description;
    }

    return theProp;
}


/**
 * Randomly determines a special material that the item is made of.
 * This function will check to ensure the gold cost is under the max gold value
 * set by the user.
 * It will return null if it costs too much, or if this weapon is too expensive
 * with this material.
 * It will return the special material object if it is within bounds.
 * @param {*} baseWeapon the base weapon object from the database
 * @param {*} maxGold the max gold value set by the user
 * @returns the special material that this item is made of, or null if not applicable
 */
async function getSpecialMaterial(baseWeapon, maxGold, sourceBooks) {
    materials = await dnd_data_controller.getMaterialIDsForWeapon(baseWeapon.Weapon_Name, sourceBooks);

    if (materials == undefined || materials.length < 1) {
        // No materials can apply to this weapon
        return null;
    }

    let rng = Math.floor(Math.random() * materials.length);
    material = (await dnd_data_controller.getMaterialDetailsById(materials[rng].Material_ID))[0];
    let cost = null;

    if (material.Material_Name == "Adamantine") {
        if (is_weapon_ammunition(baseWeapon.Weapon_Name)) {
            cost = 60;
        } else {
            cost = 3000;
        }
    } 
    else if (material.Material_Name == "Darkwood") {
        cost = 10 * baseWeapon.Weapon_Weight;
    }
    else if (material.Material_Name == "Iron, Cold") {
        cost = baseWeapon.Weapon_Cost;
    }
    else if (material.Material_Name == "Mithral") {
        cost = 500 * baseWeapon.Weapon_Weight;
    }
    else if (material.Material_Name == "Silver, Alchemical") {
        if (is_weapon_ammunition(baseWeapon.Weapon_Name)) {
            cost = 2;
        } else if (baseWeapon.Weapon_Type == "Light Melee") {
            cost = 20;
        } else if (baseWeapon.Weapon_Type == "One-Handed Melee" || baseWeapon.Weapon_Type == "Ranged") {
            cost = 90;
        } else if (baseWeapon.Weapon_Type == "Two-Handed Melee") {
            cost = 180;
        } else {
            console.log("ERROR: baseWeapon is not light, one-handed, two-handed, or ranged. Received: " + baseWeapon.Weapon_Type);
        }
    } else {
        // Error! We don't have code for this material!
        console.log("ERROR: No code for material: " + material.Material_Name + " in weaponModel.js - getSpecialMaterials");
    }


    // Check that we can afford to put this material on the weapon!
    if (baseWeapon.Weapon_Cost + cost + 300 > maxGold) {
        // Also too expensive!
        return null;
    }

    // Cost is within bounds!


    // We have the cost, now we put together the object
    let theMaterial = {};
    theMaterial["Material_Name"] = material.Material_Name;
    theMaterial["Material_Gold_Cost"] = cost;
    theMaterial["Material_Description"] = material.Material_Description;
    return theMaterial;
}

/**
 * Checks if the given property is an alignment property.
 * @param {*} theProp the property randomly picked by the generator
 * @returns true if the given enchantment is aligned, false if not
 */
function enchantmentIsAligned(theProp) {
    let name = theProp.Magic_Weapon_Name;

    if (name == "Holy" || name == "Unholy" || name == "Axiomatic" || name == "Anarchic") {
        return true;
    }
    return false;
}


/**
 * Checks if there is an alignment conflict between the two given properties.
 * @param {*} prop1 the first property on the weapon
 * @param {*} prop2 the second property on the weapon
 * @returns true if there is an alignment conflict that makes these properties
 * incompatible, or false if there is no conflict.
 */
function enchantmentAlignmentConflicts(prop1, prop2) {
    let name1 = prop1.Magic_Weapon_Name;
    let name2 = prop2.Magic_Weapon_Name;

    if (name1 == "Holy" && name2 == "Unholy") {
        return true;
    } else if (name1 = "Unholy" && name2 == "Holy") {
        return true;
    } else if (name1 == "Axiomatic" && name2 == "Anarchic") {
        return true;
    } else if (name1 == "Anarchic" && name2 == "Axiomatic") {
        return true;
    }
    return false;
} 

/**
 * Checks if the given property (new one "theProp") is compatible with the enchantments
 * already on the weapon. Also checks that the base weapon can have the new enchantment
 * applied to it (ex. keen must be slashing or piercing NO hammers etc)
 * 
 * This function will be added to over time as we discover impossible weapons
 * being generated by the shop.
 * 
 * @param {*} theProp the new property we are checking compatibility for
 * @param {*} properties the properties already on the weapon
 * @param {*} baseWeapon the base weapon object
 * @returns true if the new enchantment can be applied to this weapon, false otherwise
 */
function enchantmentIsValid(theProp, properties, baseWeapon) {
    if (theProp[0].Magic_Weapon_Name == "Keen") {
        // Keen can only apply to slashing or piercing weapons
        if (!baseWeapon.Weapon_Damage_Type.includes("S") && !baseWeapon.Weapon_Damage_Type.includes("P")) {
            return false;
        }
    }

    if (theProp[0].Magic_Weapon_Name == "Disruption") {
        // Disruption can only apply to bludgeoning weapons
        if (!baseWeapon.Weapon_Damage_Type.includes("B")) {
            return false;
        }
    }

    if (enchantmentIsAligned(theProp[0])) {
        for (let i = 0; i < properties.length; i++) {
            if (enchantmentIsAligned(properties[i][0])) {
                if (enchantmentAlignmentConflicts(theProp[0], properties[i][0])) {
                    return false;
                }
            }
        }
        for (let i = 0; i < baseWeapon.Weapon_Properties.length; i++) {
            if (enchantmentIsAligned(baseWeapon.Weapon_Properties[i])) {
                if (enchantmentAlignmentConflicts(theProp[0], baseWeapon.Weapon_Properties[i])) {
                    return false;
                }
            }
        }
    }

    
    for (let i = 0; i < properties.length; i++) {
        if (theProp[0].Magic_Weapon_Name == properties[i][0].Magic_Weapon_Name) {
            return false;
        }
        if (theProp[0].Magic_Weapon_Name.includes("Flaming") && properties[i][0].Magic_Weapon_Name.includes("Flaming")) {
            return false;
        }
        if ((theProp[0].Magic_Weapon_Name.includes("Frost") || theProp[0].Magic_Weapon_Name.includes("Icy Burst")) && (properties[i][0].Magic_Weapon_Name.includes("Frost") || properties[i][0].Magic_Weapon_Name.includes("Icy Burst"))) {
            return false;
        }
        if (theProp[0].Magic_Weapon_Name.includes("Shock") && properties[i][0].Magic_Weapon_Name.includes("Shock")) {
            return false;
        }
    }

    return true;
}


/**
 * Gets the bane target of a weapon that has the bane enchantment.
 * 
 * @returns the type of creature that the bane enchantment applies to.
 */
function getBaneTargetForMagicWeapon() {
    let rng = Math.floor(Math.random() * 100);
    let target = null;

    if (rng < 5) {
        target = "Aberrations";
    } else if (rng < 9) {
        target = "Animals";
    } else if (rng < 16) {
        target = "Constructs";
    } else if (rng < 22) {
        target = "Dragons";
    } else if (rng < 27) {
        target = "Elementals";
    } else if (rng < 32) {
        target = "Fey";
    } else if (rng < 39) {
        target = "Giants";
    } else if (rng < 40) {
        target = "Humanoids, aquatic";
    } else if (rng < 42) {
        target = "Humanoids, dwarf";
    } else if (rng < 44) {
        target = "Humanoids, elf";
    } else if (rng < 45) {
        target = "Humanoids, gnoll";
    } else if (rng < 46) {
        target = "Humanoids, gnome";
    } else if (rng < 49) {
        target = "Humanoids, goblinoid";
    } else if (rng < 50) {
        target = "Humanoids, halfling";
    } else if (rng < 54) {
        target = "Humanoids, human";
    } else if (rng < 57) {
        target = "Humanoids, reptilian";
    } else if (rng < 60) {
        target = "Humanoids, orc";
    } else if (rng < 65) {
        target = "Magical beasts";
    } else if (rng < 70) {
        target = "Monstrous humanoids";
    } else if (rng < 72) {
        target = "Oozes";
    } else if (rng < 73) {
        target = "Outsiders, air";
    } else if (rng < 76) {
        target = "Outsiders, chaotic";
    } else if (rng < 77) {
        target = "Outsiders, earth";
    } else if (rng < 80) {
        target = "Outsiders, evil";
    } else if (rng < 81) {
        target = "Outsiders, fire";
    } else if (rng < 84) {
        target = "Outsiders, good";
    } else if (rng < 87) {
        target = "Outsiders, lawful";
    } else if (rng < 88) {
        target = "Outsiders, water";
    } else if (rng < 90) {
        target = "Plants";
    } else if (rng < 98) {
        target = "Undead";
    } else {
        target = "Vermin";
    }
    return target;
}


async function getEnchantmentsForWeapon(baseWeapon, totalModifiers, sourceBooks) {
    console.log("Inside getEnchantmentsForWeapon");
    if (totalModifiers > 10) {
        totalModifiers = 10;
    }
    let rng = Math.floor(Math.random() * 100);
    let theProperty;
    let theProperties = [];

    if (rng < 50) {
        // As many enhancements as possible
        if (totalModifiers > 5) {
            // Enhancement +5, then some abilities until no modifiers are left
            theProperty = await dnd_data_controller.getEnhancementBonusForMagicWeapon(5);
            totalModifiers -= 5;
        } else {
            // Enhancement equal to the totalModifiers value
            theProperty = await dnd_data_controller.getEnhancementBonusForMagicWeapon(totalModifiers);
            totalModifiers = 0;
        }
    } else if (rng < 90) {
        // Mixed enhancements and abilities
        let enhanceValue = Math.floor(Math.random() * totalModifiers) + 1;
        if (enhanceValue > 5) {
            enhanceValue = 5;
        }
        theProperty = await dnd_data_controller.getEnhancementBonusForMagicWeapon(enhanceValue);
        totalModifiers -= enhanceValue;
    } else {
        // Minimum enhancements, maximum abilities
        theProperty = await dnd_data_controller.getEnhancementBonusForMagicWeapon(1);
        totalModifiers -= 1;
    }

    theProperties.push(theProperty);

    let throwing_weapon = baseWeapon.Weapon_Range_Increment != null;

    console.log("Before while loop");

    while (totalModifiers > 0) {
        // Loop and continue finding special abilities for the weapon now that enhancements are done
        let targetModifier = Math.floor(Math.random() * totalModifiers) + 1;
        console.log("targetModifier: " + targetModifier);
        let propertyList;
        if (baseWeapon.Weapon_Type == "Ranged") {
            propertyList = await dnd_data_controller.getEnchantmentIDsForRangedWeapon(targetModifier, is_weapon_ammunition(baseWeapon.Weapon_Name), sourceBooks);
        } else {
            propertyList = await dnd_data_controller.getEnchantmentIDsForMeleeWeapon(targetModifier, throwing_weapon, sourceBooks);
        }
        // This gets us an array of objects from the DB, but we need only one
        console.log("propertyList: " + propertyList);


        if (propertyList.length > 0) {
            rng = Math.floor(Math.random() * propertyList.length);
            theProperty = await dnd_data_controller.getWeaponEnchantmentDetailsByID(propertyList[rng].Magic_Weapon_ID);

            if (theProperty[0].Magic_Weapon_Name == "Bane") {
                // Decide what the bane targets!
                baneTarget = getBaneTargetForMagicWeapon();
                theProperty[0].Magic_Weapon_Name = theProperty[0].Magic_Weapon_Name + " (" + baneTarget + ")";
            }

            console.log("Checking if enchantment is valid... weapon: " + baseWeapon + "\nproperty: " + theProperty);
            if (enchantmentIsValid(theProperty, theProperties, baseWeapon)) {
                console.log("valid enchantment!");
                theProperties.push(theProperty);
                totalModifiers -= theProperty[0].Magic_Weapon_Modifier;
                if (theProperty[0].Magic_Weapon_Name == "Throwing") {
                    throwing_Weapon = true;
                }
            }
        }
    }

    console.log("After while loop");

    return theProperties;
}


let weaponModel = {
    generateWeaponItem: async function(minGold, maxGold, item_number, sourceBooks) {
        let rng = Math.floor(Math.random() * 100);

        let baseWeaponIDs;

        console.log("inside generateWeaponItem");

        if (rng < 80) {
            // Common Weapon
            baseWeaponIDs = await dnd_data_controller.getWeaponIDsUnderGoldCost(maxGold, "Common", sourceBooks);
        } else {
            // Uncommon Weapon
            baseWeaponIDs = await dnd_data_controller.getWeaponIDsUnderGoldCost(maxGold, "Uncommon", sourceBooks);
        }

        console.log("baseWeaponIDs: " + baseWeaponIDs);

        if (baseWeaponIDs.length > 0) {
            // We can reuse rng since all checks have been done
            rng = Math.floor(Math.random() * baseWeaponIDs.length);
            console.log("dnd_data_controller.getWeaponDetailsById starting...");
            weaponData = await dnd_data_controller.getWeaponDetailsById(baseWeaponIDs[rng].Weapon_ID);
            console.log("dnd_data_controller.getWeaponDetailsById finished");
            console.log(weaponData);
            console.log("organizeWeaponData starting...");
            let theWeapon = this.organizeWeaponData(weaponData, item_number);
            console.log("organizeWeaponData finished");
            console.log(theWeapon);
            console.log("getWeaponBonuses starting...");
            let properties = await this.getWeaponBonuses(theWeapon, minGold, maxGold, sourceBooks);
            console.log("getWeaponBonuses finished");
            console.log(properties);
            if (properties != null) {
                properties.forEach(prop => {
                    theWeapon["Weapon_Properties"].push(prop);
                    console.log("Checking for infinite loop...");
                });
            }
            let totalCost = this.calculateCost(theWeapon);
            theWeapon["Weapon_Cost_With_Properties"] = totalCost;

            console.log("Returning theWeapon...");
            return theWeapon;
        }
        // No valid weapons!
        console.log("4. No valid weapons found in weaponModel.js - generateWeaponItem");
        return null;
    },

    /**
     * This function will organize the data that the database query returned about a weapon
     * into something more useful for the program.
     * @param {*} theData the data returned by the database query from the weapon table. There should only be one row
     * @returns A JS object containing the attributes of the weapon from the database
     */
    organizeWeaponData: (data, item_number) => {
        theData = data[0];
        let theWeapon = {};
        theWeapon["Item_ID"] = item_number;
        theWeapon["Weapon_Name"] = theData.Weapon_Name;
        theWeapon["Weapon_Category"] = theData.Weapon_Category;
        theWeapon["Weapon_Type"] = theData.Weapon_Type;
        theWeapon["Weapon_Cost"] = parseFloat(theData.Weapon_Cost);
        theWeapon["Weapon_Small_Damage"] = theData.Weapon_Small_Damage;
        theWeapon["Weapon_Medium_Damage"] = theData.Weapon_Medium_Damage;
        theWeapon["Weapon_Critical"] = theData.Weapon_Critical;
        theWeapon["Weapon_Range_Increment"] = theData.Weapon_Range_Increment;
        let dmgType = theData.Weapon_Damage_Type;
        if (dmgType != null) {
            dmgType = dmgType.replace("P", "Piercing");
            dmgType = dmgType.replace("S", "Slashing");
            dmgType = dmgType.replace("B", "Bludgeoning");
        }
        theWeapon["Weapon_Damage_Type"] = dmgType;
        theWeapon["Weapon_Weight"] = theData.Weapon_Weight;
        theWeapon["Weapon_Description"] = theData.Weapon_Description;
        theWeapon["Weapon_Quantity"] = 1;
        theWeapon["Weapon_Material"] = null;
        theWeapon["Weapon_Properties"] = [];
        theWeapon["Double_Weapon_Properties"] = [];
        theWeapon["Weapon_Cost_With_Properties"] = theWeapon.Weapon_Cost;

        return theWeapon;
    },

    getWeaponBonuses: async function (baseWeapon, minGold, maxGold, sourceBooks) {
        let properties = [];

        let mwkChance = 0;

        console.log("Inside getWeaponBonuses");
        console.log("Deciding on mwkChance...");

        if (minGold < 300 && maxGold > 300) {
            // Chance for some weapons to be masterwork
            mwkChance = ((maxGold + minGold) / 2) / 10
            if (mwkChance > 95) {
                mwkChance = 95;
            }
        }
        else if (minGold > 300) {
            mwkChance = 100;
        }
        //mwkChance has been decided!
        console.log("mwkChance has been decided");
        let rng = Math.floor(Math.random() * 100);

        if (rng < mwkChance) {
            // Item is masterwork!
            // Check if it is made of a special material before adding the masterwork property (some materials count as masterwork)
            // We can reuse rng here since all checks have been finished!
            rng = Math.floor(Math.random() * 100);
            console.log("Deciding if there is a special material...");

            if (rng < 10) {
                // There is a special material!
                console.log("There is a special material");
                material = await getSpecialMaterial(baseWeapon, maxGold, sourceBooks);
                if (material != null) {
                    baseWeapon["Weapon_Material"] = material;

                    if (material.Material_Name == "Iron, Cold" || material.Material_Name == "Silver, Alchemical"
                    || material.Material_Name == "Darkwood") {
                        // Silver and cold iron don't automatically count as masterwork!
                        properties.push(organizeWeaponPropertyData("Masterwork", baseWeapon));
                    }
                } else {
                    properties.push(organizeWeaponPropertyData("Masterwork", baseWeapon));
                }
            } else {
                // No special material!
                console.log("There is no special material");
                properties.push(organizeWeaponPropertyData("Masterwork", baseWeapon));
            }

            console.log("Finished with special materials");
            console.log("Checking for specific special materials that affect cost...");

            // Check if item can have magical properties!
            // *******************************************************
            // CHECK THIS CALC IF WEAPON COST IS BEHAVING STRANGELY!!!!
            // *******************************************************
            let targetGoldValue = Math.floor(Math.random() * (maxGold - minGold + 1)) + minGold;
            let extraCostForMaterialEnchantment = 0;

            let remainingGoldForItem = targetGoldValue - baseWeapon.Weapon_Cost;
            if (baseWeapon.Weapon_Material != null) {
                remainingGoldForItem -= baseWeapon.Weapon_Material.Material_Gold_Cost;
                if (baseWeapon.Weapon_Material.Material_Name == "Iron, Cold") {
                    extraCostForMaterialEnchantment = 2000;
                }
            }
            if (properties != null ** properties.length > 0) {
                properties.forEach(prop => {
                    remainingGoldForItem -= prop.Property_Gold_Cost;
                })
            }

            console.log("Finished with checking for specific special materials...");

            console.log("Checking how many modifiers this weapon can have...");
            // Determine how many modifiers this weapon can have
            // The price for ammunition is based on buying 50 at a time, so the cost would be #/50 * price
            let ammo = is_weapon_ammunition(baseWeapon.Weapon_Name);
            let totalModifiers = 0;
            if (ammo > 0) {
                // We have ammunition!
                totalModifiers = Math.floor(Math.sqrt(((remainingGoldForItem - extraCostForMaterialEnchantment) * 50 / ammo) / 2000));
            } else {
                // Not ammunition
                totalModifiers = Math.floor(Math.sqrt((remainingGoldForItem - extraCostForMaterialEnchantment) / 2000));
            }
            let doubleModifiers = Math.floor(totalModifiers / 2);

            if (isDoubleWeapon(baseWeapon)) {
                totalModifiers -= doubleModifiers;
            }

            console.log("Finished checking how many modifiers this weapon can have");


            if (!isNaN(totalModifiers) && totalModifiers > 0) {
                // We can have enchantments, and we know how many!
                // First we determine how many of the enchantments are simply enhancement bonuses (most should be)
                // We can reuse rng again since we are done with its current use
                console.log("Starting getEnchantmentsForWeapon function");
                let mainProperties = await getEnchantmentsForWeapon(baseWeapon, totalModifiers, sourceBooks);
                mainProperties.forEach(prop => {
                    baseWeapon.Weapon_Properties.push(organizeWeaponPropertyData(prop));
                })
                if (isDoubleWeapon(baseWeapon) && doubleModifiers > 0) {
                    let secondaryProperties = await getEnchantmentsForWeapon(baseWeapon, doubleModifiers, sourceBooks);
                    secondaryProperties.forEach(prop => {
                        baseWeapon.Double_Weapon_Properties.push(organizeWeaponPropertyData(prop));
                    })
                }
                console.log("Finished getEnchantmentsForWeapon function");
            }
        }
        else {
            // Item is not masterwork!
            return null;
        }

        // Do we need to return propertes?!
        // 20 lines above we are assigning properties to the weapon...
        return properties;
    },

    isDuplicateWeapon(a, b) {
        let match = false;
        // First check if they share a name
        if (a.Weapon_Name == b.Weapon_Name) {
            // They have the same name!
            // Now we check if they share a material!
            if (a.Weapon_Material == null && b.Weapon_Material == null) {
                // neither has a material
                match = true;
            } else if (a.Weapon_Material != null && b.Weapon_Material != null &&
                    a.Weapon_Material.Material_Name == b.Weapon_Material.Material_Name) {
                // they both have the same material!
                match = true;
            }


            if (match) {
                // Now we can check if they share properties
                if (a.Weapon_Properties.length == b.Weapon_Properties.length) {
                    // They have the same number of properties
                    if (a.Weapon_Properties.length > 0) {
                        for (let i = 0; i < a.Weapon_Properties.length; i++) {
                            // We already know they have the same length
                            // We just need to look for differences
                            if (a.Weapon_Properties[i].Property_Name != b.Weapon_Properties[i].Property_Name) {
                                match = false;
                                break;
                            }
                        }
                    }
                } else {
                    // They have a different number of properties!
                    match = false;
                }
            }
        }
        return match;
    },

    calculateCost(weapon) {
        let cost = weapon.Weapon_Cost;
        let modifiers = 0;
        let doubleModifiers = 0;
        let additionalCostForEnchantingMaterials = 0;
        if (weapon.Weapon_Material != null) {
            cost += weapon.Weapon_Material.Material_Gold_Cost;
            if (weapon.Weapon_Material.Material_Name == "Iron, Cold") {
                additionalCostForEnchantingMaterials = 2000;
            }
        }
        weapon.Weapon_Properties.forEach(prop => {
            if (prop.Property_Gold_Cost != null) {
                cost += prop.Property_Gold_Cost;
            } else {
                // If the gold cost is null, its because the modifier is used instead!
                modifiers += prop.Property_Bonus_Value;
            }
        });
        weapon.Double_Weapon_Properties.forEach(prop => {
            if (prop.Property_Gold_Cost != null) {
                cost += prop.Property_Gold_Cost;
            } else {
                doubleModifiers += prop.Property_Bonus_Value;
            }
        })
        if (modifiers > 0) {
            cost += additionalCostForEnchantingMaterials;
            let ammo = is_weapon_ammunition(weapon.Weapon_Name);
            if (ammo) {
                cost += (modifiers * modifiers * 2000) * ammo / 50;
            } else {
                cost += (modifiers * modifiers * 2000);
            }
        }
        if (doubleModifiers > 0) {
            cost += additionalCostForEnchantingMaterials;
            cost += (doubleModifiers * doubleModifiers * 2000);
        }
        return cost;
    },

    getBaseWeapon(sourceBooks) {
        let baseWeapon = dnd_data_controller.get_random_base_weapon(sourceBooks);

        return baseWeapon;
    }
}

module.exports = weaponModel;
