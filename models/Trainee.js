const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const traineeSchema = mongoose.model(
    "Trainee",
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
    myLikes:[{type:ObjectId,ref:"Training"}],
    //mytrainings:[{type:ObjectId,ref:"Training"}],
    // roles: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Role"
    //     }
    // ],

})
)
module.exports = traineeSchema;
