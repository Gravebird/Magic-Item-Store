const dnd_data_controller = require("./dnd_data_controller");
const weaponModel = require("../models/weaponModel");
const armorModel = require("../models/armorModel");
const user_data_controller = require("./user_data_controller");


function addFloats(x, y) {
    return (x * 100 + y * 100) / 100;
}


let shopGeneratorController = {
    generate: async function(req, res) {
        bodylist = JSON.parse(JSON.stringify(req.body));

        const shopName = bodylist["shopNameInput"];
        let sourceBooks = bodylist["booksInput"];
        let numItems = parseInt(bodylist["numItemsInShop"]);
        const minGold = parseInt(bodylist["minGoldValue"]);
        const maxGold = parseInt(bodylist["maxGoldValue"]);

        const weaponPercentage = parseInt(bodylist["weaponPercentage"]);
        const armorPercentage = parseInt(bodylist["armourPercentage"]) + weaponPercentage;
        const potionPercentage = parseInt(bodylist["potionPercentage"]) + armorPercentage;
        const scrollPercentage = parseInt(bodylist["scrollPercentage"]) + potionPercentage;
        const wandPercentage = parseInt(bodylist["wandPercentage"]) + scrollPercentage;
        const ringPercentage = parseInt(bodylist["ringPercentage"]) + wandPercentage;
        const rodPercentage = parseInt(bodylist["rodPercentage"]) + ringPercentage;
        const staffPercentage = parseInt(bodylist["staffPercentage"]) + rodPercentage;
        const wondrousItemPercentage = parseInt(bodylist["wondrousItemPercentage"]) + staffPercentage;
        const miscItemPercentage = parseInt(bodylist["miscItemPercentage"]) + wondrousItemPercentage;

        // console.log("Weapon: " + weaponPercentage);
        // console.log("Armor: " + armorPercentage);
        // console.log("Potion: " + potionPercentage);
        // console.log("Scroll: " + scrollPercentage);
        // console.log("Wand: " + wandPercentage);
        // console.log("Ring: " + ringPercentage);
        // console.log("Rod: " + rodPercentage);
        // console.log("Staff: " + staffPercentage);
        // console.log("Wondrous: " + wondrousItemPercentage);
        // console.log("Misc: " + miscItemPercentage);

        // We need to convert the selected book names into their IDs for the database

        if (sourceBooks == undefined) {
            console.log("Error: No books selected!");
            res.render("error/no_books_selected_error");
            return
        }

        let book_list = '';
        for (let i = 0; i < sourceBooks.length; i++) {
            book_list += '"' + sourceBooks[i] + '"';
            if (i + 1 < sourceBooks.length) {
                book_list += ',';
            }
        }
        book_list = await dnd_data_controller.getBookIDsFromNames(book_list);
        sourceBooks = '';
        
        for (let i = 0; i < book_list.length; i++) {
            sourceBooks += book_list[i].Book_ID;
            if (i + 1 < book_list.length) {
                sourceBooks += ',';
            }
        }
        console.log(sourceBooks);

        // sourceBooks now contains the ids of the selected books, in a format that we can use
        // to query the database. We no longer need the book_list variable...

        // Now we need to verify the shop name is not already in use by this user
        let userShops = await user_data_controller.getShopNamesOwnedByUser(req.user.id);

        for (let i = 0; i < userShops.length; i++) {
            if (userShops[i].Shop_Name == shopName) {
                // We have a duplicate - this is an error!
                console.log("Error: user with id " + req.user.id + " already has a shop named " + shopName);
                res.render("error/duplicate_shop_name_error", {user_id: req.user.id, shop_name: shopName});
                return
            }
        }


        // We insert a record into the shop table. Then we need to query for the shop_id,
        // so all items in the shop are kept related.
        // This function will insert the shop and then do a select query to get
        // the shop id, which it will return for us
        const [{shop_id}] = await user_data_controller.insertNewShop(req.user.id, shopName);
        // shop_id now contains the numerical shop id of this new shop, which we will use when we add items to the database.



        // Loop for as long as we still have items to generate
        while (numItems > 0) {

            // Randomly determine the type of item to generate
            let rng = Math.floor(Math.random() * 100);
            let item_number = 1;
            let item;
            let item_name;
            let item_type;
            let item_cost;
            let item_short_description = null;

            console.log("Loop: numItem = " + numItems);

            if (rng < weaponPercentage) {
                // Generate weapon
                console.log("Generating a weapon...");
                item = await weaponModel.generateWeaponItem(minGold, maxGold, item_number, sourceBooks);
                item_name = item.Weapon_Name;
                item_type = "Weapon";
                item_cost = item.Weapon_Cost_With_Properties;
                if (item.Weapon_Properties.length > 0) {
                    item_short_description = "";
                    for (let i = 0; i < item.Weapon_Properties.length; i++) {
                        item_short_description += "[" + item.Weapon_Properties[i].Property_Name + "] ";
                    }
                    for (let i = 0; i < item.Double_Weapon_Properties.length; i++) {
                        item_short_description += "[" + item.Double_Weapon_Properties[i].Property_Name + "] ";
                    }
                }
                
            } else if (rng < armorPercentage) {
                // Generate armor
                console.log("Generating an armor...");
                item = await armorModel.generateArmorItem(minGold, maxGold, item_number, sourceBooks);
                item_name = item.Armor_Name;
                item_type = "Armor";
                item_cost = item.Armor_Cost_With_Properties;
                if (item.Armor_Properties.length > 0) {
                    item_short_description = "";
                    for (let i = 0; i < item.Armor_Properties.length; i++) {
                        item_short_description += "[" + item.Armor_Properties[i].Property_Name + "] ";
                    }
                }
            } else if (rng < potionPercentage) {
                // Generate potion
                console.log("Generating a potion...");
                [item] = await dnd_data_controller.getRandomPotion(minGold, maxGold, sourceBooks);
                item_name = "Potion (" + item.Potion_Name + ")";
                item_type = "Potion";
                item_cost = item.Potion_Cost;
                item_short_description = item.Spell_Short_Description;
            } else if (rng < scrollPercentage) {
                // Generate scroll
                console.log("Generating a scroll...");
                [item] = await dnd_data_controller.getRandomScroll(minGold, maxGold, sourceBooks);
                item_name = item.Class_Name + " Scroll (" + item.Spell_Name + ")";
                item_type = "Scroll";
                item_cost = item.Scroll_Total_Cost;
                item_short_description = item.Spell_Short_Description;
            } else if (rng < wandPercentage) {
                // Generate wand
                console.log("Generating a wand...");
                [item] = await dnd_data_controller.getRandomWand(minGold, maxGold, sourceBooks);
                item_name = item.Class_Name + " Wand (" + item.Spell_Name + ")";
                item_type = "Wand";
                item_cost = item.Wand_Total_Cost;
                item_short_description = item.Spell_Short_Description;
            } else if (rng < ringPercentage) {
                // Generate ring
                console.log("Generating a ring...");
                [item] = await dnd_data_controller.getRandomRing(minGold, maxGold, sourceBooks);
                item_name = "Ring of " + item.Ring_Name;
                item_type = "Ring";
                item_cost = item.Ring_Cost;
            } else if (rng < rodPercentage) {
                // Generate rod
                console.log("Generating a rod...");
                [item] = await dnd_data_controller.getRandomRod(minGold, maxGold, sourceBooks);
                item_name = "Rod of " + item.Rod_Name;
                item_type = "Rod";
                item_cost = item.Rod_Cost;
            } else if (rng < staffPercentage) {
                // Generate staff
                console.log("Generating a staff...");
                [item] = await dnd_data_controller.getRandomStaff(minGold, maxGold, sourceBooks);
                item_name = item.Staff_Name;
                item_type = "Staff";
                item_cost = item.Staff_Cost;
            } else if (rng < wondrousItemPercentage) {
                // Generate wondrous item
                console.log("Generating a wondrous item...");
                [item] = await dnd_data_controller.getRandomWondrousItem(minGold, maxGold, sourceBooks);
                item_name = item.Magic_Item_Name;
                item_type = "Wondrous Item";
                item_cost = item.Magic_Item_Cost;
            } else if (rng < miscItemPercentage) {
                // Generate misc item
                console.log("Generating a misc item...");
                [item] = await dnd_data_controller.getRandomMiscItem(minGold, maxGold, sourceBooks);
                item_name = item.Misc_Item_Name;
                item_type = item.Misc_Item_Type;
                item_cost = item.Misc_Item_Cost;
            } else {
                // ERROR we should not be able to reach this, it means that the percentages were not set correctly.
                console.log("ERROR: Unexpected item percentage in shop_generator_controller - generate");
            }

            // console.log("***********************************************");
            // console.log(item_name);
            // console.log(item_type);
            // console.log(item_cost);
            // console.log(item_short_description);
            // console.log("***********************************************");


            item_number += 1;

            numItems -= 1;
            
            await user_data_controller.insertNewItem(shop_id,item_name,item_type,item_cost,item_short_description,JSON.stringify(item));
        }
        



        // TEMPORARY REDIRECT
        res.redirect("/welcome");
    }
}


module.exports = shopGeneratorController;