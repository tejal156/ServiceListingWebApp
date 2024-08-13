const express =  require("express") ;
const app = express() ;
const portNo = 8080 ;

const mongoose = require('mongoose');
const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust" ;
const listingModel = require("./models/listing")  ;
const ReviewModel1 = require("./models/reviewModel") ;
const UserModel = require("./models/userModel") ;

const path = require("path") ;

app.set("view engin" , "ejs" ) ;
app.set("views" , path.join( __dirname , "views")) ;

const methodOverride = require("method-override") ;

const ejsMate = require('ejs-mate') ;
app.engine('ejs', ejsMate);

const wrapAsync = require("./utils/wrapAsync") ;
const  CustomizeExpression1 = require("./utils/expressError") ;

const listingRouter = require("./routers/listingRouter") ;
const reviewRouter = require("./routers/reviewRouter") ;
const userRouter = require("./routers/userRouter") ;

// it is for express sessions which make request stateful
const session = require('express-session')
// it si middleware which allow to use flash
const flash = require('connect-flash');

const passport = require("passport") ;
const LocalStrategy = require("passport-local") ;


// require this for using .env file in node
if( process.env.NODE_ENV != "production")
{
    require('dotenv').config() ;
    console.log(  "process.env =>",process.env) 
    console.log(process.env.CLOUD_NAME, process.env.CLOUD_API_KEY, process.env.CLOUD_API_SECRET);

}
console.log("this is a index page") ;


 


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

app.use(express.urlencoded({extended:true})) ;
app.use( methodOverride('_method')) ;
app.use( express.static(path.join(__dirname , "/public"))) ;



app.use(session({
    secret: 'keyboardCat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge :7 * 24 * 60 * 60 * 1000  ,
    }
  }));


app.use(passport.initialize()) ;
app.use(passport.session()) ;
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(UserModel.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());



app.use(flash());

app.use((req , res ,next )=>{
    res.locals.successFlash = req.flash("successKey") ;

    res.locals.errorFlash = req.flash("errorKey") ;
    res.locals.currUsersKey = req.user ;

    next() ;
});

app.use( "/allListings" , listingRouter) ;
app.use( "/allListings/:id/review" , reviewRouter) ;
app.use( "/user" , userRouter) ;

// middleware for session


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
    // console.log("this is x error handling middleware");
    // console.log("this is a middleware in index.js and error is :" , err);
    let { statusCode = 500, message = "something went wrong" } = err ;
    // res.status( statusCode) . send( message ) ;
    res.render("errorP1.ejs" , {message}) ;
    // res.send("checking for error") ;
}) ;



