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
    }
}