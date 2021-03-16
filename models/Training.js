const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const trainingSchema = mongoose.model(
    "Training",
new mongoose.Schema({

    trainer_ID:{
        type:ObjectId,
        ref:"Trainer"
    },

    location:{
        type:String,
        required:true
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
        enum: Object.values(Types)
    },

    time:{
        type:TimeRanges,
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
        required:true,
    },

    created_at:{
        type:Date,
        required:true
    },
    
})
)
module.exports = trainingSchema;