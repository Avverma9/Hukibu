const mongoose= require("mongoose")

const surveySchema= new mongoose.Schema({
    topic:String,
    question:String
})
module.exports=mongoose.model("survey",surveySchema)