const taskModel = require("../Models/taskModel")

const createTask = async (req, res) => {
    try {
      const { task } = req.body;
      const createdTask = await taskModel.create({ task });
      const updatedTasks = await taskModel.find({});
      res.json(updatedTasks);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  };
const getTask= async function (req,res){
    const gettingData= await taskModel.find()
    res.json(gettingData)
}
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
      await taskModel.findByIdAndDelete(id);
      const updatedTasks = await taskModel.find();
  
      res.status(200).json(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'An error occurred while deleting the task.' });
    }
  };
module.exports={createTask,getTask,deleteTask}