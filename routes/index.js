const express = require('express');
const router  = express.Router();


//home page
router.get('/', (req,res)=>{
    //if the user is already signed in, redirect to userPage
    if(req.isAuthenticated()){
        return res.redirect('/userPage');
    }
    return res.render('home',{
        title: "NodeJs Authentication",
       
    });
    
});

//for signUp
router.use('/signUpPage', require('./signUp'));

//for signIn
router.use('/signInPage', require('./signIn'))

//for userPage
router.use('/userPage', require('./userPage'))





module.exports = router;