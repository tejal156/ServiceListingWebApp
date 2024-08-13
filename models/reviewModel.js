const mongoose = require("mongoose") ;
const UserModel = require("./userModel.js") ;

// let myDate = new Date() ;
const reviewSchema1 = new mongoose.Schema(
    {
        comment:
        {
            type:String 
        },
        rating:
        {
            type: Number ,
            min:1 ,
            max:5
        },
        createdAt :
        {
            type: Date,
            default:Date.now() 
        },
        owner:
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "UserModel" ,
        }

    }
);

module.exports = new mongoose.model( "ReviewModel1" , reviewSchema1 ) ;