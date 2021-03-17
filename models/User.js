const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = mongoose.model(
    "User",
new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    },

    // resetToken: String,
    // expireToken: Date,
    // mylike:[{type:ObjectId,ref:"Deal"}],
    // roles: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Role"
    //     }
    // ],

})
)
module.exports = userSchema;
