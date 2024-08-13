const express = require('express')
const router = express.Router()

const passport = require("passport") ;
const wrapAsync = require("../utils/wrapAsync") ;
const {isPrevPathMiddleware} = require("../middleware/authenticationchking") ;

const userController = require( "../controllers/userController") ;

router.route( "/signUp")
.get( wrapAsync( userController.renderSignupForm) )
.post(  wrapAsync( userController.signup)) 


router.route("/login")
.get(wrapAsync( userController.renderLoginForm))
.post( isPrevPathMiddleware ,
  passport.authenticate('local', { failureRedirect: '/user/login' , failureFlash:true}),
  wrapAsync(userController.login));


router.get("/logout" , userController.logout)

module.exports = router