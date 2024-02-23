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
        const armorPercentage = parseInt(bodylist["armourPercentage"]);
        const potionPercentage = parseInt(bodylist["potionPercentage"]);
        const scrollPercentage = parseInt(bodylist["scrollPercentage"]);
        const wandPercentage = parseInt(bodylist["wandPercentage"]);
        const ringPercentage = parseInt(bodylist["ringPercentage"]);
        const rodPercentage = parseInt(bodylist["rodPercentage"]);
        const staffPercentage = parseInt(bodylist["staffPercentage"]);
        const wondrousItemPercentage = parseInt(bodylist["wondrousItemPercentage"]);
        const miscItemPercentage = parseInt(bodylist["miscItemPercentage"]);

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
            if (userShops[i].Shop_Name = shopName) {
                // We have a duplicate - this is an error!
                res.render("error/duplicate_shop_name_error", {user_id: req.user.id, shop_name: shopName});
                return
            }
        }


        // We insert a record into the shop table. Then we need to query for the shop_id,
        // so all items in the shop are kept related.
        await user_data_controller.insertNewShop(req.user.id, shopName);



        // TEMPORARY REDIRECT
        res.redirect("/welcome");
    }
}


module.exports = shopGeneratorController;