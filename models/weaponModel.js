const databaseController = require("../controller/database_controller");

function weaponIsAmmo(weaponName) {
    if (weaponName == "Dart" || weaponName == "Shuriken" || weaponName.includes("Bolt") || weaponName.includes("Arrow") || weaponName.includes("Bullets")) {
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

/**
* This function will organize the data from a database query about 
* @param {*} data 
* @returns 
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
        // Do this later (when weapon properties exist!)
        console.log("ERROR: organizeWeaponPropertyData - thinks that data is not 'Masterwork'. data = " + data);
    }

    return theProp;
}

async function getSpecialMaterial(baseWeapon, goldLeft, maxGoldItemInShop, averageGoldValue) {
    materials = await databaseController.getMaterialIDsForWeapon(baseWeapon.Weapon_Name);

    console.log(materials);

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
        cost = getMasterworkCost(baseWeapon) + baseWeapon.Weapon_Cost;

    } else if (material.Material_Name == "Mithral") {
        cost = 500 * baseWeapon.Weapon_Weight;

    } else if (material.Material_Name == "Silver, Alchemical") {
        if (weaponIsAmmo(baseWeapon.Weapon_Name)) {
            cost = 2;
        } else if (baseWeapon.Weapon_Type == "Light Melee") {
            cost = 20;
        } else if (baseWeapon.Weapon_Type == "One-Handed Melee") {
            cost = 90;
        } else if (baseWeapon.Weapon_Type == "Two-Handed Melee") {
            cost = 180;
        } else {
            console.log("ERROR: baseWeapon is not light, one-handed, or two-handed. Received: " + baseWeapon.Weapon_Type);
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
                                console.log("DEBUG: " + a.Weapon_Properties[i].Property_Name + " is not equal to " + b.Weapon_Properties[i].Property_Name);
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
        let baseCost = weapon.Weapon_Cost;
        if (weapon.Weapon_Material != null) {
            baseCost += weapon.Weapon_Material.Material_Gold_Cost;
        }
        weapon.Weapon_Properties.forEach(prop => {
            baseCost += prop.Property_Gold_Cost;
        });
        return baseCost;
    }
}

module.exports = weaponModel;