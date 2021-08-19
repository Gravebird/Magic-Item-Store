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
    console.log("LOWERING");
    if (currentCost <= highAverage) {
        // Cost is below the high average, we are done here!
        console.log("Cost is below high average! currentCost: " + currentCost + ", highAverage: " + highAverage);
        console.log("Returning rng: " + rng);
        return rng;
    } else {
        // Cost is too high! Lower it!
        if (rng == 0) {
            // Cannot lower cost anymore!
            console.log("Cannot lower anymore, returning rng: " + rng);
            return rng;
        } else {
            // Lower the cost until its within range!
            console.log("Lowering rng to: " + (rng - 1));
            return lowerRNGForRandomArmor(armors, rng - 1, highAverage);
        }
    }
}

function increaseRNGForRandomArmor(armors, rng, highAverage, maxCost) {
    let currentCost = armors[rng].Armor_Cost;
    console.log("INCREASING");
    if (currentCost >= maxCost) {
        // Cannot increase cost anymore!
        console.log("Cannot increase cost anymore! currentCost: " + currentCost + ", maxCost: " + maxCost);
        console.log("Returning rng: " + rng);
        return rng;
    }
    if (currentCost <= highAverage) {
        // Cost is too low! increase it!
        console.log("Increasing rng to: " + (rng + 1));
        return increaseRNGForRandomArmor(armors, rng + 1);
    }
    // Cost is already above average!
    return rng;
}

function adjustRngForRandomArmor(armors, rng, averageGoldValue) {
    if (armors.length == 0) {
        console.log("No armor in array, returning rng: " + rng);
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
                    let properties = weaponModel.getWeaponBonuses(theWeapon, goldUsed, goldInShop, maxGoldItemInShop, averageGoldValue);
                    let totalCost = theWeapon.Weapon_Cost;
                    if (properties != null) {
                        properties.forEach(prop => {
                            theWeapon["Weapon_Properties"].push(prop);
                            totalCost = addFloats(totalCost, prop.Property_Gold_Cost);
                        });
                    }
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
                console.log("RNG before adjusting: " + rng);
                console.log("chosen armor before adjusting: " + armors[rng].Armor_ID);
                rng = adjustRngForRandomArmor(armors, rng);
                console.log("RNG after adjusting: " + rng);

                // Grab armor data and work with it
                if (armors.length > 0) {
                    armorData = await databaseController.getArmorDetailsById(armors[rng].Armor_ID);
                    let theArmor = armorModel.organizeArmorData(armorData, itemCount);
                    let properties = armorModel.getArmorBonuses(theArmor, goldUsed, goldInShop, maxGoldItemInShop, averageGoldValue);
                    let totalCost = theArmor.Armor_Cost;
                    if (properties != null) {
                        properties.forEach(prop => {
                            theArmor["Armor_Properties"].push(prop);
                            totalCost = addFloats(totalCost, prop.Property_Gold_Cost);
                        });
                    }
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
                    }
                }
            } else {
                console.log("ERROR: rng in shop_generator_controller.generate is out of range!");
                return;
            }

            itemCount += 1;
            console.log("goldUsed: " + goldUsed + ", goldInShop: " + goldInShop);
        }

        // Sort each category by price
        shop.weapons.sort(function(a, b) {
            let aCost = a.Weapon_Cost;
            let bCost = b.Weapon_Cost;
            a.Weapon_Properties.forEach(prop => {
                aCost += prop.Property_Gold_Cost;
            });
            b.Weapon_Properties.forEach(prop => {
                bCost += prop.Property_Gold_Cost;
            });
            return bCost - aCost;
        });

        shop.armor.sort(function(a, b) {
            let aCost = a.Armor_Cost;
            let bCost = b.Armor_Cost;
            a.Armor_Properties.forEach(prop => {
                aCost += prop.Property_Gold_Cost;
            });
            b.Armor_Properties.forEach(prop => {
                bCost += prop.Property_Gold_Cost;
            });
            return bCost - aCost;
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