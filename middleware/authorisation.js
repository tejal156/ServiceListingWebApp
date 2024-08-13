const listingModel = require("../models/listing")  ;
const ReviewModel1 = require("../models/reviewModel") ;

module.exports.isOwnerOfListing = async(req,res,next)=>
{
    let { id } = req.params ;
    // const allListingsData =await listingModel.find({}) ;
    const dataById1 = await listingModel.findById(id) ;
    // console.log("authorisation.js page => listing owner :" , dataById1.owner._id , " current user : " , res.locals.currUsersKey  ) ;
    if(res.locals.currUsersKey && !dataById1.owner._id.equals(res.locals.currUsersKey._id))
    {
        req.flash( "errorKey" , "You are not a owner of listing") ;
        return res.redirect(`/allListings/${id}`) ;
        // r enter flash
    }
    // if( re)
    next() ;
}


module.exports.isOwnerOfReview = async(req,res,next)=>
{
    let { reviewId , id } = req.params ;
    // const allListingsData =await listingModel.find({}) ;
    const dataById1 = await ReviewModel1.findById(reviewId ) ;
    // console.log("authorisation.js for review middleware page => listing owner :" , dataById1.owner._id , " current user : " , res.locals.currUsersKey._id  ) ;
    
    if(res.locals.currUsersKey && !dataById1.owner._id.equals(res.locals.currUsersKey._id))
    {
        req.flash( "errorKey" , "You are not a author of review") ;
        return res.redirect(`/allListings/${id}`) ;
        // r enter flash
    }
    // if( re)
    next() ;
}