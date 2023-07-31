const contentModel = require("../Models/ContentModel")
const createContent= async function(req,res){
    const{title,description,tags}=req.body
    const created=await contentModel.create({title,description,tags})
    res.status(201).json(created)
}
const getContent = async(req,res)=>{
    const getData= await contentModel.find()
    res.status(200).json(getData)
}
const deleteContent= async(req,res)=>{
    try{
    const {id}=req.params
    const deletedData= await contentModel.findByIdAndDelete(id)
    res.status(200).json(`the data related ${id} has been deleted`)
    }catch(error){
        console.log(error);
    }
}
module.exports={createContent,getContent,deleteContent}