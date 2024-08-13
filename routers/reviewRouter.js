const express = require("express") ;
const router = express.Router({ mergeParams:true}) ;

const wrapAsync = require("../utils/wrapAsync") ;

const {isLoggedIn } = require("../middleware/authenticationchking.js") ;
const {isOwnerOfReview} = require("../middleware/authorisation.js") ;

const reviewController = require("../controllers/reviewController.js") ;


router.delete("/:reviewId" , isLoggedIn, isOwnerOfReview, wrapAsync(reviewController.destroyReview ) );


router.post( "/" , isLoggedIn ,wrapAsync( reviewController.addReview))

module.exports = router ;
