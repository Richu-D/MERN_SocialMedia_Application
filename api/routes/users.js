const express = require("express")

// Controllers
const register  = require("../controllers/register.controller.js")
const activateAccount = require("../controllers/activateAccount.controller.js")
const resendVerification = require("../controllers/resendVerification.controller.js")
const login = require("../controllers/login.controller.js")
const findUser = require("../controllers/findUser.controller.js")
const makeAccountPrivate = require("../controllers/makeAccountPrivate.controller.js")
const makeAccountPublic = require("../controllers/makeAccountPublic.controller.js")
const follow = require("../controllers/follow.controller.js")
const unfollow = require("../controllers/unfollow.controller.js")
const refreshtoken = require("../controllers/refreshtoken.controller.js")
const logout = require("../controllers/logout.controller.js")
const getProfile = require("../controllers/getProfile.controller.js")
const profile = require("../controllers/profile.controller.js")

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
usersRouter.patch("/logout",logout)

usersRouter.get("/home",(req,res)=>{
    res.send("Home")
})


module.exports = usersRouter


