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

    getUserName: async function(user_id) {
        theQuery = 'SELECT username FROM users WHERE id = ' + user_id;
        return await query(theQuery);
    },

    getShopDetailsByUser: async function(user_id) {
        theQuery = 'SELECT shop_id, shop_name, shop_min_gold, shop_max_gold, shop_created_date, shop_num_items' +
            ' FROM Shop WHERE user_id = ' + user_id;
        return await query(theQuery);
    },

    insertNewShop: async function(user_id, shop_name, min_gold, max_gold, created_date, num_items) {
        theQuery = `INSERT INTO Shop (user_id, shop_name, shop_min_gold, shop_max_gold, shop_created_date, shop_num_items) VALUES (${user_id},"${shop_name}",${min_gold},${max_gold},"${created_date}",${num_items})`;
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

    insertArmorProperty: async function(armor_id,shop_id,name,desc,base_id,is_material) {
        theQuery = `INSERT INTO Armor_Property (Armor_ID,shop_id,Property_Name,Property_Description,Property_Base_ID,Property_is_Material) VALUES ` +
        `(${armor_id},${shop_id},"${name}","${desc}",${base_id},${is_material})`;

        return await query(theQuery);
    },

    insertNewWeapon: async function(item_number,shop_id,name,desc,category,type,total_cost,small_damage,medium_damage,critical,range_increment,damage_type,weight,base_id,property_summary) {
        theQuery = `INSERT INTO Weapon (Weapon_ID,shop_id,Weapon_Name,Weapon_Description,Weapon_Category,Weapon_Type,Weapon_Total_Cost,Weapon_Small_Damage,Weapon_Medium_Damage,Weapon_Critical,Weapon_Range_Increment,Weapon_Damage_Type,Weapon_Weight,Weapon_Base_Id,Weapon_Property_Summary) VALUES ` +
        `(${item_number},${shop_id},"${name}","${desc}","${category}","${type}",${total_cost},"${small_damage}","${medium_damage}","${critical}",${range_increment},"${damage_type}",${weight},${base_id},"${property_summary}")`;

        return await query(theQuery);
    },

    insertWeaponProperty: async function(weapon_id,shop_id,name,desc,base_id,is_material) {
        theQuery = `INSERT INTO Weapon_Property (Weapon_ID,shop_id,Property_Name,Property_Description,Property_Base_ID,Property_is_Material) VALUES ` +
        `(${weapon_id},${shop_id},"${name}","${desc}",${base_id},${is_material})`;

        return await query(theQuery);
    },

    insertDoubleSideWeaponProperty: async function(weapon_id,shop_id,name,desc,base_id,is_material) {
        theQuery = `INSERT INTO Weapon_Property (Weapon_ID,shop_id,Property_Name,Property_Description,Property_Base_ID,Property_Double_Sided,Property_is_Material) VALUES ` +
        `(${weapon_id},${shop_id},"${name}","${desc}",${base_id},1,${is_material})`;

        return await query(theQuery);
    },

    insertMagicItem: async function(item_number,shop_id,name,desc,type,total_cost,caster_level,aura,base_id) {
        theQuery = `INSERT INTO Magic_Item (Magic_Item_ID,shop_id,Magic_Item_Name,Magic_Item_Description,Magic_Item_Type,Magic_Item_Cost,Magic_Item_Caster_Level,Magic_Item_Aura,Magic_Item_Base_ID) VALUES ` +
        `(${item_number},${shop_id},"${name}","${desc}","${type}",${total_cost},${caster_level},"${aura}",${base_id})`;

        return await query(theQuery);
    },

    insertMiscItem: async function(item_number,shop_id,name,type,total_cost,weight,desc,base_id) {
        theQuery = `INSERT INTO Misc_Item (Misc_Item_ID,shop_id,Misc_Item_Name,Misc_Item_Type,Misc_Item_Cost,Misc_Item_Weight,Misc_Item_Description,Misc_Item_Base_ID) VALUES ` +
        `(${item_number},${shop_id},"${name}","${type}",${total_cost},${weight},"${desc}",${base_id})`;

        return await query(theQuery);
    },

    insertPotion: async function(item_number,shop_id,spell_id,base_id,name,type,total_cost) {
        theQuery = `INSERT INTO Potion (Potion_ID,shop_id,Spell_ID,Potion_Base_ID,Potion_Name,Potion_type,Potion_cost) VALUES ` +
        `(${item_number},${shop_id},${spell_id},${base_id},"${name}","${type}",${total_cost})`;

        return await query(theQuery);
    },

    insertWandOrScroll: async function(item_number,shop_id,spell_id,class_id,name,type,cost) {
        theQuery = `INSERT INTO Wand_or_Scroll (Wand_or_Scroll_ID, shop_id, Spell_ID, Class_ID, Wand_or_Scroll_Name, Wand_or_Scroll_Type, Wand_or_Scroll_Cost) VALUES ` +
        `(${item_number},${shop_id},${spell_id},${class_id},"${name}","${type}",${cost})`;

        return await query(theQuery);
    }
}

module.exports = user_data_controller;