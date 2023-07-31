const surveyModel= require("../Models/surveyModel")

const createSurvey= async(req,res)=>{
    try{
    const {topic,question}=req.body
    const created=await surveyModel.create({topic,question})
    res.status(201).json(created)
}catch(error){
    console.log("sorry cant process");
}
}

const getSurvey = async function(req,res){
    const getData= await surveyModel.find()
    res.json(getData)
}

const deleteSurvey= async (req,res)=>{
    const {id}=req.params
    const deleted= await surveyModel.findByIdAndDelete(id)
    res.status(200).json(`data associated with ${id} has been deleted`)
}

module.exports={createSurvey,getSurvey,deleteSurvey}