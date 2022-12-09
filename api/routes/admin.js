const express = require("express")
// const {  } = require("../controllers/controllers.js")

const adminRouter = express.Router()

adminRouter.get("/login",(req,res)=>{
    res.send("hyy")
})

module.exports = adminRouter


