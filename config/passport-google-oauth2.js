const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
require('dotenv').config();
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: process.env.client_id,
        clientSecret: process.env.client_secret,
        callbackURL: process.env.callback_url
    },
    async function(excessToken, refreshToken, profile, done ){
        try{
            //find the user, with google login details, in out DB
        const user = await User.findOne({email: profile.emails[0].value});
        

        //if user is found in our DB, set user as req.user
        if(user){
            return done(null, user);
        }
        //if not found create user and set user as req.user
        else{
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
                isGoogle: true
            });
           

            return done(null, newUser);
        }
        }catch(err){
            console.log(`error in google login ${err}`);
        }
    
    }
));



module.exports = passport;