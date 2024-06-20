let user_data_controller = require('../controller/user_data_controller');

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/signin");
    },
    forwardAuthenticated: function (req, res, next) {
        if (! req.isAuthenticated()) {
            return next();
        }
        res.redirect("/welcome");
    },
    isAdmin: function (req, res, next) {
        if (req.isAuthenticated() && req.user.isAdmin==1)
        {
            return next();
        }
        else
        {
            res.redirect('/notAuthorizedAdmin');
        }
    },
    ensureUserOwnsShop: async function (req, res, next) {
        let shopId = Number(req.params.shopId);

        if (req.user == undefined) {
            res.redirect('/notYourShop');
        }

        let user_shop_ids = await user_data_controller.getShopIDsOwnedByUser(req.user.id);
        let user_owns_shop = false;

        user_shop_ids.forEach(shop => {
            if (Number(shop.shop_id) == shopId) {
                user_owns_shop = true;
            }
        })

        if (user_owns_shop) {
            return next()
        } else {
            res.redirect('/notYourShop');
        }
    }
}