const dnd_data_controller = require("./dnd_data_controller");
const user_data_controller = require("./user_data_controller");

// Importing weapon and armor models for testing - delete these after testing is complete
const armorModel = require('../models/armorModel');
const weaponModel = require('../models/weaponModel');



function organizeShopData(shops_list, user_name, user_id) {
    let shops_data = {
        username: user_name,
        userId: user_id,
        shops: shops_list
    }

    return shops_data;
}


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

    view_shops: async function (req, res) {
        let user_shops = await user_data_controller.getShopDetailsByUser(req.user.id);
        let [user_name] = await user_data_controller.getUserName(req.user.id);
        user_shops = organizeShopData(user_shops, user_name.username, req.user.id);
        res.render("shop_generator/view_shops", user_shops);
    },

    viewOneShop: async function (req, res) {
        let userId = req.params.userId;
        let shopId = req.params.shopId;
        let shopToView = null;
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