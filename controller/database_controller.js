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

    getEnhancementBonusForMagicArmor: async function(value) {
        return await query('SELECT Magic_Armor_Name, Magic_Armor_Modifier, Magic_Armor_Description FROM Magic_Armor WHERE Magic_Armor_Name = "Enhancement +' + value + '"');
    },

    getEnchantmentIDsForArmor: async function(modifiersLeft, goldLeft, isShield) {
        theQuery = 'SELECT Magic_Armor_ID FROM Magic_Armor WHERE ';
        if (isShield) {
            theQuery = theQuery + 'Magic_Armor_Can_Be_Shield = true';
        } else {
            theQuery = theQuery + 'Magic_Armor_Can_Be_Armor = true';
        }
        theQuery = theQuery + ' AND (Magic_Armor_Modifier <= ' + modifiersLeft + ' OR Magic_Armor_Cost <= ' + goldLeft + ')';
        console.log("DB DEBUG:", theQuery);
        return await query(theQuery);
    },

    getArmorEnchantmentDetailsByID: async function(id) {
        return await query('SELECT * FROM Magic_Armor WHERE Magic_Armor_ID = ' + id);
    }
}

module.exports = databaseController;