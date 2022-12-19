const express = require("express")

// Controllers
const register  = require("../controllers/User/register.controller.js")
const activateAccount = require("../controllers/User/activateAccount.controller.js")
const resendVerification = require("../controllers/User/resendVerification.controller.js")
const login = require("../controllers/User/login.controller.js")
const findUser = require("../controllers/User/findUser.controller.js")
const makeAccountPrivate = require("../controllers/User/makeAccountPrivate.controller.js")
const makeAccountPublic = require("../controllers/User/makeAccountPublic.controller.js")
const follow = require("../controllers/User/follow.controller.js")
const unfollow = require("../controllers/User/unfollow.controller.js")
const removefollow = require("../controllers/User/removefollow.controller.js")
const refreshtoken = require("../controllers/User/refreshtoken.controller.js")
const logout = require("../controllers/User/logout.controller.js")
const getProfile = require("../controllers/User/getProfile.controller.js")
const profile = require("../controllers/User/profile.controller.js")
const editAbout = require("../controllers/User/editAbout.controller.js")

// Middleware
const authorizeUser = require("../middlewares/authorizeUser.middleware.js")

// Router
const postRouter = require("../routes/post.Router.js")
const commentRouter = require("../routes/comment.Router.js")


const usersRouter = express.Router() 

usersRouter.post("/register",register)
usersRouter.post("/login",login)

// Refresh token
usersRouter.get("/refreshtoken",refreshtoken)

usersRouter.get("/testing",(req,res)=>{
    console.log(req);
    res.send("tesing")
})


// Authorization Middleware
usersRouter.use(authorizeUser)


// post Router
usersRouter.use("/post",postRouter)
usersRouter.use("/comment",commentRouter)

usersRouter.get("/findUser",findUser)
usersRouter.get("/profile/:username",getProfile)
usersRouter.get("/profile",profile)
usersRouter.post("/activate",activateAccount)
usersRouter.patch("/makeAccountPrivate",makeAccountPrivate)
usersRouter.patch("/makeAccountPublic",makeAccountPublic)
usersRouter.post("/resendVerification",resendVerification)
usersRouter.patch("/follow/:user",follow)
usersRouter.patch("/unfollow/:user",unfollow)
usersRouter.patch("/editAbout/",editAbout)
usersRouter.patch("/removefollow/:user",removefollow)
usersRouter.patch("/logout",logout)

usersRouter.get("/home",(req,res)=>{
    res.send("Home")
})


module.exports = usersRouter


