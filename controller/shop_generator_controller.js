const databaseController = require("./database_controller");
const JSONdata = require("./persistence_controller")[0];
const saveData = require("./persistence_controller")[1];
const weaponModel = require("../models/weaponModel");
const armorModel = require("../models/armorModel");


function addFloats(x, y) {
    return (x * 100 + y * 100) / 100;
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
                    shop["armor"].push(theArmor);
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