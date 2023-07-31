const enquiryModel=require("../Models/enquiriesModel")


const createEnquiry= async function(req,res){
    const {enquiry}= req.body
    const created=await enquiryModel.create({enquiry})
    res.json(created)
}

const getEnquiry= async(req,res)=>{
    const getData= await enquiryModel.find()
    res.json(getData)
}

const deleteEnquiry= async function(req,res){
    const{id}=req.params
    const deletedData= await enquiryModel.findByIdAndDelete(id)
    res.status(200).json({message:"deleted"})
}

module.exports={createEnquiry,getEnquiry,deleteEnquiry}