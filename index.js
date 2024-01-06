const express =  require("express") ;
const mongoose = require('mongoose');
const listingModel = require("./models/listing")  ;
const app = express() ;
const portNo = 8080 ;
const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust" ;
const path = require("path") ;
app.set("view engin" , "ejs" ) ;
app.set("views" , path.join( __dirname , "views")) ;
app.use(express.urlencoded({extended:true})) ;
const methodOverride = require("method-override") ;
app.use( methodOverride('_method')) ;
const ejsMate = require('ejs-mate') ;
app.engine('ejs', ejsMate);
app.use( express.static(path.join(__dirname , "/public"))) ;
const wrapAsync = require("./utils/wrapAsync") ;
const  CustomizeExpression1 = require("./utils/expressError") ;
const ReviewModel1 = require("./models/reviewModel") ;

let initialize1 =  async () =>{
    mongoose.connect(mongoUrl);
};

app.listen( portNo , ()=>
{
    console.log(`Port is listening on port ${portNo}`) ;
});

initialize1()
.then( ()=>
{
    console.log("Connection has made!") ;
})
.catch((err)=>{
    console.log("There is a error") ;
});

app.get( "/allListings" , wrapAsync( async (req,res)=>
{
    const allListingsData =await listingModel.find({}) ;

    res.render("listing_data/displayLista.ejs" , {allListingsDataKey : allListingsData }) ;
}))

app.get( "/allListings/new" ,  wrapAsync(async (req,res,next)=>
{
    // const allListingsData =await listingModel.find({}) ;
        res.render("listing_data/formAddInfo.ejs") ;

    
}))

// display list of given id
app.get( "/allListings/:id" , wrapAsync( async (req,res,next)=>
{
    let { id } = req.params ;
    // const allListingsData =await listingModel.find({}) ;
    const dataById = await listingModel.findById(id).populate("reviews") ;
    
    if( !dataById.title)
    {
        next( new CustomizeExpression1(400 , "Information is not available")) ;
    }
    else
    {
        // console.log("data sent to showbyid.ejs :" , dataById) ;
        res.render("listing_data/showById.ejs" , {DataKey : dataById }) ;
    }

    
}))

app.post( "/allListings/:id/review" , wrapAsync( async (req,res,next)=>
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
        let objTemp = { comment:commentF3 , rating:rangeF3} ;
        let tempReviewModel1 = new ReviewModel1(objTemp) ;
        let { id } = req.params ;

        let listingModelTemp =await listingModel.findById(id) ;
        // console.log( "listing document find by id for review:" , listingModelTemp) ;
        listingModelTemp.reviews.push(tempReviewModel1) ;

        await tempReviewModel1.save() ;
        await listingModelTemp.save() ;

        // res.send("post request for review form go to right path succesfully") ;
        res.redirect(`/allListings/${id}`);


}))

app.get( "/allListings/:id/edit" , wrapAsync( async (req,res)=>
{
    let { id } = req.params ;
    // const allListingsData =await listingModel.find({}) ;
    const dataById1 = await listingModel.findById(id) ;

    res.render("listing_data/edit.ejs" , {DataKey : dataById1 }) ;
}))

app.post( "/allListings" , wrapAsync( async (req,res,next)=>
{
        
        let { title1 , location1 , country1 , price1 ,image_url1, description1 } = req.body ;
        if( !title1)
        {
            next( new CustomizeExpression1(400 , "information not filled properly")) ;
        }
        const dataTemp = new listingModel( {title: title1   ,location:  location1 ,country: country1 ,price: price1 , image:{ url:image_url1} ,description1: description1}) ;
        await dataTemp.save() ;
        res.redirect("/allListings") ;


}))

app.delete("/allListings/:id/review/:reviewId" , wrapAsync( async(req,res)=>
{
    let { id , reviewId } = req.params ;
    // ReviewModel1   listingModel
    let tempdata1 = await ReviewModel1.findByIdAndDelete(reviewId) ;
    let tempData2 = listingModel.findByIdAndUpdate(id , {$pull:{ reviews:reviewId}}) ;
    console.log( "data for handling deletion of review :" , "ids :" , id , " ", reviewId , " " , tempdata1 , " " , tempData2) ;
    // res.send("form submitting is handle properly for path : /allListings/:id/review/:reviewId ") ;
    res.redirect(`/allListings/${id}`) ;
}) );

app.delete( "/allListings/:id" , wrapAsync(  async (req,res)=>
{
    // let { title1 , location1 , country1 , price1 , description1 } = req.body ;
    let{id} = req.params ;

    // console.log("at edit put r : id is ",id,title1 , location1 , country1 , price1 , description1) ;

    await listingModel.findByIdAndDelete( id ) ;

    res.redirect(`/allListings`) ;
}))

app.put( "/allListings/:id" ,wrapAsync( async (req,res)=>
{
    let { title1 , location1 , country1 , price1 ,image_url1, description1 } = req.body ;
    let{id} = req.params ;
    console.log( "request body for edit listing:" , req.body) ;

    // console.log("at edit put r : id is ",id,title1 , location1 , country1 , price1 , description1) ;

    await listingModel.updateOne( {_id:id} ,{title: title1   ,location:  location1 ,country: country1 ,price: price1 , image:{url: image_url1},description: description1}) ;

    res.redirect(`/allListings/${id}`) ;
}));

app.get("/" ,wrapAsync(  (req,res,next)=>
{
    // res.send("") ;
    res.render("home1.ejs") ;
    // next(new CustomizeExpression1( 400 , "error at path'/' ") );
    // throw customizeExpression1( 400 , "error at path'/' ") ;
}))

app.get("*" ,wrapAsync(  (req,res,next)=>
{
    // res.send("") ;
    // res.send("<h1>this is a home page<h1/>") ;
    // throw customizeExpression1( 400 , "error at path'/' ") ;
    next(new CustomizeExpression1( 400 , " Page is not available") );
}))




app.use(( err , req , res, next) =>
{
    console.log("this is x error handling middleware");
    let { statusCode = 500, message = "something went wrong" } = err ;
    // res.status( statusCode) . send( message ) ;
    res.render("errorP1.ejs" , {message}) ;
    // res.send("checking for error") ;
}) ;




// app.get( "/testListing" , async(req, res) =>
// {
//     // let temp1 = new listingModel({
//     //     title:"house1", description:"good room" ,image:"" , price:0 , location:"kokan" , country:"India"
//     // }) ;

//     // await temp1.save() ;
//     res.send("successful completion!!") ;

// })

// display all listings


