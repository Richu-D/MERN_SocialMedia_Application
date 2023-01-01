const ConversationRouter = require("express").Router();

const Conversation = require("../models/Conversation.model.js")

// New Conversaton
ConversationRouter.post("/", async (req,res)=>{
    try {
let isChatbefore = await Conversation.findOne({
     $and:[{members:{$in:[req.user.id]}},{members:{$in:[req.body.receiverId]}}]
 })
 if(isChatbefore){
    res.status(200).json({});
 }else{
         const newConversation = new Conversation({
            members:[req.user.id,req.body.receiverId]
       })

       const SavedConversation = await newConversation.save()

       res.status(200).json(SavedConversation);

 }
    


    } catch (error) {
        res.status(500).json(error);        
    }
     
})

// get Conversaton
ConversationRouter.get("/", async (req,res)=>{
    try {
        const conversation = await Conversation.find({
            members:{$in:[req.user.id]}
        })
console.log(conversation,"conversations");
       res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);        
    }
     
})

module.exports = ConversationRouter;