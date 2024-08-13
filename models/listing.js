const mongoose = require("mongoose");
const ReviewModel1 = require("./reviewModel.js");
const imageDefaultUrl = "https://images.unsplash.com/photo-1698900213856-997735938184?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const UserModel = require("./userModel.js");

const listingSchema = new mongoose.Schema({
        title: {
            type: String

        },
        description:{
            type: String
        },
        image: {
            filename: {
                type: String,
                //   required: true,
            },
            url: {
                type: String,
                default: "https://images.unsplash.com/photo-1698900213856-997735938184?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                set: (v) => v == "" ? "https://images.unsplash.com/photo-1698900213856-997735938184?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
                //   required: true,
            }
        },
        price:{
            type: Number
        },
        location:{
            type: String
        },
        country:{
            type: String
        },
        reviews:[{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ReviewModel1",
                }],
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        }
    }
);


listingSchema.post('findOneAndDelete', async (listing) => {
    console.log("it enter in middleware for deleteOne for schema listing");
    if (listing) {
        console.log("object sent which had deleted:", listing);
        let res1 = await ReviewModel1.deleteMany({ _id: { $in: listing.reviews } });
        console.log(res1, "change now for check");
    }


});

const listingModel = new mongoose.model("ListingModel", listingSchema);



module.exports = listingModel;