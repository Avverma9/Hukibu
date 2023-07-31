const taskModel = require("../Models/taskModel")

const createTask=async(req,res)=>{
    const {task}=req.body
    const createdTask= await taskModel.create({task})
    res.json(createdTask)
}
const getTask= async function (req,res){
    const gettingData= await taskModel.find()
    res.json(gettingData)
}
module.exports={createTask,getTask}