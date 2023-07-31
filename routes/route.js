const express = require("express")
const router=express.Router()
const task=require("../Controllers/taskController")
const enquiry= require("../Controllers/enquiryController.js")
const content = require("../Controllers/contentController")


//========================task==========================//
router.post("/task",task.createTask)
router.get("/get/task",task.getTask)
router.delete("/delete/task",task.deleteTask)
//====================enquiry========================//
router.post("/create/enq",enquiry.createEnquiry)
router.get("/get/enq",enquiry.getEnquiry)
router.delete("/delete/enq/:id",enquiry.deleteEnquiry)
//===================content======================//
router.post("/create/content",content.createContent)
router.get("/get/content",content.getContent)
router.delete("/delete/content/:id",content.deleteContent)
//======================================================//
module.exports=router