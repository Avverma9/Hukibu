const surveyModel= require("../Models/surveyModel")

const createSurvey= async(req,res)=>{
    try{
    const {title,question }=req.body
    const created=await surveyModel.create({title,question})
    const updatedSurvey = await surveyModel.find({})

    res.status(201).json(updatedSurvey)
}catch(error){
    console.log("sorry cant process");
}
}

const getSurvey = async function(req,res){
    const getData= await surveyModel.find()
    res.json(getData)
}

const deleteSurvey = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await surveyModel.findByIdAndDelete(id);
      if (deleted) {
        const updatedSurvey = await surveyModel.find({}); 
        res.status(200).json(updatedSurvey);
      } else {
        res.status(404).json({ message: `Survey with id ${id} not found.` });
      }
    } catch (error) {
      console.log("Sorry, can't process:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

module.exports={createSurvey,getSurvey,deleteSurvey}