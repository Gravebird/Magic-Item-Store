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

            if (rng < weaponPercentage) {
                // Generate weapon
                console.log("Generating a weapon...");
                [item] = await weaponModel.generateWeaponItem(minGold, maxGold, item_number, sourceBooks);
                console.log(item);
            } else if (rng < armorPercentage) {
                // Generate armor
                console.log("Generating an armor...");
                [item] = await armorModel.generateArmorItem(minGold, maxGold, item_number, sourceBooks);
                console.log(item);
            } else if (rng < potionPercentage) {
                // Generate potion

            } else if (rng < scrollPercentage) {
                // Generate scroll

            } else if (rng < wandPercentage) {
                // Generate wand

            } else if (rng < ringPercentage) {
                // Generate ring

            } else if (rng < rodPercentage) {
                // Generate rod

            } else if (rng < staffPercentage) {
                // Generate staff

            } else if (rng < wondrousItemPercentage) {
                // Generate wondrous item

            } else if (rng < miscItemPercentage) {
                // Generate misc item

            } else {
                // ERROR we should not be able to reach this, it means that the percentages were not set correctly.
                console.log("ERROR: Unexpected item percentage in shop_generator_controller - generate");
            }
            //console.log(item);
            item_number += 1;

            numItems -= 1;
        }
        



        // TEMPORARY REDIRECT
        res.redirect("/welcome");
    }
}


module.exports = shopGeneratorController;