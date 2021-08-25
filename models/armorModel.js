const databaseController = require("../controller/database_controller");

function armorIsMostlyMetal(armorName) {
    if (armorName == "Padded" || armorName.includes("Leather") || armorName == "Hide") {
        return false;
    }
    return true;
}

function materialIsValidForArmor(baseArmor, materialName) {
    let valid = false;
    let armorName = baseArmor.Armor_Name;
    let armorType = baseArmor.Armor_Category;
    if (materialName == "Adamantine") {
        // Adamantine must be mostly made of metal!
        if (armorIsMostlyMetal(armorName)) {
            valid = true;
        }
    } else if (materialName == "Darkwood") {
        // Darkwood can only apply to shields, not armor!
        if (armorType == "Shield") {
            valid = true;
        }
    } else if (materialName == "Dragonhide") {
        // Dragonhide can work on any armor!
        valid = true;
    } else if (materialName == "Mithral") {
        // Mithral must be mostly made of metal!
        if (armorIsMostlyMetal(armorName)) {
            valid = true;
        }
    } else {
        console.log("ERROR! Unrecognized Special Material for Armor: " + materialName);
    }

    if (!valid) {
        console.log(armorName + " cannot be " + materialName + "!");
    }
    return valid;
}

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
        // Do this later (when weapon properties exist!)
        console.log("ERROR: organizeArmorPropertyData - thinks that data is not 'Masterwork'. data = " + data);
    }

    return theProp;
}

async function getSpecialMaterial(baseArmor, goldLeft, maxGoldItemInShop, averageGoldValue) {
    materials = await databaseController.getMaterialIDsForArmor();

    let rng = Math.floor(Math.random() * materials.length);
    material = (await databaseController.getMaterialDetailsById(materials[rng].Material_ID))[0];
    let cost = null;

    if (materialIsValidForArmor(baseArmor, material.Material_Name)) {
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
            return null;
        } else if (baseArmor.Armor_Cost + cost + 150 > maxGoldItemInShop) {
            // Also too expensive!
            return null;
        } else {
            let highAverage = averageGoldValue * 3 / 2;
            if (baseArmor.Armor_Cost + cost + 150 > highAverage) {
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
    // Material is not valid for this armor!
    console.log("Invalid material/armor combo detected!");

    return null;
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
        if (a.Armor_Name == b.Armor_Name) {
            if (a.Armor_Properties.length == b.Armor_Properties.length) {
                if (a.Armor_Properties.length == 0) {
                    return true;
                }
                let match = false;
                for (let i = 0; i < a.Armor_Properties.length; i++) {
                    if (a.Armor_Properties[i].Property_Name == b.Armor_Properties[i].Property_Name) {
                        match = true;
                    }
                }
                return match;
            }
        }
        return false;
    },

    calculateCost(armor) {
        let baseCost = armor.Armor_Cost;
        armor.Armor_Properties.forEach(prop => {
            baseCost += prop.Property_Gold_Cost;
        });
        return baseCost;
    }
}

module.exports = armorModel;