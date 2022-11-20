import * as dotenv from 'dotenv' 
dotenv.config()
import express from "express";
import adminRouter from './routes/admin.js';
import clientRouter from "./routes/clients.js"
const PORT = process.env.PORT || 5000
const app = express()

app.use("/client",clientRouter)

app.use("/admin",adminRouter)



app.listen(PORT,()=>{
    console.log(`Server Started At Port ${PORT}`);
})