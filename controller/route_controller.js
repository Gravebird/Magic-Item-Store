const databaseController = require("./database_controller");

let routeController = {
    welcome: (req, res) => {
        res.render("shop/welcome");
    }
};

module.exports = routeController;