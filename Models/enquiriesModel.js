const mongoose = require("mongoose")

const enquirySchema= mongoose.Schema({
    enquiry:String,
    message: String
})
module.exports=mongoose.model("enquiry",enquirySchema)