const dnd_data_controller = require("./dnd_data_controller");
const weaponModel = require("../models/weaponModel");



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
        let [baseWeapon] = await dnd_data_controller.getRandomBaseWeapon();
        console.log(baseWeapon);
        let weaponProps = await weaponModel.getWeaponBonuses(baseWeapon, 2000, 10000)
        console.log(weaponProps);
        book_list = await dnd_data_controller.getNonCoreBooks();
        res.render("generic/test", {books: book_list});
    }
}

module.exports = routeController;