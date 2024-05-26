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
    }
}

module.exports = user_data_controller;