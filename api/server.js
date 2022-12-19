require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const adminRouter = require("./routes/admin.js")
const usersRouter = require("./routes/users.js")
const fileUpload = require("express-fileupload")
const socketio = require("socket.io")
const PORT = process.env.PORT || 5000
const app = express()
console.clear()
 
app.use(cors())

app.use(express.json());

app.use(fileUpload());

app.use("/users",usersRouter)

app.use("/admin",adminRouter)


//connectiong to database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() =>{
      console.log("database connected successfully")
    const expressServer =  app.listen(PORT,()=>{
        console.log(`Server Started At Port ${PORT}`);
    })
    const io = socketio(expressServer,{
      cors: "*"
    })
    io.on("connection",(socket)=>{
      socket.emit("welcome",{data:"welcome to socket.io from server"})
      socket.on("welcome",(data)=>{
        console.log("data from client is :",data);
      })
    })
})
  .catch((err) => console.log("error connecting to mongodb", err));

