const passport = require('passport');
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    async function(req, email, password, done){
        try{
            //find a user and establish the identity
            const user = await User.findOne({email: email });
            if(!user || ! await bcrypt.compare(password, user.password)){
                // console.log(`Invalid username/password`);
                req.flash('error', 'Invalid username/password')
                return done(null,false);
            }
            return done(null, user);
        }catch(err){
            // console.log(`error in finding the user ${err}`);
            // req.flash('error', err)
            return done(err);
        }

        

    }
));

//serelizing the user to decide which key is to be kept in the cookies
//this will automatically encrypt the id and store in cookie which is sent to the browser
//express session helps in storing this cookie
passport.serializeUser(function(user, done){
    //"user" has all the info of user making request
    //bcz we already found the user associated with email above in .use
    done(null, user.id)
});

//deserializing the user from the key in the cookies
//when the browser sents cookie in req
passport.deserializeUser( async function(id, done){
   try{
    const user = await User.findById(id);
    return done(null, user);

   }catch(err){
    console.log(`error in finding the user ${err}`);
    return done(err);
   }
});

//Note: isAuthenticated is a built in fn in passport
//check req user sign in or not 
passport.checkAuthentication=function(req,res,next){
    //if the user is signedIn then pass the req, to next(), i.e controller or action
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in , redirect to homePage
    return res.redirect('/');
}

//set user in locals for views
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the signed in users info, to be used, to show user details
        res.locals.user=req.user;
    }
    next();
}


module.exports = passport;
