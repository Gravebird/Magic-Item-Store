const databaseController = require("./database_controller");
const data = require("./persistence_controller")[0];

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
    },
    viewShops: (req, res) => {
        res.render("shop/view-shops", {userId: req.user.id, shops: req.user.shops});
    },
    viewOneShop: (req, res) => {
        let userId = req.params.userId;
        let shopId = req.params.shopId;
        let shopToView = null;

        data.forEach(function(user) {
            if (user.id == userId) {
                user.shops.forEach(function(shop) {
                    if (shop.id == shopId) {
                        shopToView = shop;
                    }
                })
            }
        });

        if (shopToView != null) {
            res.render("shop/view-single-shop", {shop: shopToView});
        } else {
            console.log("ERROR: Unable to find shop to view in route_controller.js!");
            res.redirect("/welcome");
        }
    }
};

module.exports = routeController;