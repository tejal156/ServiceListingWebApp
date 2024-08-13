const listingModel = require("../models/listing")  ;
const  CustomizeExpression1 = require("../utils/expressError") ;
const flash = require("connect-flash") ;

module.exports.renderAllListings_Page = async (req,res)=>
{
    const allListingsData =await listingModel.find({}) ;
    res.render("listing_data/displayLista.ejs" , {allListingsDataKey : allListingsData }) ;
};

module.exports.renderForm_ForAddListing = async (req,res,next)=>
{
    // const allListingsData =await listingModel.find({}) ;
        res.render("listing_data/formAddInfo.ejs") ;    
}

module.exports.renderListing_ByIdPage =  async (req,res,next)=>
{
    let { id } = req.params ;
    // const allListingsData =await listingModel.find({}) ;
    const dataById = await listingModel.findById(id).populate("reviews").populate("owner")
    .populate({ path : "reviews" , populate:{ path:"owner"}}) ;
    
    if(!dataById )
    {
        req.flash("errorKey" , "listing does not exist") ;
        res.redirect("/allListings") ;

    }

    if( !dataById.title)
    {
        next( new CustomizeExpression1(400 , "Information is not available")) ;
    }
    else
    {
        console.log("data sent to showbyid.ejs :" , dataById ) ;
        res.render("listing_data/showById.ejs" , {DataKey : dataById }) ;
    }
   
}

module.exports.renderEditForm_ForListing =  async (req,res)=>
{
    let { id } = req.params ;
    // const allListingsData =await listingModel.find({}) ;
    const dataById1 = await listingModel.findById(id) ;

    let tempImage =  dataById1.image.url ; 
    console.log("image url before update :" ,  tempImage ) ;
    tempImage = tempImage.replace("upload/" , "upload/ar_1.0,c_fill,h_250/bo_5px_solid_lightblue/") ;
    console.log("image url after update :" ,  tempImage ) ;

    res.render("listing_data/edit.ejs" , {DataKey : dataById1  , tempImage:tempImage}) ;
}

module.exports.addListing =  async (req,res,next)=>
{
        
        let { title1 , location1 , country1 , price1 ,image_url1, description1 } = req.body ;
        if ( !title1  || !location1  || !country1  || !price1 || !description1)
        {
            next( new CustomizeExpression1(400 , "information is missing or not filled properly")) ;
        }

        let image_url = req.file.path ;
        let image_filename = req.file.filename ;
        const dataTemp = new listingModel( {title: title1   ,location:  location1 ,country: country1 ,price: price1 , image:{ url:image_url , filename :image_filename } ,description1: description1 , owner: req.user._id}) ;
        await dataTemp.save() ;
        req.flash("successKey" , "listing added successfully") ;
        res.redirect("/allListings") ;

        // res.send( req.file) ;
}


module.exports.deleteListing =  async (req,res)=>
{
    // let { title1 , location1 , country1 , price1 , description1 } = req.body ;
    let{id} = req.params ;

    // console.log("at edit put r : id is ",id,title1 , location1 , country1 , price1 , description1) ;

    await listingModel.findByIdAndDelete( id ) ;
    req.flash("successKey" , "listing deleted successfully") ;

    res.redirect(`/allListings`) ;
} ;


module.exports.editListing =  async (req,res)=>
{
    let { title1 , location1 , country1 , price1 ,image_url1, description1 } = req.body ;
    let{id} = req.params ;
    // console.log( "request body for edit listing:" , req.body) ;


    // console.log("at edit put r : id is ",id,title1 , location1 , country1 , price1 , description1) ;
    if ( !title1  || !location1  || !country1  || !price1 || !description1)
    {
        next( new CustomizeExpression1(400 , "information is missing or not filled properly")) ;
    }

    if( req.file)
    {
        console.log("listing controllpage : this is inside block which will execute if new file will upload") ;
        let image_url = req.file.path ;
        let image_filename = req.file.filename ;  
        await listingModel.updateOne( {_id:id} ,{title: title1   ,location:  location1 ,country: country1 ,price: price1 ,  image:{ url:image_url , filename :image_filename },description: description1}) ;    
    }
    else
    {
        await listingModel.updateOne( {_id:id} ,{title: title1   ,location:  location1 ,country: country1 ,price: price1 , description: description1}) ;
              
    }

    // await listingModel.updateOne( {_id:id} ,{title: title1   ,location:  location1 ,country: country1 ,price: price1 ,  image:{ url:image_url , filename :image_filename },description: description1}) ;

    req.flash("successKey" , "listing updated successfully") ;
    res.redirect(`/allListings/${id}`) ;
}