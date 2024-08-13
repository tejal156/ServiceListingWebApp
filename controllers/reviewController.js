const ReviewModel1 = require("../models/reviewModel") ;
const listingModel = require("../models/listing")  ;
const  CustomizeExpression1 = require("../utils/expressError") ;

module.exports.destroyReview = async(req,res)=>
{
    let { id , reviewId } = req.params ;
    // ReviewModel1   listingModel
    let tempdata1 = await ReviewModel1.findByIdAndDelete(reviewId) ;
    let tempData2 = listingModel.findByIdAndUpdate(id , {$pull:{ reviews:reviewId}}) ;
    // console.log( "data for handling deletion of review :" , "ids :" , id , " ", reviewId , " " , tempdata1 , " " , tempData2) ;
    // res.send("form submitting is handle properly for path : /allListings/:id/review/:reviewId ") ;

    req.flash("successKey" , "Review deleted successfully") ;

    res.redirect(`/allListings/${id}`) ;
}

module.exports.addReview =  async (req,res,next)=>
{

        // console.log( "request body for review:" , req.body) ;
        let { rangeF3 , commentF3 } = req.body ;
        if( !rangeF3)
        {
            throw new CustomizeExpression1(400 , "range is missing") ;
        }
        else if(!commentF3)
        {
            throw new CustomizeExpression1(400 , "comment is missing") ;
        }
        else if(rangeF3<1 && rangeF3 >5 )
        {
            throw new CustomizeExpression1(400 , "enter valid rating") ;
        }

        // console.log("this line will work if data is added to database") ;
        let objTemp = { comment:commentF3 , rating:rangeF3 , owner : res.locals.currUsersKey} ;
        let tempReviewModel1 = new ReviewModel1(objTemp) ;


        let { id } = req.params ;

        let listingModelTemp =await listingModel.findById(id) ;
        // console.log( "listing document find by id for review:" , listingModelTemp) ;
        listingModelTemp.reviews.push(tempReviewModel1) ;

        await tempReviewModel1.save() ;
        await listingModelTemp.save() ;

        req.flash("successKey" , "review added successfully") ;

        // res.send("post request for review form go to right path succesfully") ;
        res.redirect(`/allListings/${id}`);


}