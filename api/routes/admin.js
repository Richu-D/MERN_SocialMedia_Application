import express from "express";
import { admin } from "../controllers/controllers.js";

const adminRouter = express.Router()

adminRouter.get("/",admin)

export default adminRouter


