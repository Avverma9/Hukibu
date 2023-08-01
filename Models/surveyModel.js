const mongoose= require("mongoose")

const surveySchema= new mongoose.Schema({
    title:String,
    question:String,
    
})
module.exports=mongoose.model("survey",surveySchema)