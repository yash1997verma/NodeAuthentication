const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const passport = require('passport');



//we created checkAuthentication in local strategy, which we are using here
router.get('/',passport.checkAuthentication, UserController.userPage);

//for signOut
router.get('/signOut', UserController.signOut);

//for reset password
router.get('/resetPasswordPage', UserController.resetPasswordPage)
//reset pass
router.post('/reset', UserController.reset);

module.exports = router;