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

    getShopIDsOwnedByUser: async function(user_id) {
        theQuery = `SELECT shop_id FROM shop WHERE user_id = ${user_id}`;
        return await query(theQuery);
    },

    getShopName: async function(shop_id) {
        theQuery = `SELECT shop_name FROM shop WHERE shop_id = ${shop_id}`;
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

    getArmorInShop: async function(shop_id) {
        theQuery = `SELECT Armor_ID, Armor_Name, Armor_Total_Cost, Armor_Property_Summary ` +
        `FROM Armor WHERE shop_id = ${shop_id}`;
        return await query(theQuery);
    },

    getWeaponsInShop: async function(shop_id) {
        theQuery = `SELECT Weapon_ID, Weapon_Name, Weapon_Total_Cost, Weapon_Property_Summary ` +
        `FROM Weapon WHERE shop_id = ${shop_id}`;
        return await query(theQuery);
    },

    getSingleWeaponDetails: async function(shop_id, weapon_id) {
        theQuery = `SELECT Weapon_Name, Weapon_Category, Weapon_Type, Weapon_Total_Cost, Weapon_Weight, Weapon_Range_Increment, Weapon_Small_Damage, Weapon_Medium_Damage, Weapon_Critical, Weapon_Damage_Type, Weapon_Description ` +
        `FROM Weapon WHERE shop_id = ${shop_id} AND Weapon_ID = ${weapon_id}`;

        return await query(theQuery);
    },

    getSingleWeaponMaterial: async function(shop_id, weapon_id) {
        theQuery = `SELECT Property_Name, Property_Description FROM Weapon_Property ` +
        `WHERE shop_id = ${shop_id} AND Weapon_ID = ${weapon_id} AND Property_is_Material = 1`;
        return await query(theQuery);
    },

    getSingleWeaponProperties: async function(shop_id, weapon_id, double_sided) {
        theQuery = `SELECT Property_Name, Property_Description FROM Weapon_Property ` +
        `WHERE shop_id = ${shop_id} AND Weapon_ID = ${weapon_id} AND Property_is_Material = 0 AND Property_Double_Sided = ${double_sided}`;
        return await query(theQuery);
    },

    getSingleArmorDetails: async function(shop_id, armor_id) {
        theQuery = `SELECT Armor_Name, Armor_Category, Armor_Total_Cost, Armor_Weight, Armor_Max_Dex, Armor_30_Speed, Armor_20_Speed, Armor_Base_AC_Bonus, Armor_Check_Penalty, Armor_Spell_Failure, Armor_Description ` +
        `FROM Armor WHERE shop_id = ${shop_id} AND Armor_ID = ${armor_id}`;
        return await query(theQuery);
    },

    getSingleArmorMaterial: async function(shop_id, armor_id) {
        theQuery = `SELECT Property_Name, Property_Description FROM Armor_Property ` +
        `WHERE shop_id = ${shop_id} AND Armor_ID = ${armor_id} AND Property_is_Material = 1`;
        return await query(theQuery);
    },

    getSingleArmorProperties: async function(shop_id, armor_id) {
        theQuery = `SELECT Property_Name, Property_Description FROM Armor_Property ` +
        `WHERE shop_id = ${shop_id} AND Armor_ID = ${armor_id} AND Property_is_Material = 0`;
        return await query(theQuery);
    },

    getSinglePotionDetails: async function(shop_id, potion_id) {
        theQuery = `SELECT Potion_name, Potion_type, Potion_cost, Spell_ID FROM Potion ` +
        `WHERE shop_id = ${shop_id} AND Potion_ID = ${potion_id}`;
        return await query(theQuery);
    },

    getSingleWandOrScrollDetails: async function(shop_id, wand_or_scroll_id) {
        theQuery = `SELECT Wand_or_Scroll_Name, Wand_or_Scroll_Type, Wand_or_Scroll_Cost, Class_ID, Spell_ID ` +
        `FROM Wand_or_Scroll WHERE shop_id = ${shop_id} AND Wand_or_Scroll_ID = ${wand_or_scroll_id}`;
        return await query(theQuery);
    },

    getSingleMagicItemDetails: async function(shop_id, magic_item_id) {
        theQuery = `SELECT Magic_Item_Name, Magic_Item_Type, Magic_Item_Cost, Magic_Item_Caster_Level, Magic_Item_Aura, Magic_Item_Description ` +
        `FROM Magic_Item WHERE shop_id = ${shop_id} AND Magic_Item_ID = ${magic_item_id}`;
        return await query(theQuery);
    },

    getSingleMiscItemDetails: async function(shop_id, misc_item_id) {
        theQuery = `SELECT Misc_Item_Name, Misc_Item_Type, Misc_Item_Cost, Misc_Item_Weight, Misc_Item_Description ` +
        `FROM Misc_Item WHERE shop_id = ${shop_id} AND Misc_Item_ID = ${misc_item_id}`;
        return await query(theQuery);
    },

    getWondrousItemsInShop: async function(shop_id) {
        theQuery = `SELECT Magic_Item_ID, Magic_Item_Name, Magic_Item_Cost ` +
        `FROM Magic_Item WHERE shop_id = ${shop_id} AND Magic_Item_Type = "Wondrous Item"`;
        return await query(theQuery);
    },

    getRingsInShop: async function(shop_id) {
        theQuery = `SELECT Magic_Item_ID, Magic_Item_Name, Magic_Item_Cost ` +
        `FROM Magic_Item WHERE shop_id = ${shop_id} AND Magic_Item_Type = "Ring"`;
        return await query(theQuery);
    },

    getRodsInShop: async function(shop_id) {
        theQuery = `SELECT Magic_Item_ID, Magic_Item_Name, Magic_Item_Cost ` +
        `FROM Magic_Item WHERE shop_id = ${shop_id} AND Magic_Item_Type = "Rod"`;
        return await query(theQuery);
    },

    getStaffsInShop: async function(shop_id) {
        theQuery = `SELECT Magic_Item_ID, Magic_Item_Name, Magic_Item_Cost ` +
        `FROM Magic_Item WHERE shop_id = ${shop_id} AND Magic_Item_Type = "Staff"`;
        return await query(theQuery);
    },

    getMiscItemsInShop: async function(shop_id) {
        theQuery = `SELECT Misc_Item_ID, Misc_Item_Name, Misc_Item_Type, Misc_Item_Cost ` +
        `FROM Misc_Item WHERE shop_id = ${shop_id}`;
        return await query(theQuery);
    },

    getPotionsInShop: async function(shop_id) {
        theQuery = `SELECT Potion_ID, Potion_Name, Potion_Type, Potion_Cost ` +
        `FROM Potion WHERE shop_id = ${shop_id}`;
        return await query(theQuery);
    },

    getWandsInShop: async function(shop_id) {
        theQuery = `SELECT Wand_or_Scroll_ID, Wand_or_Scroll_Name, Wand_or_Scroll_Cost ` +
        `FROM Wand_or_Scroll WHERE shop_id = ${shop_id} AND Wand_or_Scroll_Type = "Wand"`;
        return await query(theQuery);
    },

    getScrollsInShop: async function(shop_id) {
        theQuery = `SELECT Wand_or_Scroll_ID, Wand_or_Scroll_Name, Wand_or_Scroll_Cost ` +
        `FROM Wand_or_Scroll WHERE shop_id = ${shop_id} AND Wand_or_Scroll_Type = "Scroll"`;
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
    },

    deleteShop: async function(shopId) {
        theQuery = `CALL up_delete_shop (${shopId});`;

        return await query(theQuery);
    }
}

module.exports = user_data_controller;