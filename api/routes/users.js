const express = require("express")
const { register, activateAccount, login } = require("../controllers/controllers.js")


const usersRouter = express.Router()

usersRouter.post("/register",register)
usersRouter.post("/activate",activateAccount)
usersRouter.post("/login",login)

module.exports = usersRouter


