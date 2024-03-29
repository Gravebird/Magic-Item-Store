const dnd_data_controller = require("./dnd_data_controller");

// Importing weapon and armor models for testing - delete these after testing is complete
const armorModel = require('../models/armorModel');
const weaponModel = require('../models/weaponModel');



let routeController = {
    welcome: (req, res) => {
        let name = null;
        if (req.user != null) {
            name = req.user.username;
        }
        res.render("generic/welcome", {user: name});
    },

    shop_generator_form: async function (req, res) {
        book_list = await dnd_data_controller.getBooks();
        res.render("shop_generator/shop_generator", {books: book_list});
    },

    test: async function (req, res) {
        let armorItem = await armorModel.generateArmorItem(0,100000,1,"1,2");
        console.log(armorItem);
        let weaponItem = await weaponModel.generateWeaponItem(0,100000,1,"1,2");
        console.log(weaponItem);
        // if (req.user != undefined) {
        //     console.log("User: " + req.user.username + ", id: " + req.user.id);
        // }
        book_list = await dnd_data_controller.getBooks();
        res.render("generic/test", {books: book_list});
    }
}

module.exports = routeController;