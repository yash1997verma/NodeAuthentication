const express = require('express');
const router  = express.Router();
const UserController = require('../controllers/userController');

router.get('/', (req,res)=>{
    //if the user is already signed in, redirect to userPage
    if(req.isAuthenticated()){
        return res.redirect('/userPage');
    }
    
    return res.render('signUpPage',{
        title: "Sign Up",       
    });
});

router.post('/signUp', UserController.signUp);


module.exports = router;