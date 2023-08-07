const express = require('express');
const router  = express.Router();
const UserController = require('../controllers/userController');
const passport = require('passport');
router.get('/', (req,res)=>{
    //if the user is already signed in, redirect to userPage
    if(req.isAuthenticated()){
        return res.redirect('/userPage');
    }
    return res.render('signInPage',{
        title: "Sign In",
       
    });
});
//use passort as a middleware to authenticate
router.post('/signIn',passport.authenticate(
    'local',
    {failureRedirect:'/signInPage'}
), UserController.signIn);

//for google auth
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/singInPage'}), UserController.signIn);


module.exports = router;