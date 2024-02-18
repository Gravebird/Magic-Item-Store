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

    getNonCoreBooks: async function() {
        return await query('SELECT Book_Name, Book_ID FROM Book WHERE Book_ID > 2');
    },

    getMaterialIDsForWeapon: async function(weaponName) {
        theQuery = 'SELECT Material.Material_ID FROM Material ' +
        'JOIN Material_For_Weapon ON Material.Material_ID = Material_For_Weapon.Material_ID ' +
        'JOIN Weapon ON Material_For_Weapon.Weapon_ID = Weapon.Weapon_ID ' +
        'WHERE Weapon.Weapon_Name = "' + weaponName + '"';
        return await query(theQuery);
    },

    getMaterialDetailsById: async function(materialID) {
        return await query('SELECT Material_ID, Material_Name, Material_Description FROM Material WHERE Material_ID = ' + materialID);
    },

    getRandomBaseWeapon: async function () {
        return await query('SELECT * FROM Weapon ORDER BY RAND() LIMIT 1');
    },

    getEnhancementBonusForMagicWeapon: async function(value) {
        return await query('SELECT Magic_Weapon_Name, Magic_Weapon_Modifier, Magic_Weapon_Description FROM Magic_Weapon WHERE Magic_Weapon_Name = "Enhancement +' + value + '"');
    },

    getEnchantmentIDsForMeleeWeapon: async function(targetModifier, canBeThrown) {
        theQuery = 'SELECT Magic_Weapon_ID FROM Magic_Weapon ' +
        'WHERE (Melee_Slashing = true OR Melee_Piercing = true OR Melee_Bludgeoning = true';
        if (canBeThrown) {
            theQuery = theQuery + ' OR Thrown_Weapon = true';
        }
        theQuery = theQuery + ') AND Magic_Weapon_Modifier = ' + targetModifier;
        return await query(theQuery);
    },

    getEnchantmentIDsForRangedWeapon: async function(targetModifier, isAmmo) {
        theQuery = 'SELECT Magic_Weapon_ID FROM Magic_Weapon WHERE ';
        if (isAmmo) {
            theQuery = theQuery + 'Ranged_Ammunition = true';
        } else {
            theQuery = theQuery + 'Ranged_Weapon = true';
        }
        theQuery = theQuery + ' AND Magic_Weapon_Modifier = ' + targetModifier;
        return await query(theQuery);
    },

    getWeaponEnchantmentDetailsByID: async function(id) {
        return await query("SELECT * FROM Magic_Weapon WHERE Magic_Weapon_ID = " + id);
    },

    getWeaponIdsUnderGoldCost: async function(maxGoldValue, rarity) {
        return await query('SELECT Weapon_ID FROM Weapon WHERE Weapon_Rarity = "' + rarity +
        '"AND ROUND(Weapon_Cost,0) <= ' + maxGoldValue);
    },

    getWeaponDetailsById: async function(weaponID) {
        return await query('SELECT * FROM Weapon WHERE Weapon_ID = ' + weaponID);
    }
}

module.exports = dnd_data_controller;