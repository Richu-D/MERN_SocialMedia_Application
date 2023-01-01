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
    let users = []

    const addUser = (userId,socketId) =>{
      !users.some((user)=> user.userId === userId) && users.push({userId,socketId})
    }
    const removeUser = (socketId) =>{
      users = users.filter(user => user.socketId !== socketId)
    }
    
    const getUser = (userId) => {
      return users.find((user) => user.userId === userId);
    };


    io.on("connection",(socket)=>{
      // socket.emit("welcome",{data:"welcome to socket.io from server"})
      socket.on("addUser",(userId)=>{
        console.log(userId,"userId");
        addUser(userId,socket.id)
        io.emit("getUsers",users)

      })
      socket.on("disconnect",()=>{
        console.log("user disconnected");
        removeUser(socket.id)
        io.emit("getUsers",users)
      })

      socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        try {
          console.log(senderId, receiverId, text,"data in the socket");
          const user = getUser(receiverId);
        socket.to(user.socketId).emit("getMessage", {
          senderId,
          text,
          createdAt:Date.now()
        });
        } catch (error) {
          console.log("user not available");
        }
        
      });



    })
})
  .catch((err) => console.log("error connecting to mongodb", err));

