const mongoose= require("mongoose")
const messageSchema= new mongoose.Schema({
    username:String,
    message:String
})
module.exports=mongoose.model("message",messageSchema)