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
const deleteTask=async(req,res)=>{
    const {id}=req.params
    const deleted= await taskModel.findByIdAndDelete(id)
    res.status(200).json(`the data related with ${id} has been deleted`)
}
module.exports={createTask,getTask,deleteTask}