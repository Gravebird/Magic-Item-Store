const e = require("express");
const databaseController = require("../controller/database_controller");

/**
 * 
 * @param {String} weaponName the name of the weapon
 * @returns the number of ammunition of this weapon. (0 if not ammo, > 0 if ammo)
 */
function weaponIsAmmo(weaponName) {
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

function isDoubleWeapon(baseWeapon) {
    if (baseWeapon.Weapon_Medium_Damage == null) {
        return false;
    }
    if (baseWeapon.Weapon_Medium_Damage.includes("/")) {
        return true;
    }
    return false;
}

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
        theProp["Property_Gold_Cost"] = null;
        theProp["Property_Bonus_Value"] = theData.Magic_Weapon_Modifier;
        theProp["Property_Description"] = theData.Magic_Weapon_Description;
    }

    return theProp;
}

async function getSpecialMaterial(baseWeapon, goldLeft, maxGoldItemInShop, averageGoldValue) {
    materials = await databaseController.getMaterialIDsForWeapon(baseWeapon.Weapon_Name);

    if (materials == undefined || materials.length < 1) {
        // no materials can apply to this weapon
        return null;
    }

    let rng = Math.floor(Math.random() * materials.length);
    material = (await databaseController.getMaterialDetailsById(materials[rng].Material_ID))[0];
    let cost = null;

    if (material.Material_Name == "Adamantine") {
        if (weaponIsAmmo(baseWeapon.Weapon_Name)) {
            cost = 60;
        } else {
            cost = 3000;
        }
    } else if (material.Material_Name == "Darkwood") {
        cost = 10 * baseWeapon.Weapon_Weight;

    } else if (material.Material_Name == "Iron, Cold") {
        cost = baseWeapon.Weapon_Cost;

    } else if (material.Material_Name == "Mithral") {
        cost = 500 * baseWeapon.Weapon_Weight;

    } else if (material.Material_Name == "Silver, Alchemical") {
        if (weaponIsAmmo(baseWeapon.Weapon_Name)) {
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
    if (cost > goldLeft) {
        // Too expensive!
        return null;
    } else if (baseWeapon.Weapon_Cost + cost + 300 > maxGoldItemInShop) {
        // Also too expensive!
        return null;
    } else {
        let highAverage = averageGoldValue * 3 / 2;
        if (baseWeapon.Weapon_Cost + cost + 300 > highAverage) {
            // Too expensive again!
            return null;
        }
    }
    // Cost is within bounds!


    // We have the cost, now we put together the object
    let theMaterial = {};
    theMaterial["Material_Name"] = material.Material_Name;
    theMaterial["Material_Gold_Cost"] = cost;
    theMaterial["Material_Description"] = material.Material_Description;
    return theMaterial;
}

function enchantmentIsAligned(theProp) {
    let name = theProp.Magic_Weapon_Name;

    if (name == "Holy" || name == "Unholy" || name == "Axiomatic" || name == "Anarchic") {
        return true;
    }
    return false;
}

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


async function getEnchantmentsForWeapon(baseWeapon, totalModifiers) {
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
            theProperty = await databaseController.getEnhancementBonusForMagicWeapon(5);
            totalModifiers -= 5;
        } else {
            // Enhancement equal to the totalModifiers value
            theProperty = await databaseController.getEnhancementBonusForMagicWeapon(totalModifiers);
            totalModifiers = 0;
        }
    } else if (rng < 90) {
        // Mixed enhancements and abilities
        let enhanceValue = Math.floor(Math.random() * totalModifiers) + 1;
        if (enhanceValue > 5) {
            enhanceValue = 5;
        }
        theProperty = await databaseController.getEnhancementBonusForMagicWeapon(enhanceValue);
        totalModifiers -= enhanceValue;
    } else {
        // Minimum enhancements, maximum abilities
        theProperty = await databaseController.getEnhancementBonusForMagicWeapon(1);
        totalModifiers -= 1;
    }

    theProperties.push(theProperty);

    let throwing_weapon = baseWeapon.Weapon_Range_Increment != null;

    while (totalModifiers > 0) {
        // Loop and continue finding special abilities for the weapon now that enhancements are done
        let targetModifier = Math.floor(Math.random() * totalModifiers) + 1;
        let propertyList;
        if (baseWeapon.Weapon_Type == "Ranged") {
            propertyList = await databaseController.getEnchantmentIDsForRangedWeapon(targetModifier, weaponIsAmmo(baseWeapon.Weapon_Name));
        } else {
            propertyList = await databaseController.getEnchantmentIDsForMeleeWeapon(targetModifier, throwing_weapon);
        }
        // This gets us an array of objects from the DB, but we need only one


        if (propertyList.length > 0) {
            rng = Math.floor(Math.random() * propertyList.length);
            theProperty = await databaseController.getWeaponEnchantmentDetailsByID(propertyList[rng].Magic_Weapon_ID);

            if (theProperty[0].Magic_Weapon_Name == "Bane") {
                // Decide what the bane targets!
                baneTarget = getBaneTargetForMagicWeapon();
                theProperty[0].Magic_Weapon_Name = theProperty[0].Magic_Weapon_Name + " (" + baneTarget + ")";
            }


            if (enchantmentIsValid(theProperty, theProperties, baseWeapon)) {
                theProperties.push(theProperty);
                totalModifiers -= theProperty[0].Magic_Weapon_Modifier;
                if (theProperty[0].Magic_Weapon_Name == "Throwing") {
                    throwing_Weapon = true;
                }
            }
        }
    }

    return theProperties;
}

let weaponModel = {

    /**
 * This function will organize the data that the database query returned about a weapon
 * into something more useful for the program.
 * @param {*} theData the data returned by the database query from the weapon table. There should only be one row
 * @returns A JS object containing the attributes of the weapon from the database
 */
    organizeWeaponData: (data, id) => {
        theData = data[0];
        let theWeapon = {};
        theWeapon["Item_ID"] = id;
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

    /**
 * This function will decide what properties to assign to the base weapon based off of the
 * settings the user chose.
 * @param {*} baseWeapon the base weapon (longsword, spear, etc)
 * @param {*} goldUsed The amount of gold that has already been used up by the generator
 * @param {*} goldInShop the amount of gold the shop has to work with
 * @param {*} maxGoldItemInShop the highest value item the shop can have
 * @param {*} averageGoldValue the average value among items the shop can have
 */
    getWeaponBonuses: async function (baseWeapon, goldUsed, goldInShop, maxGoldItemInShop, averageGoldValue) {
        let properties = [];
        if (goldUsed > goldInShop) {
            // No gold left!
            return null;
        } else {
            // Shop has gold remaining
            goldLeft = goldInShop - goldUsed;

            // Is there at least 300 gp left? If so, can be masterwork!
            if (goldLeft > 300 && maxGoldItemInShop > 300) {
                // We can have a masterwork property!
                let mwkChance = (averageGoldValue / 300 * 100) - 25;

                if (averageGoldValue == 0) mwkChance = 50;

                if (mwkChance < 0) {
                    mwkChance = 1;
                } else if (mwkChance > 100) {
                    mwkChance = 100;
                }
                // mwkChance has been decided!
                let rng = Math.floor(Math.random() * 100);

                if (rng < mwkChance) {
                    // Item is masterwork!
                    // Check if it is made of a special material before adding the masterwork property (some materials count as masterwork)
                    // We can reuse rng here since all checks have been finished!
                    rng = Math.floor(Math.random() * 100);

                    if (rng < 10) {
                        // There is a special material!
                        material = await getSpecialMaterial(baseWeapon, goldLeft, maxGoldItemInShop, averageGoldValue);
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
                        properties.push(organizeWeaponPropertyData("Masterwork", baseWeapon));
                    }

                    // Check if item can have magical properties!
                    let lowAverage = averageGoldValue / 2;
                    let highAverage = averageGoldValue * 3 / 2;
                    if (highAverage > maxGoldItemInShop) {
                        highAverage = maxGoldItemInShop;
                    }
                    let targetGoldValue = Math.floor(Math.random() * (highAverage - lowAverage + 1)) + lowAverage;
                    let extraCostForMaterialEnchantment = 0;

                    let remainingGoldForItem = targetGoldValue - baseWeapon.Weapon_Cost;
                    if (baseWeapon.Weapon_Material != null) {
                        remainingGoldForItem -= baseWeapon.Weapon_Material.Material_Gold_Cost;
                        if (baseWeapon.Weapon_Material.Material_Name == "Iron, Cold") {
                            extraCostForMaterialEnchantment = 2000;
                        }
                    }
                    if (properties != null && properties.length > 0) {
                        properties.forEach(prop => {
                            remainingGoldForItem -= prop.Property_Gold_Cost;
                        })
                    }


                    //Determine how many modifiers this weapon can have
                    // Equation is (Cost = mod^2 * 2000), reversed it is (mod = sqrt(cost / 2000))
                    // The price for ammunition is based on buying 50 at a time, so the cost would be #/50 * price
                    let ammo = weaponIsAmmo(baseWeapon.Weapon_Name);
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

                    

                    if (!isNaN(totalModifiers) && totalModifiers > 0) {
                        // We can have enchantments, and we know how many!
                        // First we determine how many of the enchantments are simply enhancement bonuses (most should be)
                        // We can reuse rng again since we are done with its current use
                        let mainProperties = await getEnchantmentsForWeapon(baseWeapon, totalModifiers);
                        mainProperties.forEach(prop => {
                            baseWeapon.Weapon_Properties.push(organizeWeaponPropertyData(prop));
                        })
                        if (isDoubleWeapon(baseWeapon) && doubleModifiers > 0) {
                            let secondaryProperties = await getEnchantmentsForWeapon(baseWeapon, doubleModifiers);
                            secondaryProperties.forEach(prop => {
                                baseWeapon.Double_Weapon_Properties.push(organizeWeaponPropertyData(prop));
                            })
                        }
                    }

                }
                else {
                    // Item is not masterwork!
                    return null;
                }
            } else {
                // Not enough gold remaining!
                return null;
            }
        }
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
            let ammo = weaponIsAmmo(weapon.Weapon_Name);
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
    }
}

module.exports = weaponModel;