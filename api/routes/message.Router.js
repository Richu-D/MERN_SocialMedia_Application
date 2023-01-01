const messageRouter = require("express").Router();

const Message = require("../models/Message.model.js")

// post Message
messageRouter.post("/",async (req,res)=>{
    try {
        const newMessage = new Message({
            "conversationId":req.body.conversationId,
            "sender":req.user.id,
            "text":req.body.text
        })
        const SavedMessage = await newMessage.save()
       res.status(200).json(SavedMessage);
    } catch (error) {
        res.status(500).json(error);        
    }
}) 


// get Message
messageRouter.get("/:conversationId", async (req,res)=>{
    try {
        const messages = await Message.find({
            conversationId:req.params.conversationId
        })

       res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);        
    }
     
})

module.exports = messageRouter;