const mongoose = require("mongoose") ;

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
        }

    }
);

module.exports = new mongoose.model( "ReviewModel1" , reviewSchema1 ) ;