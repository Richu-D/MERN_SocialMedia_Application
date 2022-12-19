const express = require("express")
const login = require("../controllers/Admin/adminLogin.controller.js")
const home = require("../controllers/Admin/home.controller.js")
const authorizeAdmin = require("../middlewares/authorizeAdmin.middleware.js")
const refreshtoken = require("../controllers/Admin/adminRefreshtoken.controller.js")
const getAllUsers = require("../controllers/Admin/allUsers.controller.js")
const block = require("../controllers/Admin/block.controller.js")
const Unblock = require("../controllers/Admin/Unblock.controller.js")

const adminRouter = express.Router()

adminRouter.post("/login",login)
adminRouter.get("/refreshtoken",refreshtoken)

adminRouter.use(authorizeAdmin)

adminRouter.get("/home",home)
adminRouter.get("/users",getAllUsers)
adminRouter.patch("/block/:userId",block)
adminRouter.patch("/Unblock/:userId",Unblock)

module.exports = adminRouter

 
