const dnd_data_controller = require("../controller/dnd_data_controller");

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

async function getSpecialMaterial(baseArmor, minGold, maxGold, sourceBooks) {
    materials = await dnd_data_controller.getMaterialIDsForArmour(baseArmor.Armor_Name, sourceBooks);

    if (materials == undefined || materials.length < 1) {
        // No materials can apply to this armor
        return null;
    }

    let rng = Math.floor(Math.random() * materials.length);
    material = (await dnd_data_controller.getMaterialDetailsById(materials[rng].Material_ID))[0];
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
        console.log("Error: No code for material: " + material.Material_Name + " in armorModel.js - getSpecialMaterial");
    }


    // Check that we can afford to put this material on the armor!
    if (baseArmor.Armor_Cost + cost + 150 > maxGold) {
        // Too expensive!
        console.log("Too expensive! 1:", cost, maxGold)
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


function duplicateEnchantment(a, b) {
    if (a == b) {
        return true;
    }
    if (a.includes("Fortification") && b.includes("Fortification")) {
        return true;
    }
    if (a.includes("Slick") && b.includes("Slick")) {
        return true;
    }
    if (a.includes("Silent Moves") && b.includes("Silent Moves")) {
        return true;
    }
    if (a.includes("Shadow") && b.includes("Shadow")) {
        return true;
    }

    let i = a.indexOf("Resistance");
    if (i >= 0) {
        console.log("\nResistance found! - " + a);
        console.log("Comparing with " + b);

        let word = a.substring(0, i);
        console.log("Word is " + word);
        if (a.includes(word) && b.includes(word)) {
            console.log("Match!");
            return true;
        }
        console.log("No match!");
    }
    return false;
}

function enchantmentIsValid(theProp, properties, baseArmor) {
    if (baseArmor.Armor_Name.includes("Wood")) {
        if (theProp[0].Magic_Armor_Name == "Reflecting") {
            return false;
        }
    }
    for (let i = 0; i < properties.length; i++) {
        if (duplicateEnchantment(theProp[0].Magic_Armor_Name, properties[i][0].Magic_Armor_Name)) {
            return false;
        }
    }
    return true;
}


async function getEnchantmentsForArmor(baseArmor, totalModifiers, maxGold, sourceBooks) {
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
            theProperty = await dnd_data_controller.getEnhancementBonusForMagicArmor(5);
            totalModifiers -= 5;
        } else {
            // Enhancement equal to the totalModifiers value
            theProperty = await dnd_data_controller.getEnhancementBonusForMagicArmor(totalModifiers);
            totalModifiers = 0;
        }
    } else if (rng < 90) {
        // Mixed enhancements and abilities
        let enhanceValue = Math.floor(Math.random() * totalModifiers) + 1;
        if (enhanceValue > 5) {
            enhanceValue = 5;
        }
        theProperty = await dnd_data_controller.getEnhancementBonusForMagicArmor(enhanceValue);
        totalModifiers -= enhanceValue;
    } else {
        // Minimum enhancements, maximum abilities
        theProperty = await dnd_data_controller.getEnhancementBonusForMagicArmor(1);
        totalModifiers -= 1;
    }

    theProperties.push(theProperty);

    while (totalModifiers > 0) {
        console.log("1", totalModifiers);
        let numMods = 0;
        let goldLeft = maxGold;

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
                propertyList = await dnd_data_controller.getEnchantmentIDsForArmor(totalModifiers, goldLeft, true, sourceBooks);
            } else {
                propertyList = await dnd_data_controller.getEnchantmentIDsForArmor(totalModifiers, goldLeft, false, sourceBooks);
            }

            console.log("2", propertyList.length);

            if (propertyList.length > 0) {
                rng = Math.floor(Math.random() * propertyList.length);
                theProperty = await dnd_data_controller.getArmorEnchantmentDetailsByID(propertyList[rng].Magic_Armor_ID);
                console.log("3", theProperty);
            } else {
                console.log("ERROR in armorModel.js - getEnchantmentsForArmor");
                console.log("propertyList from DB is length <= 0");
                theProperty = null;
                break;
            }

            if (theProperty != null) {
                if (enchantmentIsValid(theProperty, theProperties, baseArmor)) {
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
    generateArmorItem: async function(minGold, maxGold, shopItemID, sourceBooks) {
        let rng = Math.floor(Math.random() * 100);

        let baseArmorIDs;

        if (rng < 80) {
            // Common Armor
            baseArmorIDs = await dnd_data_controller.getArmorIDsUnderGoldCost(maxGold, "Common", sourceBooks);
        } else {
            // Uncommon Armor
            baseArmorIDs = await dnd_data_controller.getArmorIDsUnderGoldCost(maxGold, "Uncommon", sourceBooks);
        }

        if (baseArmorIDs.length > 0) {
            // We can reuse rng since all checks have been done
            rng = Math.floor(Math.random() * baseArmorIDs.length);
            armorData = await dnd_data_controller.getArmorDetailsById(baseArmorIDs[rng].Armor_ID);
            let theArmor = this.organizeArmorData(armorData, shopItemID);
            let properties = await this.getArmorBonuses(theArmor, minGold, maxGold, sourceBooks);
            if (properties != null) {
                properties.forEach(prop => {
                    theArmor["Armor_Properties"].push(prop);
                });
            }
            let totalCost = this.calculateCost(theArmor);
            theArmor["Armor_Cost_With_Properties"] = totalCost;

            return theArmor;
        }
        // No valid armors!
        console.log("4. No valid armors found in armorModel.js - generateArmorItem");
        return null;
    },

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

    getArmorBonuses: async function (baseArmor, minGold, maxGold, sourceBooks) {
        let properties = [];
        
        let mwkChance = 0;

        if (minGold < baseArmor.Armor_Cost + 150 && maxGold > baseArmor.Armor_Cost + 150) {
            // Chance for some armors to be masterwork
            mwkChance = ((maxGold + minGold) / 2) / 10;
            if (mwkChance > 95) {
                mwkChance = 95;
            }
        }
        else if (minGold > baseArmor.Armor_Cost + 150) {
            mwkChance = 100;
        }

        // mwkChance has been decided!
        let rng = Math.floor(Math.random() * 100);

        if (rng < mwkChance) {
            // Item is masterwork!
            // Check if it is made of a special material before adding the masterwork property
            // We can reuse rng here since all checks have been finished
            rng = Math.floor(Math.random() * 100);

            if (rng < 10) {
                // There is a special material!
                material = await getSpecialMaterial(baseArmor, minGold, maxGold, sourceBooks);
                if (material != null) {
                    baseArmor["Armor_Material"] = material;

                    if (material.Material_Name == "Darkwood") {
                        properties.push(organizeArmorPropertyData("Masterwork"));
                    }
                } else {
                    properties.push(organizeArmorPropertyData("Masterwork"));
                }
            } else {
                // No special material!
                properties.push(organizeArmorPropertyData("Masterwork"));
            }

            // Check if we can have magical properties!
            // ***************************************************************
            // CHECK THIS IF ARMOR IS BEHAVING STRANGELY IN THE GENERATOR
            // ***************************************************************
            let targetGoldValue = Math.floor(Math.random() * (maxGold - minGold + 1)) + minGold;
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
                let theProperties = await getEnchantmentsForArmor(baseArmor, totalModifiers, remainingGoldForItem, sourceBooks);
                theProperties.forEach(prop => {
                    baseArmor.Armor_Properties.push(organizeArmorPropertyData(prop));
                    //properties.push(organizeArmorPropertyData(prop));
                })
            }
        }
        else {
            // Item is not masterwork!
            return null;
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