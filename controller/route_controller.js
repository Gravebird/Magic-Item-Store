const databaseController = require("./database_controller");

let routeController = {
    welcome: (req, res) => {
        let name = null;
        if (req.user != null) {
            name = req.user.username;
        }
        res.render("shop/welcome", {user: name});
    },
    shopGenerator: (req, res) => {
        res.render("shop/shop_generator");
    }
};

module.exports = routeController;