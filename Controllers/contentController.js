const contentModel = require("../Models/ContentModel")

const createContent = async function (req, res) {
    const { title, description, tags } = req.body;
    const created = await contentModel.create({ title, description, tags });
    const updatedContent = await contentModel.find({})
    res.status(201).json(updatedContent);
  };
  
  const getContent = async (req, res) => {
    const getData = await contentModel.find();
    res.status(200).json(getData);
  };
  
  const deleteContent = async (req, res) => {
    try {
      const { id } = req.params;
      await contentModel.findByIdAndDelete(id);

      const updatedData = await contentModel.find();
  
      res.status(200).json(updatedData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete content" });
    }
  };



module.exports = { createContent, getContent, deleteContent }