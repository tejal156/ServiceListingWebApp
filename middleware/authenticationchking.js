
module.exports.isLoggedIn = (req , res , next )=>
{
    // console.log(req.originalUrl) ;
    if( req.isAuthenticated() == false )
    {
        req.session.prevPath = req.originalUrl ;
        // console.log("prev path1 is :" , res.locals.prevPath) ;
        req.flash( "errorKey" , "You are not logged in !!") ;
        return res.redirect("/user/login") ;
    }
    next() ;
}

module.exports.isPrevPathMiddleware = (req , res, next ) =>
{
    if( req.session.prevPath )
    {
        res.locals.prevPath = req.session.prevPath ;
    }
    next() ;
}