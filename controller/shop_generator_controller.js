const databaseController = require("./database_controller");
const JSONdata = require("./persistence_controller")[0];
const saveData = require("./persistence_controller")[1];
const weaponModel = require("../models/weaponModel");
const armorModel = require("../models/armorModel");


function addFloats(x, y) {
    return (x * 100 + y * 100) / 100;
}

function lowerRNGForRandomArmor(armors, rng, highAverage) {
    let currentCost = armors[rng].Armor_Cost;
    if (currentCost <= highAverage) {
        // Cost is below the high average, we are done here!
        return rng;
    } else {
        // Cost is too high! Lower it!
        if (rng == 0) {
            // Cannot lower cost anymore!
            return rng;
        } else {
            // Lower the cost until its within range!
            return lowerRNGForRandomArmor(armors, rng - 1, highAverage);
        }
    }
}

function increaseRNGForRandomArmor(armors, rng, highAverage, maxCost) {
    let currentCost = armors[rng].Armor_Cost;
    if (currentCost >= maxCost) {
        // Cannot increase cost anymore!
        return rng;
    }
    if (currentCost <= highAverage) {
        // Cost is too low! increase it!
        return increaseRNGForRandomArmor(armors, rng + 1);
    }
    // Cost is already above average!
    return rng;
}

function adjustRngForRandomArmor(armors, rng, averageGoldValue) {
    if (armors.length == 0) {
        return rng;
    }
    let costRNG = Math.floor(Math.random() * 100);
    let highAverage = averageGoldValue * 3 / 2;
    let maxCost = armors[armors.length - 1].Armor_Cost;

    if (costRNG < 75) {
        // Cost should be below the high average!
        return lowerRNGForRandomArmor(armors, rng, highAverage);
    } else {
        // Cost can be higher than the average!
        return increaseRNGForRandomArmor(armors, rng, highAverage, maxCost);
    }
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

        for (theShop in req.user.shops) {
            if (shopName == theShop.shopName) {
                console.log("Shop name already exists!");
                res.redirect("/shop_generator");
                return;
            }
        }

        let goldUsed = 0;
        let itemCount = 0;
        let shop = {"id": null, "shopName": shopName, "weapons": [], "armor": []};
        let commonWeapons = await databaseController.getWeaponIdsUnderGoldCost(maxGoldItemInShop, "Common");
        let uncommonWeapons = await databaseController.getWeaponIdsUnderGoldCost(maxGoldItemInShop, "Uncommon");
        let commonArmors = await databaseController.getArmorIdsUnderGoldCost(maxGoldItemInShop, "Common");
        let uncommonArmors = await databaseController.getArmorIdsUnderGoldCost(maxGoldItemInShop, "Uncommon");

        while (goldUsed < goldInShop) {
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
                    let theWeapon = weaponModel.organizeWeaponData(weaponData, itemCount);
                    let properties = await weaponModel.getWeaponBonuses(theWeapon, goldUsed, goldInShop, maxGoldItemInShop, averageGoldValue);
                    if (properties != null) {
                        properties.forEach(prop => {
                            theWeapon["Weapon_Properties"].push(prop);
                        });
                    }
                    let totalCost = weaponModel.calculateCost(theWeapon);
                    theWeapon["Weapon_Cost_With_Properties"] = totalCost;
                    goldUsed = addFloats(goldUsed, totalCost);

                    let duplicateFound = false;
                    for (let i = 0; i < shop.weapons.length; i++) {
                        if (weaponModel.isDuplicateWeapon(shop.weapons[i], theWeapon)) {
                            duplicateFound = true;
                            shop.weapons[i].Weapon_Quantity = shop.weapons[i].Weapon_Quantity + 1;
                            break;
                        }
                    };

                    if (duplicateFound == false) {
                        shop["weapons"].push(theWeapon);
                        itemCount += 1;
                    }
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
                // Check Armor_Cost of the rng, decide if it should be higher or lower based on average
                rng = adjustRngForRandomArmor(armors, rng);

                // Grab armor data and work with it
                if (armors.length > 0) {
                    armorData = await databaseController.getArmorDetailsById(armors[rng].Armor_ID);
                    let theArmor = armorModel.organizeArmorData(armorData, itemCount);
                    let properties = await armorModel.getArmorBonuses(theArmor, goldUsed, goldInShop, maxGoldItemInShop, averageGoldValue);
                    if (properties != null) {
                        properties.forEach(prop => {
                            theArmor["Armor_Properties"].push(prop);
                        });
                    }
                    let totalCost = armorModel.calculateCost(theArmor);
                    theArmor["Armor_Cost_With_Properties"] = totalCost;
                    goldUsed = addFloats(goldUsed, totalCost);

                    let duplicateFound = false;
                    for (let i = 0; i < shop.armor.length; i++) {
                        if (armorModel.isDuplicateArmor(shop.armor[i], theArmor)) {
                            duplicateFound = true;
                            shop.armor[i].Armor_Quantity = shop.armor[i].Armor_Quantity + 1;
                            break;
                        }
                    }

                    if (duplicateFound == false) {
                        shop["armor"].push(theArmor);
                        itemCount += 1;
                    }
                }
            } else {
                console.log("ERROR: rng in shop_generator_controller.generate is out of range!");
                return;
            }
            //console.log("goldUsed: " + goldUsed + ", goldInShop: " + goldInShop);
        }

        // Sort each category by price
        shop.weapons.sort(function(a, b) {
            return weaponModel.calculateCost(b) - weaponModel.calculateCost(a);
        });

        shop.armor.sort(function(a, b) {
            return armorModel.calculateCost(b) - armorModel.calculateCost(a);
        })

        let tempShopsObj = req.user.shops;
        shop["id"] = tempShopsObj.length + 1;
        tempShopsObj.push(shop);
        req.user.shops = tempShopsObj;
        saveData();

        //TEMPORARY REDIRECT
        //console.log(bodylist);
        res.redirect("/welcome");
    }
};

module.exports = shopGeneratorController;