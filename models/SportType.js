const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const sportTypeSchema = mongoose.model(
    "SportType",
new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

})
)
module.exports = sportTypeSchema;