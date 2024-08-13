const mongoose = require("mongoose") ;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email:
    {
        type:String 
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('UserModel' ,UserSchema);