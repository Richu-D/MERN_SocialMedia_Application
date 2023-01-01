const express = require("express")
const login = require("../controllers/Admin/adminLogin.controller.js")
const home = require("../controllers/Admin/home.controller.js")
const authorizeAdmin = require("../middlewares/authorizeAdmin.middleware.js")
const refreshtoken = require("../controllers/Admin/adminRefreshtoken.controller.js")
const getAllUsers = require("../controllers/Admin/allUsers.controller.js")
const block = require("../controllers/Admin/block.controller.js")
const Unblock = require("../controllers/Admin/Unblock.controller.js")
const dashboardDetails = require("../controllers/Admin/dashboardDetails.controller.js")
const monthlyRegisterDetails = require("../controllers/Admin/monthlyRegisterDetails.controller.js")
const yearlyRegisterDetails = require("../controllers/Admin/yearlyRegisterDetails.controller.js")
const usersCount = require("../controllers/Admin/usersCount.controller.js")
const reports = require("../controllers/Admin/reports.controller.js")
const commentRouter = require("../routes/comment.Router.js")
const deletePost = require("../controllers/Admin/deletePost.controller.js")

const adminRouter = express.Router()

adminRouter.post("/login",login)
adminRouter.get("/refreshtoken",refreshtoken)

adminRouter.use(authorizeAdmin)

adminRouter.use("/comment",commentRouter)

adminRouter.delete("/post/:postId",deletePost)
adminRouter.get("/reports",reports)
adminRouter.get("/home",home)
adminRouter.get("/dashboardDetails",dashboardDetails)
adminRouter.get("/monthlyRegisterDetails",monthlyRegisterDetails)
adminRouter.get("/yearlyRegisterDetails",yearlyRegisterDetails)
adminRouter.get("/usersCount",usersCount)
adminRouter.get("/users",getAllUsers)
adminRouter.patch("/block/:userId",block)
adminRouter.patch("/Unblock/:userId",Unblock)

module.exports = adminRouter

 
