const mysql = require('mysql2');

require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DND_DATA_DB_HOST,
    user: process.env.DND_DATA_DB_USER,
    password: process.env.DND_DATA_DB_PASSWORD,
    database: process.env.DND_DATA_DB_NAME
});


function query(query) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err); // Not connected!
                console.log(err);
            }

            connection.query(query, function (error, results, fields) {
                connection.release();

                if (error) reject(err);
                resolve(results);
            });
        });
    }).catch(function(error) {
        console.log("DB query error: " + error);
    });
}

let dnd_data_controller = {

    getBooks: async function() {
        return await query('SELECT Book_Name, Book_ID FROM Book');
    },

    getMaterialIDsForWeapon: async function(weaponName, sourceBooks) {
        theQuery = 'SELECT Material.Material_ID FROM Material ' +
        'JOIN Material_For_Weapon ON Material.Material_ID = Material_For_Weapon.Material_ID ' +
        'JOIN Weapon ON Material_For_Weapon.Weapon_ID = Weapon.Weapon_ID ' +
        'JOIN Book ON Book.Book_ID = Material.Book_ID ' +
        'WHERE Weapon.Weapon_Name = "' + weaponName + '" AND Book.Book_ID IN (' + sourceBooks + ')';
        return await query(theQuery);
    },

    getMaterialIDsForArmor: async function(armorName, sourceBooks) {
        theQuery = 'SELECT Material.Material_ID FROM Material ' +
        'JOIN Material_For_Armor ON Material.Material_ID = Material_For_Armor.Material_ID ' +
        'JOIN Armor ON Material_For_Armor.Armor_ID = Armor.Armor_ID ' +
        'JOIN Book ON Book.Book_ID = Material.Book_ID ' +
        'WHERE Armor.Armor_Name = "' + armorName + '" AND Book.Book_ID IN (' + sourceBooks + ')'; 
        return await query(theQuery);
    },

    getMaterialDetailsById: async function(materialID) {
        return await query('SELECT Material_ID, Material_Name, Material_Description FROM Material WHERE Material_ID = ' + materialID);
    },

    getRandomBaseWeapon: async function (sourceBooks) {
        return await query('SELECT * FROM Weapon ' +
        'JOIN Book ON Book.Book_ID = Weapon.Weapon_ID ' +
        'WHERE Book.Book_ID IN (' + sourceBooks + ') ' +
        'ORDER BY RAND() LIMIT 1');
    },

    getEnhancementBonusForMagicWeapon: async function(value) {
        return await query('SELECT Magic_Weapon_Name, Magic_Weapon_Modifier, Magic_Weapon_Description FROM Magic_Weapon WHERE Magic_Weapon_Name = "Enhancement +' + value + '"');
    },

    getEnhancementBonusForMagicArmor: async function(value) {
        return await query('SELECT Magic_Armor_Name, Magic_Armor_Modifier, Magic_Armor_Description FROM Magic_Armor WHERE Magic_Armor_Name = "Enhancement +' + value + '"');
    },

    getEnchantmentIDsForMeleeWeapon: async function(targetModifier, canBeThrown, sourceBooks) {
        theQuery = 'SELECT Magic_Weapon_ID FROM Magic_Weapon ' +
        'JOIN Book ON Book.Book_ID = Magic_Weapon.Book_ID ' +
        'WHERE Book.Book_ID IN (' + sourceBooks + ') ' +
        'AND (Melee_Slashing = true OR Melee_Piercing = true OR Melee_Bludgeoning = true';
        if (canBeThrown) {
            theQuery = theQuery + ' OR Thrown_Weapon = true';
        }
        theQuery = theQuery + ') AND Magic_Weapon_Modifier = ' + targetModifier;
        return await query(theQuery);
    },

    getEnchantmentIDsForRangedWeapon: async function(targetModifier, isAmmo, sourceBooks) {
        theQuery = 'SELECT Magic_Weapon_ID FROM Magic_Weapon JOIN Book ON Book.Book_ID = Magic_Weapon.Book_ID WHERE Book.Book_ID IN (' + sourceBooks + ') AND ';
        if (isAmmo) {
            theQuery = theQuery + 'Ranged_Ammunition = true';
        } else {
            theQuery = theQuery + 'Ranged_Weapon = true';
        }
        theQuery = theQuery + ' AND Magic_Weapon_Modifier = ' + targetModifier;
        return await query(theQuery);
    },

    getEnchantmentIDsForArmor: async function(modifiersLeft, goldLeft, isShield, sourceBooks) {
        theQuery = 'SELECT Magic_Armor_ID FROM Magic_Armor JOIN Book ON Book.Book_ID = Magic_Armor.Book_ID ' +
        'WHERE Book.Book_ID IN (' + sourceBooks + ') AND ';
        if (isShield) {
            theQuery = theQuery + 'Magic_Armor_Can_Be_Shield = true';
        } else {
            theQuery = theQuery + 'Magic_Armor_Can_Be_Armor = true';
        }
        theQuery = theQuery + ' AND (Magic_Armor_Modifier <= ' + modifiersLeft + ' OR Magic_Armor_Cost <= ' + goldLeft + ')';
        console.log("DB DEBUG:", theQuery);
        return await query(theQuery);
    },

    getWeaponEnchantmentDetailsByID: async function(id) {
        return await query("SELECT * FROM Magic_Weapon WHERE Magic_Weapon_ID = " + id);
    },

    getArmorEnchantmentDetailsByID: async function(id) {
        return await query('SELECT * FROM Magic_Armor WHERE Magic_Armor_ID = ' + id);
    },

    getWeaponDetailsById: async function(weaponID) {
        return await query('SELECT * FROM Weapon WHERE Weapon_ID = ' + weaponID);
    },

    getArmorDetailsById: async function(armorID) {
        return await query('SELECT * FROM Armor WHERE Armor_ID = ' + armorID);
    },

    getWeaponIDsUnderGoldCost: async function(maxGold, rarity, sourceBooks) {
        theQuery = 'SELECT Weapon_ID FROM Weapon JOIN Book ON Book.Book_ID = Weapon.Book_ID ' +
        'WHERE Book.Book_ID IN (' + sourceBooks + ') AND Weapon_Rarity = "' + rarity +
        '" AND ROUND(Weapon_Cost,0) <= ' + maxGold;
        return await query(theQuery);
    },

    getArmorIDsUnderGoldCost: async function(maxGold, rarity, sourceBooks) {
        theQuery = 'SELECT Armor_ID FROM Armor JOIN Book ON Book.Book_ID = Armor.Book_ID ' +
        'WHERE Book.Book_ID IN (' + sourceBooks + ') AND Armor_Rarity = "' + rarity +
        '" AND ROUND(Armor_Cost,0) <= ' + maxGold;
        return await query(theQuery);
    },

    getBookIDsFromNames: async function(shopNames) {
        theQuery = 'SELECT Book_ID FROM Book WHERE Book_Name IN (' + shopNames + ')';
        return await query(theQuery);
    }
}

module.exports = dnd_data_controller;