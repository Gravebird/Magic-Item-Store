const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const crypto=require('crypto');
const path = require("path");
const ejsLayouts = require('express-ejs-layouts')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);


const { ensureAuthenticated, forwardAuthenticated, isAdmin } = require("./middleware/checkAuth");
const routeController = require("./controller/route_controller");
const shopGeneratorController = require("./controller/shop_generator_controller");

require("dotenv").config();


app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new MySQLStore({
        host: process.env.COOKIE_DB_HOST,
        port: process.env.COOKIE_DB_PORT,
        user: process.env.COOKIE_DB_USER,
        database: process.env.COOKIE_DB_NAME,
        password: process.env.COOKIE_DB_PASSWORD
    }),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000*60*60*24,

    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
    extended: false
}));
app.use(ejsLayouts);
app.set("view engine", "ejs");


// Routes

app.get("/", routeController.welcome);

app.get("/welcome", routeController.welcome);

app.get("/shop_generator", ensureAuthenticated, routeController.shop_generator_form);

app.get("/view-shops", ensureAuthenticated, routeController.view_shops);

app.get("/view-shop/:userId/:shopId", routeController.viewOneShop);

app.get("/view-single-weapon/:shopId/:weaponId", routeController.viewSingleWeapon);

app.post("/shop_generator", ensureAuthenticated, shopGeneratorController.generate);

app.get("/test", routeController.test);




// Auth routes

app.get('/signin', forwardAuthenticated, (req, res) => {
    res.render('auth/signin');
})

app.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout(); // deletes the user from the session
    res.render('generic/welcome', {user: null});
})

app.get('/register', forwardAuthenticated, (req, res) => {
    console.log("Inside Get /register");
    res.render('auth/register');
})

app.post('/register', forwardAuthenticated, userExists,(req,res) => {
    console.log("Inside post /register");
    console.log(req.body.pw);
    const saltHash=genPassword(req.body.pw);
    console.log(saltHash);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    connection.query('Insert into users(username,hash,salt,isAdmin) values(?,?,?,0) ', [req.body.uname,hash,salt], function(error, results, fields) {
        if (error)
        {
            console.log("Error");
        }
        else
        {
            console.log("Successfully Entered");
        }
    });
    res.redirect('/signin');
});

app.post('/signin', forwardAuthenticated, passport.authenticate('local',{failureRedirect:'/signin',successRedirect:'/welcome'}));

app.get('/userAlreadyExists', (req,res,next) => {
    console.log("Inside get /userAlreadyExists");
    res.send('<h1>Sorry this username is taken </h1><p><a href="/register">Register with a different username</a></p>');
});




// PASSPORT JS

var connection = mysql.createConnection({
    host: process.env.USER_DATA_DB_HOST,
    user: process.env.USER_DATA_DB_USER,
    database: process.env.USER_DATA_DB_NAME,
    password: process.env.USER_DATA_DB_PASSWORD,
    multipleStatements: true
});
connection.connect((err) => {
    if (!err) {
        console.log("Connected to MIS_User_Data");
    } else {
        console.log("Connection to MIS_User_Data Failed");
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
});

const customFields={
    usernameField:'uname',
    passwordField:'pw',
};


const verifyCallback=(username,password,done)=>{

    connection.query('SELECT * FROM users WHERE username = ?', [username], function(error, results, fields) {
        if (error)
            return done(error);
        
            if(results.length==0)
            {
                return done(null,false);
            }
            const isValid=validPassword(password,results[0].hash,results[0].salt);
            user={id:results[0].id,username:results[0].username,hash:results[0].hash,salt:results[0].salt};
            if(isValid)
            {
                return done(null,user);
            }
            else
            {
                return done(null,false);
            }
    });
}

const strategy=new LocalStrategy(customFields,verifyCallback);
passport.use(strategy);


passport.serializeUser((user,done)=>{
    console.log("inside serialize");
    done(null,user.id)
});


passport.deserializeUser(function(userId,done){
    console.log('deserializeUser'+userId);
    connection.query('SELECT * FROM users WHERE id = ?',[userId], function(error, results) {
        done(null,results[0]);
    });
});


/*middleware*/
function validPassword(password,hash,salt)
{
    var hashVerify=crypto.pbkdf2Sync(password,salt,10000,60,'sha512').toString('hex');
    return hash === hashVerify;
}

function genPassword(password)
{
    var salt=crypto.randomBytes(32).toString('hex');
    var genhash=crypto.pbkdf2Sync(password,salt,10000,60,'sha512').toString('hex');
    return {salt:salt,hash:genhash};
}


function userExists(req,res,next)
{
    connection.query('Select * from users where username = ?', [req.body.uname], function(error, results, fields) {
        if (error)
        {
            console.log('Error');
        }
        else if (results.length > 0)
        {
            res.redirect('/userAlreadyExists')
        }
        else
        {
            next();
        }
    })
}



module.exports = app;