const mysql = require("mysql2");

require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.USER_DATA_DB_HOST,
    user: process.env.USER_DATA_DB_USER,
    password: process.env.USER_DATA_DB_PASSWORD,
    database: process.env.USER_DATA_DB_NAME
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
        console.log("Query that caused the error: ");
        console.log(query);
    });
}

let user_data_controller = {

    getShopNamesOwnedByUser: async function(user_id) {
        theQuery = 'SELECT shop_name FROM shop WHERE user_id = ' + user_id;
        return await query(theQuery);
    },

    insertNewShop: async function(user_id, shop_name) {
        theQuery = `INSERT INTO Shop (user_id, shop_name) VALUES (${user_id},"${shop_name}")`;
        await query(theQuery);
        theQuery = `SELECT shop_id FROM Shop WHERE user_id = ${user_id} AND shop_name = "${shop_name}"`;
        return await query(theQuery);
    },

    insertNewArmor: async function(item_number,shop_id,name,desc,category,total_cost,AC_bonus,max_dex,check_penalty,
        spell_failure,speed_20,speed_30,weight,base_id,property_summary) {
            theQuery = `INSERT INTO Armor (Armor_ID,shop_id,Armor_Name,Armor_Description,Armor_Category,Armor_Total_Cost,Armor_Base_AC_Bonus,Armor_Max_Dex,Armor_Check_Penalty,Armor_Spell_Failure,Armor_30_Speed,Armor_20_Speed,Armor_Weight,Armor_Base_ID,Armor_Property_Summary) VALUES ` +
            `(${item_number},${shop_id},"${name}","${desc}","${category}",${total_cost},${AC_bonus},${max_dex},${check_penalty},${spell_failure},${speed_30},${speed_20},${weight},${base_id},"${property_summary}")`;

            return await query(theQuery);
    },

    insertArmorProperty: async function(armor_id,shop_id,name,desc,base_id) {
        theQuery = `INSERT INTO Armor_Property (Armor_ID,shop_id,Property_Name,Property_Description,Property_Base_ID) VALUES ` +
        `(${armor_id},${shop_id},"${name}","${desc}",${base_id})`;

        return await query(theQuery);
    },

    insertNewWeapon: async function(item_number,shop_id,name,desc,category,type,total_cost,small_damage,medium_damage,critical,range_increment,damage_type,weight,base_id,property_summary) {
        theQuery = `INSERT INTO Weapon (Weapon_ID,shop_id,Weapon_Name,Weapon_Description,Weapon_Category,Weapon_Type,Weapon_Total_Cost,Weapon_Small_Damage,Weapon_Medium_Damage,Weapon_Critical,Weapon_Range_Increment,Weapon_Damage_Type,Weapon_Weight,Weapon_Base_Id,Weapon_Property_Summary) VALUES ` +
        `(${item_number},${shop_id},"${name}","${desc}","${category}","${type}",${total_cost},"${small_damage}","${medium_damage}","${critical}",${range_increment},"${damage_type}",${weight},${base_id},"${property_summary}")`;

        return await query(theQuery);
    },

    insertWeaponProperty: async function(weapon_id,shop_id,name,desc,base_id) {
        theQuery = `INSERT INTO Weapon_Property (Weapon_ID,shop_id,Property_Name,Property_Description,Property_Base_ID) VALUES ` +
        `(${weapon_id},${shop_id},"${name}","${desc}",${base_id})`;

        return await query(theQuery);
    },

    insertDoubleSideWeaponProperty: async function(weapon_id,shop_id,name,desc,base_id) {
        theQuery = `INSERT INTO Weapon_Property (Weapon_ID,shop_id,Property_Name,Property_Description,Property_Base_ID,Property_Double_Sided) VALUES ` +
        `(${weapon_id},${shop_id},"${name}","${desc}",${base_id},1)`;

        return await query(theQuery);
    }
}

module.exports = user_data_controller;