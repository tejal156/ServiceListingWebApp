const express = require("express") ;
const router = express.Router({ mergeParams:true}) ;

const wrapAsync = require("../utils/wrapAsync") ;
const listingModel = require("../models/listing")  ;
// const UserModel = require("../userModel.js") ;
const mongoose = require('mongoose');

const {isLoggedIn} = require("../middleware/authenticationchking.js") ;

const  CustomizeExpression1 = require("../utils/expressError") ;
const { isOwnerOfListing } = require("../middleware/authorisation.js") ;

const listingController = require("../controllers/listingController.js") ;

if( process.env.NODE_ENV != "production")
{
    require('dotenv').config() ;
    // console.log(  "process.env =>",process.env) 
    console.log(process.env.CLOUD_NAME, process.env.CLOUD_API_KEY, process.env.CLOUD_API_SECRETE);

}

const multer  = require('multer')
// console.log(process.env.CLOUD_NAME, process.env.CLOUD_API_KEY, process.env.CLOUD_API_SECRET);
const { storage } = require("../cloudConfig.js") ;
const upload = multer({ storage  })
// it is middleware used to handle parsing of file


// display all listing
router.route("/")
.get( wrapAsync( listingController.renderAllListings_Page))
.post( isLoggedIn , upload.single('image_url1') , wrapAsync(listingController.addListing)) 

// used for create new listing
router.route( "/new" )
.get( isLoggedIn ,  wrapAsync(listingController.renderForm_ForAddListing ))


// display list of given id
router.route( "/:id" )
.get( wrapAsync( listingController.renderListing_ByIdPage))
.delete( isOwnerOfListing ,  isLoggedIn, wrapAsync( listingController.deleteListing))
.put( isLoggedIn , upload.single('image_url1') , isOwnerOfListing , wrapAsync(listingController.editListing))



router.route("/:id/edit")
.get( isLoggedIn , isOwnerOfListing , wrapAsync( listingController.renderEditForm_ForListing))




module.exports = router ;


