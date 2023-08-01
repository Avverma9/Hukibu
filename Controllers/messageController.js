const messageModel= require("../Models/messageModel")

const createMessage= async function(req,res){
try{
    const {username,message}=req.body
    const created= await messageModel.create({username,message})
    const updatedmessage = await messageModel.find({})
    res.status(201).json(updatedmessage)
}catch(error){
    console.error(error)
}
}

const getMessage=async(req,res)=>{
    const getData= await messageModel.find()
    res.status(200).json(getData)

}

module.exports={createMessage,getMessage}

