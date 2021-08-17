const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'A00768125',
    database: 'DnD'
});

let databaseController = {

    test: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) reject(err); // Not connected!
    
                connection.query('SELECT * FROM Spell WHERE Spell_School = "Necromancy"', function(error, results, fields) {
                    connection.release();
    
                    if (error) reject(err);
                    resolve(results);
                });
            });
        }).catch(function(error) {
            //console.log(error);
        });
    },

    getWeaponIdsUnderGoldCost: (maxGoldValue, rarity) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) reject(err); // Not connected!

                connection.query('SELECT Weapon_ID FROM Weapon WHERE Weapon_Rarity = "' + rarity +
                    '"AND ROUND(Weapon_Cost,0) <= ' + maxGoldValue, function(error, results, fields) {
                        connection.release();

                        if (error) reject(err);
                        resolve(results);
                    });
            });
        }).catch(function(error) {
            //console.log(error);
        });
    },

    getArmorIdsUnderGoldCost: (maxGoldValue, rarity) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) reject(err); // Not connected!

                connection.query('SELECT Armor_ID FROM Armor WHERE Armor_Rarity = "' + rarity +
                    '"AND ROUND(Armor_Cost,0) <= ' + maxGoldValue, function(error, results, fields) {
                        connection.release();

                        if (error) reject(err);
                        resolve(results);
                    });
            });
        }).catch(function(error) {
            //console.log(error);
        });
    },

    getWeaponDetailsById: (weaponID) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) reject(err); // Not connected!

                connection.query('SELECT * FROM Weapon WHERE Weapon_ID = ' + weaponID, function(error, results, fields) {
                    connection.release();

                    if (error) reject(err);
                    resolve(results);
                });
            });
        }).catch(function(error) {
            //console.log(error);
        });
    },

    getArmorDetailsById: (armorID) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) reject(err); // Not connected!

                connection.query('SELECT * FROM Armor WHERE Armor_ID = ' + armorID, function(error, results, fields) {
                    connection.release();

                    if (error) reject(err);
                    resolve(results);
                });
            });
        }).catch(function(error) {
            //console.log(error);
        });
    }
}

module.exports = databaseController;