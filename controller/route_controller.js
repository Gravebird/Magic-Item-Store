const databaseController = require("./database_controller");

let routeController = {
    welcome: (req, res) => {
        res.render("shop/welcome");
    },
    shopGenerator: (req, res) => {
        res.render("shop/shop_generator");
    }
};

module.exports = routeController;