const Post = require("../../models/Post.model.js")

const addComment=async (req, res) => {
    try {
      const {comment} =req.body
      const {postId} = req.params


    let result =   await Post.updateOne({"_id":postId},{$push: { "comments":{
        "comment": comment ,
        "commentBy":req.user.id,
        "commentAt":new Date()
      }
     }})
    console.log(result);
        res.status(200).json({"status":true,"message":"commented successfully"});
     
    } catch (err) {
      res.status(500).json({"status":false,"message":err.message});
    }
  }

  module.exports = addComment