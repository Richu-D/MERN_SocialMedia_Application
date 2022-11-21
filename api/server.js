require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const adminRouter = require("./routes/admin.js")
const usersRouter = require("./routes/users.js")
const PORT = process.env.PORT || 5000
const app = express()
console.clear()

app.use(cors())

app.use(express.json());

app.use("/users",usersRouter)

app.use("/admin",adminRouter)


//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() =>{
      console.log("database connected successfully")
      app.listen(PORT,()=>{
        console.log(`Server Started At Port ${PORT}`);
    })
})
  .catch((err) => console.log("error connecting to mongodb", err));

