const databaseController = require("./database_controller");
const JSONdata = require("./persistence_controller")[0];
const saveData = require("./persistence_controller")[1];

/**
 * This function will organize the data that the database query returned about a weapon
 * into something more useful for the program.
 * @param {*} theData the data returned by the database query from the weapon table. There should only be one row
 * @returns A JS object containing the attributes of the weapon from the database
 */
function organizeWeaponData(data, id) {
    theData = data[0];
    let theWeapon = {};
    theWeapon["Item_ID"] = id;
    theWeapon["Weapon_Name"] = theData.Weapon_Name;
    theWeapon["Weapon_Category"] = theData.Weapon_Category;
    theWeapon["Weapon_Type"] = theData.Weapon_Type;
    theWeapon["Weapon_Cost"] = theData.Weapon_Cost;
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
    theWeapon["Weapon_Properties"] = [];
    
    return theWeapon;
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
        if (baseWeapon["Weapon_Medium_Damage"].includes("/")) {
            // Double Weapon = 600 gp
            theProp["Property_Gold_Cost"] = 600;
        } else if (baseWeapon["Weapon_Name"] == "Dart") {
            // Darts are single ammunitions = 6 gp
            theProp["Property_Gold_Cost"] = 6;
        } else {
            let toCheck = baseWeapon["Weapon_Name"].substring(baseWeapon["Weapon_Name"].length - 4);
            if (toCheck.includes("(") && toCheck.includes(")")) {
                // Ammunition! cost is 6 gp per ammo
                amount = parseInt(toCheck.substring(1, 2));
                theProp["Property_Gold_Cost"] = 6 * amount;
            } else {
                // Normal weapon = 300 gp
                theProp["Property_Gold_Cost"] = 300;
            }
        }
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
    }

    return theProp;
}

function organizeArmorData(data, id) {
    theData = data[0]
    let theArmor = {};
    theArmor["Item_ID"] = id;
    theArmor["Armor_Name"] = theData.Armor_Name;
    theArmor["Armor_Category"] = theData.Armor_Category;
    theArmor["Armor_Cost"] = theData.Armor_Cost;
    theArmor["Armor_AC_Bonus"] = theData.Armor_AC_Bonus;
    theArmor["Armor_Max_Dex"] = theData.Armor_Max_Dex;
    theArmor["Armor_Check_Penalty"] = theData.Armor_Check_Penalty;
    theArmor["Armor_Spell_Failure"] = theData.Armor_Spell_Failure;
    theArmor["Armor_30_Speed"] = theData.Armor_30_Speed;
    theArmor["Armor_20_Speed"] = theData.Armor_20_Speed;
    theArmor["Armor_Weight"] = theData.Armor_Weight;
    theArmor["Armor_Description"] = theData.Armor_Description;
    theArmor["Armor_Properties"] = [];

    return theArmor;
}

function organizeArmorPropertyData(data) {
    let theProp = {};
    if (data == "Masterwork") {
        theProp["Property_Name"] = data;
        theProp["Property_Gold_Cost"] = 150;
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
    }

    return theProp;
}

/**
 * This function will decide what properties to assign to the base weapon based off of the
 * settings the user chose.
 * @param {*} baseWeapon the base weapon (longsword, spear, etc)
 * @param {*} goldUsed The amount of gold that has already been used up by the generator
 * @param {*} goldInShop the amount of gold the shop has to work with
 * @param {*} maxGoldItemInShop the highest value item the shop can have
 * @param {*} averageGoldValue the average value among items the shop can have
 */
function getWeaponBonuses(baseWeapon, goldUsed, goldInShop, maxGoldItemInShop, averageGoldValue) {
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
                properties.push(organizeWeaponPropertyData("masterwork", baseWeapon));

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
}

/**
 * This function will decide what properties to assign to the base armor based off of the
 * settings the user chose.
 * @param {*} baseArmor the base armor (chainmail, hide, etc.)
 * @param {*} goldUsed The amount of gold that has already been used up by the generator
 * @param {*} goldInShop the amount of gold the shop has to work with
 * @param {*} maxGoldItemInShop the highest value item the shop can have
 * @param {*} averageGoldValue the average value among items the shop can have
 */
 function getArmorBonuses(baseArmor, goldUsed, goldInShop, maxGoldItemInShop, averageGoldValue) {
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
                properties.push(organizeArmorPropertyData("masterwork"));

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
}

let shopGeneratorController = {
    generate: async function(req, res) {
        bodylist = JSON.parse(JSON.stringify(req.body));
        const shopName = bodylist["shopNameInput"];
        const weaponPercentage = parseInt(bodylist["weaponPercentage"]);
        const armorPercentage = parseInt(bodylist["armorPercentage"]) + weaponPercentage;
        const goldInShop = parseInt(bodylist["goldInShop"]);
        const maxGoldItemInShop = parseInt(bodylist["maxGoldItemInShop"]);
        const averageGoldValue = parseInt(bodylist["averageGoldValue"]);


        let goldUsed = 0;
        let itemCount = 0;
        let shop = {"shopName": shopName, "weapons": [], "armor": []};
        let commonWeapons = await databaseController.getWeaponIdsUnderGoldCost(maxGoldItemInShop, "Common");
        let uncommonWeapons = await databaseController.getWeaponIdsUnderGoldCost(maxGoldItemInShop, "Uncommon");
        let commonArmors = await databaseController.getArmorIdsUnderGoldCost(maxGoldItemInShop, "Common");
        let uncommonArmors = await databaseController.getArmorIdsUnderGoldCost(maxGoldItemInShop, "Uncommon");

        while (goldUsed < goldInShop && goldUsed < (averageGoldValue / 10)) {
            // Generate a random number between 0 and 99
            let rng = Math.floor(Math.random() * 100);
            let rarityRNG = Math.floor(Math.random() * 100);

            if (rng < weaponPercentage) {
                // Generate a weapon
                let weapons;

                if (rarityRNG < 80) {
                    // Common weapon
                    rng = Math.floor(Math.random() * commonWeapons.length);
                    weapons = commonWeapons;
                } else {
                    // Uncommon weapon
                    rng = Math.floor(Math.random() * uncommonWeapons.length);
                    weapons = uncommonWeapons;
                }
                if (weapons.length > 0) {
                    weaponData = await databaseController.getWeaponDetailsById(weapons[rng].Weapon_ID);
                    let theWeapon = organizeWeaponData(weaponData, itemCount);
                    let properties = getWeaponBonuses(theWeapon, goldUsed, goldInShop, maxGoldItemInShop, averageGoldValue);
                    let totalCost = theWeapon.Weapon_Cost;
                    if (properties != null) {
                        for (prop in properties) {
                            theWeapon["Weapon_Properties"].push(prop);
                            totalCost += prop.Property_Gold_Cost;
                        }
                    }
                    goldUsed += totalCost;
                    shop["weapons"].push(theWeapon);
                }
            } else if (rng < armorPercentage) {
                // Generate an armor
                let armors;

                if (rarityRNG < 80) {
                    // Common armor
                    rng = Math.floor(Math.random() * commonArmors.length);
                    armors = commonArmors;
                } else {
                    // Uncommon armor
                    rng = Math.floor(Math.random() * uncommonArmors.length);
                    armors = uncommonArmors;
                }
                if (armors.length > 0) {
                    armorData = await databaseController.getArmorDetailsById(armors[rng].Armor_ID);
                    let theArmor = organizeArmorData(armorData, itemCount);
                    let properties = getArmorBonuses(theArmor, goldUsed, goldInShop, maxGoldItemInShop, averageGoldValue);
                    let totalCost = theArmor.Armor_Cost;
                    if (properties != null) {
                        for (prop in properties) {
                            theArmor["Armor_Properties"].push(prop);
                            totalCost += prop.Property_Gold_Cost;
                        }
                    }
                    goldUsed += totalCost;
                    shop["armor"].push(theArmor);
                }
            } else {
                console.log("ERROR: rng in shop_generator_controller.generate is out of range!");
                return;
            }

            itemCount += 1;
        }

        //TEMPORARY REDIRECT
        //console.log(bodylist);
        JSONdata["shops"].push(shop);
        saveData();
        res.redirect("/welcome");
    }
};

module.exports = shopGeneratorController;