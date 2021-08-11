const databaseController = require("./database_controller");

let routeController = {
    welcome: (req, res) => {
        res.render("shop/welcome");
    },

    test: (req, res) => {
        databaseController.connect();
        let rows = databaseController.test();
        databaseController.end();
        res.render("test/test", {result: rows});
    }
};

module.exports = routeController;