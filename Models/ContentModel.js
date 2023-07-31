const mongoose = require("mongoose")
const contentSchema = new mongoose.Schema({
    title:String,
    description:String,
    tags:[String]
})

module.exports=mongoose.model("content",contentSchema)