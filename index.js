const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const routeController = require("./controller/route_controller");

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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(ejsLayouts);
app.set("view engine", "ejs");

// Routes
app.get("/welcome", routeController.welcome);

app.get("/test", routeController.test);

module.exports = app
