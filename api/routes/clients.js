import express from "express";
import { client } from "../controllers/controllers.js";

const clientRouter = express.Router()

clientRouter.get("/",client)

export default clientRouter


