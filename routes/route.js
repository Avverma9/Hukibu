const express = require("express")
const router=express.Router()
const task=require("../Controllers/taskController")
const enquiry= require("../Controllers/enquiryController.js")


//==================task==================
router.post("/task",task.createTask)
router.get("/get/task",task.getTask)
//====================enquiry========================//
router.post("/create/enq",enquiry.createEnquiry)
router.get("/get/enq",enquiry.getEnquiry)
router.delete("/delete/enq/:id",enquiry.deleteEnquiry)

module.exports=router