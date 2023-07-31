const express = require("express")
const mongoose= require("mongoose")
const cors = require("cors")
const app= express()
app.use(express.json())
app.use(cors())
const route = require("./routes/route")

mongoose.connect("mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/hukibu",{useNewUrlParser :true, useUnifiedTopology:true})
.then(()=> console.log("mongoDB is connected"))
.catch(()=> console.error(error))

app.use("/",route)

app.listen(5000 || process.env.PORT,()=> console.log("server is connected 5000"))