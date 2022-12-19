const Post = require("../../models/Post.model.js")

const deleteComment=async (req, res) => {
    try {
      const {postId,commentId} = req.params
      console.log("post id is ",postId,"comment id is",commentId);

//    let post = await Post.findById({"_id":postId}).select(["comments","-_id"])
//     // let singlePost = post.comments.includes({"commentBy":req.user.id})
//   let userId = req.user.id
//    let temp = false
//    let messageId;
//    for(let i=0;i<post.comments.length;++i){
//      if(post.comments[i].commentBy.toString() === userId){
//        temp = true
//        console.log(post.comments[i]);
//        messageId = post.comments[i].id;
//     break;
//    }
//    }
// if(!temp) return res.status(400).json({"status":false,"message":"you cant delete this msg"});

// if(messageId !== commentId) return res.status(400).json({"status":false,"message":"you cant delete this msg"});
  
    let result =   await Post.updateOne({"_id":postId},{$pull: { "comments":{_id:commentId }}})
    console.log(result);
        res.status(200).json({"status":true,"message":"comment deleted successfully successfully"});
     
    } catch (err) {
      res.status(500).json({"status":false,"message":err.message});
    }
  }

  module.exports = deleteComment