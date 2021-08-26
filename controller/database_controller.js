const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'A00768125',
    database: 'DnD'
});

function query(query) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) reject(err); // Not connected!

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

let databaseController = {

    test: async function () {
        return await query('SELECT * FROM Spell WHERE Spell_School = "Necromancy"');
    },

    getWeaponIdsUnderGoldCost: async function(maxGoldValue, rarity) {
        return await query('SELECT Weapon_ID FROM Weapon WHERE Weapon_Rarity = "' + rarity +
        '"AND ROUND(Weapon_Cost,0) <= ' + maxGoldValue);
    },

    getArmorIdsUnderGoldCost: async function(maxGoldValue, rarity) {
        return await query('SELECT Armor_ID, Armor_Cost FROM Armor WHERE Armor_Rarity = "' + rarity +
        '"AND ROUND(Armor_Cost,0) <= ' + maxGoldValue);
    },

    getWeaponDetailsById: async function(weaponID) {
        return await query('SELECT * FROM Weapon WHERE Weapon_ID = ' + weaponID);
    },

    getArmorDetailsById: async function(armorID) {
        return await query('SELECT * FROM Armor WHERE Armor_ID = ' + armorID);
    },

    getMaterialIDsForWeapon: async function(weaponName) {
        theQuery = 'SELECT Material.Material_ID FROM Material ' +
        'JOIN Material_For_Weapon ON Material.Material_ID = Material_For_Weapon.Material_ID ' +
        'JOIN Weapon ON Material_For_Weapon.Weapon_ID = Weapon.Weapon_ID ' +
        'WHERE Weapon.Weapon_Name = "' + weaponName + '"';
        return await query(theQuery);
    },

    getMaterialIDsForArmor: async function(armorName) {
        theQuery = 'SELECT Material.Material_ID FROM Material ' +
        'JOIN Material_For_Armor ON Material.Material_ID = Material_For_Armor.Material_ID ' +
        'JOIN Armor ON Material_For_Armor.Armor_ID = Armor.Armor_ID ' +
        'WHERE Armor.Armor_Name = "' + armorName + '"';
        return await query(theQuery);
    },

    getMaterialDetailsById: async function(materialID) {
        return await query('SELECT Material_ID, Material_Name, Material_Description FROM Material WHERE Material_ID = ' + materialID);
    }
}

module.exports = databaseController;