const dnd_data_controller = require("./dnd_data_controller");
const armorModel = require('../models/armorModel');



let routeController = {
    welcome: (req, res) => {
        let name = null;
        if (req.user != null) {
            name = req.user.username;
        }
        res.render("generic/welcome", {user: name});
    },

    shop_generator_form: async function (req, res) {
        book_list = await dnd_data_controller.getNonCoreBooks();
        res.render("shop_generator/shop_generator", {books: book_list});
    },

    test: async function (req, res) {
        let armorItem = await armorModel.generateArmorItem(10,10000,1,"1,2,3,4");
        console.log(armorItem);
        book_list = await dnd_data_controller.getNonCoreBooks();
        res.render("generic/test", {books: book_list});
    }
}

module.exports = routeController;