const express = require('express');
const app = express();
const PORT = 8000;
//for cookies
const cookieParser = require('cookie-parser')
//Database using mongoose
const db = require('./config/mongoose');
//for storing passport encrypted id in cookies
const session = require('express-session');
//passport local
const passport = require('passport');
const passortLocal = require('./config/passport-local-strategy');
//for google auth
const passportGoogle = require('./config/passport-google-oauth2');
//for making session storage persitent at server
const MongoStore  = require('connect-mongo');
//for flash messages
const flash = require('connect-flash');
const flashMware = require('./config/flashMiddleware');
require('dotenv').config();

//middlewares
app.use('/assets', express.static('assets'));//Serve static files from the "public" directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//setting up views engine
app.set('view engine', 'ejs');
app.set('views', './views');

//using mongo store to store session cookie in the DB
app.use(session({
    name: 'NodeJsAuth',
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,//when the user is not logged in dont save data
    resave: false,//when the cookie already exist, no resave
    cookie: {
        maxAge: (1000*60*100)
    },
  
    //for mongostore
    store: MongoStore.create(
        {
        mongoUrl:process.env.MONGO_URL,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err|| "Connect-mongo setup ok");
    })
}));

app.use(passport.initialize());
app.use(passport.session());
//for every req made this middleware will be automcatically called, and it will set up
//the user info for locals, which we can use on page
app.use(passport.setAuthenticatedUser);

//using flash messages
app.use(flash());
app.use(flashMware.setFlash);

//use express router
app.use('/', require('./routes'));

app.listen(PORT, (err)=>{
    if(err) {
        console.log(`error starting the server ${err}`);
        return;
    }
    console.log(`started server on port : ${PORT}`);
});
