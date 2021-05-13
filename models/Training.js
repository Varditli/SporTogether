const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const trainingSchema = mongoose.model(
    "Training",
new mongoose.Schema({

    trainingCreator:{
        type:ObjectId,
        ref:"Trainer"
    },

    location:{
        type:String,
        required:false
    },

    name:{
        type:String,
        required:true
    },

    capacity:{
        type:Number,
        required:true
    },

    type:{
        type:String,
        required:true,
        },

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

    age_group:{
        type:String,
        required:false
    },

    recurring:{
        type:Boolean,
        required:true
    },

    free_text:{
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