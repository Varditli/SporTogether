const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const trainingSchema = mongoose.model(
    "Training",
new mongoose.Schema({

    trainingCreator:{
        type:ObjectId,
        ref:"Trainer"
    },


    name:{
        type:String,
        required:true
    },

    zoom:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:false
    },


    capacity:{
        type:Number,
        required:true
    },

    type:[{
        type:String,
        required:true,
        }],

    time:{
        type: Date,
        required:true
    },

    intensity:{
        type:String,
        required:false
    },

    limitations:{
        type:String,
        required:false
    },

    gender:{
        type:String,
        required:false
    },

    age_group:
        [{type:Number}]
    ,

    // recurring:{
    //     type:Boolean,
    //     required:true
    // },

    additional_info:{
        type:String,
        required:false
    },

    zoom_link:{
        type: String,
        required:false
    },

    is_active:{
        type: Boolean,
        required:false,
    },

    created_at:{
        type:Date,
        required:false
    },
    likes:[{
        type:ObjectId,
        ref:"Trainee"
    }],
    participants:[{
        type:ObjectId,
        ref:"Trainee"
    }],
})
)
module.exports = trainingSchema;