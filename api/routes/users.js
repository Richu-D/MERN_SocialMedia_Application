const express = require("express")
const {authUser} = require("../middlewares/auth")
const { 
    register, 
    activateAccount, 
    login, 
    resendVerification, 
    findUser, 
    makeAccountPrivate, 
    makeAccountPublic
} = require("../controllers/controllers.js")


const usersRouter = express.Router() 

usersRouter.post("/register",register)
usersRouter.post("/login",login)
usersRouter.get("/findUser",findUser)


// Authorization Middleware
usersRouter.use(authUser)

usersRouter.post("/activate",activateAccount)
usersRouter.patch("/makeAccountPrivate",makeAccountPrivate)
usersRouter.patch("/makeAccountPublic",makeAccountPublic)
usersRouter.post("/resendVerification",resendVerification)

usersRouter.get("/home",(req,res)=>{
    res.send("Home")
})


module.exports = usersRouter


