const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const passport = require("./middleware/passport");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, forwardAuthenticated } = require("./middleware/checkAuth");
const routeController = require("./controller/route_controller");
const databaseController = require("./controller/database_controller");
const shopGeneratorController = require("./controller/shop_generator_controller");

// This starts a session
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(ejsLayouts);
app.set("view engine", "ejs");

// Routes
app.get("/", routeController.welcome);

app.get("/welcome", routeController.welcome);

app.get("/view-shops", ensureAuthenticated, routeController.viewShops);

app.get("/view/:userId/:shopId", routeController.viewOneShop);

app.get("/spells", async function(req, res, next){
  let results = await databaseController.test();
  /* console.log("AFTER EXITING FUNCTION:");
  for (const property in results) {
    console.log(property);
    console.log(results[property]);
  }
  const temp = results[0];
  console.log(temp.Spell_Short_Description); */
  res.render("test/test", {result: results});
});

app.get("/shop_generator", ensureAuthenticated, routeController.shopGenerator);

app.post("/shop_generator", ensureAuthenticated, shopGeneratorController.generate);

app.get("/test", async function(req, res, next) {
  let results = await databaseController.getWeaponIdsUnderGoldCost(5, "Common");
  console.log(results);
  res.redirect("/welcome");
})

// Passport Routes

app.get("/register", forwardAuthenticated, authController.register);

app.post("/register", forwardAuthenticated, authController.registerSubmit);

app.get("/signin", forwardAuthenticated, (req, res) => {
  res.render("auth/signin");
});

app.post("/signin", forwardAuthenticated, passport.authenticate("local", {
  successRedirect: "/welcome",
  failureRedirect: "/signin"
}));

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/welcome");
})

module.exports = app
