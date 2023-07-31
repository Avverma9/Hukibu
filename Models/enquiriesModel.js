const mongoose = require("mongoose")

const enquirySchema= mongoose.Schema({
    enquiry:String
})
module.exports=mongoose.model("enquiry",enquirySchema)