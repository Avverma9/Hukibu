const express = require("express")
const router=express.Router()
const task=require("../Controllers/taskController")
const enquiry= require("../Controllers/enquiryController.js")
const content = require("../Controllers/contentController")
const message= require("../Controllers/messageController")
const survey= require("../Controllers/surveyController")


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
//=====================message=================================//\
router.post("/create/message",message.createMessage)
router.get("/get/message",message.getMessage)
//=======================survery==================================//
router.post("/create/survey",survey.createSurvey)
router.get("/get/survey",survey.getSurvey)
router.delete("/delete/survey",survey.deleteSurvey)
module.exports=router