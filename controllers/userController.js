
const userModel = require('../models/userModel');



module.exports.renderSignupForm = (req,res,)=>
{
    res.render("./usersPages/signUpUser.ejs") ;
}

module.exports.signup =  async(req,res,next)=>
{
    let{ userName1 ,eamilFuser1 , passwordFuser1} = req.body ;

    let tempUserDoc = new userModel({ email:eamilFuser1 , username:userName1}) ;
    try
    {
        let temp1 = await userModel.register( tempUserDoc , passwordFuser1) ;
        // console.log("register data is : ",temp1) ;

        req.login( temp1 , (err)=>{
            if(err){ next(err)}
            req.flash("successKey" , "user register successfully") ;
            res.redirect("/allListings") ;
        } ) ;

    }
    catch(err)
    {
        console.log("register error is : ",err) ;
        req.flash("errorKey" , "user with given username already registered") ;
        res.redirect("/user/signUp") ;
    }
    
    
}


module.exports.renderLoginForm = ( req , res , next)=>
{
    res.render("./usersPages/logInUser.ejs") ;
}

module.exports.login = ( req, res)=> {

    req.flash("successKey" , "You are login successfully !! Welcome to wanderlust!") ;
    
    // console.log("prev path2 is :" , res.locals.prevPath) ;
    if( res.locals.prevPath)
    {
        res.redirect(res.locals.prevPath);
    }
    res.redirect("/allListings");
  }


module.exports.logout = ( req ,res, next) =>
req.logout( (err)=>
{
    if(err)
    {
        return next(err) ;
    }
    else
    {
        req.flash("successKey" , "You are Log out successfully !!") ;
        res.redirect("/allListings") ;
    }
})