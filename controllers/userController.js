const User = require('../models/user');
const passport = require('passport');
//for password encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.signUp = async(req,res)=>{
    try{   
        const {name, email, password, confirmPassword} = req.body;
        
        //check if password and confirmPassword are equal
        if(password !== confirmPassword){
            req.flash('error', 'Passwords do not match');
            res.redirect('/signUpPage');
        }
        //check if the user exist
        const existingUser = await User.findOne({email:email});
        if(existingUser) {
            req.flash('error', 'User already exist, try a different email');
            res.redirect('/signUpPage');
        }
        //encrypt the password       
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        
        //create user
        const newUser = await User.create({
            name ,
            email,
            password: hashPassword, 

        });
        
        if(newUser){ 
            req.flash('success', 'User created successfully');
            return res.redirect('/signInPage');
        }
        
        
        

    }catch(err){
        console.log(`error in creating new user ${err}`);
        req.flash('error', 'Something went wrong!!');
        
    }
}

module.exports.signIn = async(req,res)=>{
    req.flash('success','Signed in successfully');
    return res.redirect('/userPage');
}

module.exports.userPage = async (req,res)=>{
    res.render('userPage', {
        title: "User Page",
    }); 
}

//for signOut
module.exports.signOut = async (req, res)=>{
    req.flash('success','Signed out successfully');
    //given by passport
    req.logout(function(err){if(err){console.log(err)}});
    res.redirect('/');
}

//reset password page
module.exports.resetPasswordPage= async (req,res)=>{
    if(!(req.isAuthenticated())){
        return res.redirect('/');
    }
    let user= await User.findById(req.user.id);
    //if user is google register user they can not change password
    console.log(user);
    if(user.isGoogle){
        console.log(user.isGoogle)
        req.flash('error',"Google Users can not reset password");
        return res.redirect('/userPage');
    }
    res.render('resetPasswordPage',{
        title:"Reset Password"
    });
}

//reset password
module.exports.reset = async (req, res)=>{
    const {oldPassword, newPassword, confirmPassword} = req.body;
    if(newPassword !== confirmPassword){
        req.flash('error', 'Passwords do not match');
        return res.redirect('/userPage/resetPasswordPage');
    }
    const userData = await User.findById(req.user.id);
    //check old pass
    if(!(bcrypt.compare(oldPassword, userData.password ))){
        req.flash('error', 'Incorrect Password');
        return res.redirect('/userPage/resetPasswordPage');
    }
    // Update the password in the database
    const newHash = bcrypt.hashSync(newPassword, saltRounds);
    await User.findByIdAndUpdate(req.user.id, { password: newHash });
    req.flash('success', 'Passwords reset successfull');
    res.redirect('/userPage');
}