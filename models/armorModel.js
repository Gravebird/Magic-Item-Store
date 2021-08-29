const e = require("express");
const databaseController = require("../controller/database_controller");

function organizeArmorPropertyData(data) {
    let theProp = {};
    if (data == "Masterwork") {
        theProp["Property_Name"] = data;
        theProp["Property_Gold_Cost"] = parseFloat(150);
        theProp["Property_Bonus_Value"] = 0;
        theProp["Property_Description"] = "Just as with weapons, you can purchase or craft masterwork versions" +
            "of armor or shields. Such a well-made item functions like the normal" +
            "version, except that its armor check penalty is lessened by 1. For" +
            "example, a masterwork chain shirt has an armor check penalty of –1" +
            "rather than –2." +
            "A masterwork suit of armor or shield costs an extra 150 gp over" +
            "and above the normal cost for that type of armor or shield. A masterwork chain shirt would thus cost 250 gp." +
            "The masterwork quality of a suit of armor or shield never provides" +
            "a bonus on attack or damage rolls, even if the armor or shield is used" +
            "as a weapon (such as spiked armor or a spiked shield)." +
            "All magic armors and shields are automatically considered to be" +
            "of masterwork quality." +
            "You can’t add the masterwork quality to armor or a shield after it" +
            "is created; it must be crafted as a masterwork item.";
    } else {
        theData = data[0];
        theProp["Property_Name"] = theData.Magic_Armor_Name;
        theProp["Property_Gold_Cost"] = theData.Magic_Armor_Cost;
        theProp["Property_Bonus_Value"] = theData.Magic_Armor_Modifier;
        theProp["Property_Description"] = theData.Magic_Armor_Description;
    }

    return theProp;
}

async function getSpecialMaterial(baseArmor, goldLeft, maxGoldItemInShop, averageGoldValue) {
    materials = await databaseController.getMaterialIDsForArmor(baseArmor.Armor_Name);

    if (materials == undefined || materials.length < 1) {
        // No materials can apply to this armor
        return null;
    }

    let rng = Math.floor(Math.random() * materials.length);
    material = (await databaseController.getMaterialDetailsById(materials[rng].Material_ID))[0];
    let cost = null;

    let armorType = baseArmor.Armor_Category;
    if (material.Material_Name == "Adamantine") {
        if (armorType == "Light") {
            cost = 5000;
        } else if (armorType == "Medium") {
            cost = 10000;
        } else if (armorType == "Heavy") {
            cost = 15000;
        } else {
            cost = 3000;
        }
    } else if (material.Material_Name == "Darkwood") {
        cost = 10 * baseArmor.Armor_Weight;

    } else if (material.Material_Name == "Dragonhide") {
        cost = 300 + baseArmor.Armor_Cost;
    } else if (material.Material_Name == "Mithral") {
        if (armorType == "Light") {
            cost = 1000;
        } else if (armorType == "Medium") {
            cost = 4000;
        } else if (armorType == "Heavy") {
            cost = 9000;
        } else {
            cost = 1000;
        }
    } else {
        // Error! We don't have code for this material!
        console.log("ERROR: No code for material: " + material.Material_Name + " in armorModel.js - getSpecialMaterial");
    }

    // Check that we can afford to put this material on the armor!
    if (cost > goldLeft) {
        // Too expensive!
        console.log("Too expensive! 1:", cost, goldLeft);
        return null;
    } else if (baseArmor.Armor_Cost + cost + 150 > maxGoldItemInShop) {
        // Also too expensive!
        console.log("Too expensive! 2:", cost, maxGoldItemInShop)
        return null;
    } else {
        let highAverage = averageGoldValue * 3 / 2;
        if (baseArmor.Armor_Cost + cost + 150 > highAverage) {
            // Too expensive again!
            console.log("Too expensive! 3:", cost, highAverage);
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

function enchantmentIsValid(theProp, properties) {
    for (let i = 0; i < properties.length; i++) {
        if (theProp[0].Magic_Armor_Name == properties[i][0].Magic_Armor_Name) {
            return false;
        }
    }
    return true;
}

async function getEnchantmentsForArmor(baseArmor, totalModifiers, remainingGoldForItem) {
    console.log("\nNEXT ARMOR:\n");
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
            theProperty = await databaseController.getEnhancementBonusForMagicArmor(5);
            totalModifiers -= 5;
        } else {
            // Enhancement equal to the totalModifiers value
            theProperty = await databaseController.getEnhancementBonusForMagicArmor(totalModifiers);
            totalModifiers = 0;
        }
    } else if (rng < 90) {
        // Mixed enhancements and abilities
        let enhanceValue = Math.floor(Math.random() * totalModifiers) + 1;
        if (enhanceValue > 5) {
            enhanceValue = 5;
        }
        theProperty = await databaseController.getEnhancementBonusForMagicArmor(enhanceValue);
        totalModifiers -= enhanceValue;
    } else {
        // Minimum enhancements, maximum abilities
        theProperty = await databaseController.getEnhancementBonusForMagicArmor(1);
        totalModifiers -= 1;
    }

    theProperties.push(theProperty);

    while (totalModifiers > 0) {
        console.log("1", totalModifiers);
        let goldLeft = remainingGoldForItem;
        let numMods = 0;
        for (let i = 0; i < theProperties.length; i++) {
            if (theProperties[i][0].Property_Gold_Cost != null) {
                // Property costs gold
                goldLeft -= parseInt(theProperties[i][0].Magic_Armor_Cost);
            } else {
                // Property has a modifier
                numMods += parseInt(theProperties[i][0].Magic_Armor_Modifier);
            }
        }
        // Figure out how many modifiers this weapon still has money for
        totalModifiers = Math.floor(Math.sqrt(goldLeft / 1000));
        totalModifiers -= numMods;

        // We have used goldLeft, now we need to change its value based on the current modifiers
        goldLeft -= (numMods * numMods * 1000);

        console.log("Modifiers remaining: " + totalModifiers);
        console.log("Gold left: " + goldLeft);

        if (totalModifiers > 0 || goldLeft > 20000) {
            // We can still put enchantments on this armor!
            let propertyList;
            if (baseArmor.Armor_Category == "Shield") {
                propertyList = await databaseController.getEnchantmentIDsForArmor(totalModifiers, goldLeft, true);
            } else {
                propertyList = await databaseController.getEnchantmentIDsForArmor(totalModifiers, goldLeft, false);
            }

            console.log("2", propertyList.length);

            if (propertyList.length > 0) {
                rng = Math.floor(Math.random() * propertyList.length);
                theProperty = await databaseController.getArmorEnchantmentDetailsByID(propertyList[rng].Magic_Armor_ID);
                console.log("3", theProperty);
            } else {
                console.log("ERROR in armorModel.js - getEnchantmentsForArmor");
                console.log("propertyList from DB is length < 0");
                theProperty = null;
                break;
            }

            if (theProperty != null) {
                if (enchantmentIsValid(theProperty, theProperties)) {
                    theProperties.push(theProperty);
                    if (theProperty[0].Magic_Armor_Cost != null) {
                        // Cost is null, this means that it has a modifier
                        totalModifiers -= theProperty[0].Magic_Armor_Modifier;
                    } else {
                        // Has a cost
                        goldLeft -= theProperty[0].Magic_Armor_Cost;
                    }
                }
            }
        }
    }

    return theProperties;
}

let armorModel = {
    organizeArmorData: (data, id) => {
        theData = data[0]
        let theArmor = {};
        theArmor["Item_ID"] = id;
        theArmor["Armor_Name"] = theData.Armor_Name;
        theArmor["Armor_Category"] = theData.Armor_Category;
        theArmor["Armor_Cost"] = parseFloat(theData.Armor_Cost);
        theArmor["Armor_AC_Bonus"] = theData.Armor_AC_Bonus;
        theArmor["Armor_Max_Dex"] = theData.Armor_Max_Dex;
        theArmor["Armor_Check_Penalty"] = theData.Armor_Check_Penalty;
        theArmor["Armor_Spell_Failure"] = theData.Armor_Spell_Failure;
        theArmor["Armor_30_Speed"] = theData.Armor_30_Speed;
        theArmor["Armor_20_Speed"] = theData.Armor_20_Speed;
        theArmor["Armor_Weight"] = theData.Armor_Weight;
        theArmor["Armor_Description"] = theData.Armor_Description;
        theArmor["Armor_Quantity"] = 1;
        theArmor["Armor_Material"] = null;
        theArmor["Armor_Properties"] = [];
        theArmor["Armor_Cost_With_Properties"] = theArmor.Armor_Cost;

        return theArmor;
    },

    /**
 * This function will decide what properties to assign to the base armor based off of the
 * settings the user chose.
 * @param {*} baseArmor the base armor (chainmail, hide, etc.)
 * @param {*} goldUsed The amount of gold that has already been used up by the generator
 * @param {*} goldInShop the amount of gold the shop has to work with
 * @param {*} maxGoldItemInShop the highest value item the shop can have
 * @param {*} averageGoldValue the average value among items the shop can have
 */
    getArmorBonuses: async function (baseArmor, goldUsed, goldInShop, maxGoldItemInShop, averageGoldValue) {
        let properties = [];
        if (goldUsed > goldInShop) {
            // No gold left!
            return null;
        } else {
            // Shop has gold remaining
            goldLeft = goldInShop - (goldUsed + baseArmor.Armor_Cost);

            // Is there at least 300 gp left? If so, can be masterwork!
            if (goldLeft > 150 && maxGoldItemInShop > (baseArmor.Armor_Cost + 150)) {
                // We can have a masterwork property!
                let mwkChance = (averageGoldValue / (baseArmor.Armor_Cost + 150) * 100) - 25;

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
                    // Check if it is made of a special material before aadding the masterwork property
                    // We can reuse rng here since all checks have been finished
                    rng = Math.floor(Math.random() * 100);

                    if (rng < 10) {
                        // There is a special material!
                        material = await getSpecialMaterial(baseArmor, goldLeft, maxGoldItemInShop, averageGoldValue);
                        if (material != null) {
                            baseArmor["Armor_Material"] = material;

                            if (material.Material_Name == "Darkwood") {
                                properties.push(organizeArmorPropertyData("Masterwork"));
                            }
                        }
                    }
                    else {
                        // No special material!
                        properties.push(organizeArmorPropertyData("Masterwork"));
                    }

                    // Check if item can have magical properties! (DO LATER)
                    let lowAverage = averageGoldValue / 2;
                    let highAverage = averageGoldValue * 3 / 2;
                    if (highAverage > maxGoldItemInShop) {
                        highAverage = maxGoldItemInShop;
                    }
                    let targetGoldValue = Math.floor(Math.random() * (highAverage - lowAverage + 1)) + lowAverage;
                    let remainingGoldForItem = targetGoldValue - baseArmor.Armor_Cost;
                    if (baseArmor.Armor_Material != null) {
                        remainingGoldForItem -= baseArmor.Armor_Material.Material_Gold_Cost;
                    }

                    if (properties != null && properties.length > 0) {
                        properties.forEach(prop => {
                            remainingGoldForItem -= prop.Property_Gold_Cost;
                        })
                    }

                    // Determine how many modifiers this armor can have
                    // Equation is (Cost = mod^2 * 1000), reversed it is (mod = sqrt(cost / 1000))
                    let totalModifiers = Math.floor(Math.sqrt(remainingGoldForItem / 1000));

                    if (!isNaN(totalModifiers) && totalModifiers > 0) {
                        // We can have enchantments and we know how many!
                        let theProperties = await getEnchantmentsForArmor(baseArmor, totalModifiers, remainingGoldForItem);
                        theProperties.forEach(prop => {
                            baseArmor.Armor_Properties.push(organizeArmorPropertyData(prop));
                        })
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

    isDuplicateArmor(a, b) {
        let match = false;
        // First check if they share a name
        if (a.Armor_Name == b.Armor_Name) {
            // They have the same name!
            // Do they share a material?
            if (a.Armor_Material == null && b.Armor_Material == null) {
                // neither has a material
                match = true;
            } else if (a.Armor_Material != null && b.Armor_Material != null &&
                    a.Armor_Material.Material_Name == b.Armor_Material.Material_Name) {
                        // they both have the same material!
                        match = true;
            }

            if (match) {
                // Now we can check if they share properties
                if (a.Armor_Properties.length == b.Armor_Properties.length) {
                    // They have the same number of properties
                    if (a.Armor_Properties.length > 0) {
                        for (let i = 0; i < a.Armor_Properties.length; i++) {
                            // We already know they have the same length
                            // We just need to look for differences
                            if (a.Armor_Properties[i].Property_Name != b.Armor_Properties[i].Property_Name) {
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

    calculateCost(armor) {
        let cost = armor.Armor_Cost;
        let modifiers = 0;
        if (armor.Armor_Material != null) {
            cost += armor.Armor_Material.Material_Gold_Cost;
        }
        armor.Armor_Properties.forEach(prop => {
            if (prop.Property_Gold_Cost != null) {
                cost += prop.Property_Gold_Cost;
            } else {
                // If the gold cost is null, its because the modifier is used instead!
                modifiers += prop.Property_Bonus_Value;
            }
        });
        if (modifiers > 0) {
            cost += (modifiers * modifiers * 1000);
        }
        return cost;
    }
}

module.exports = armorModel;