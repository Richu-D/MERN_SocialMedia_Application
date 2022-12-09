const Post =  require('../models/Post.model.js')

const storage = require("../firebase/config.js")

const deletePost = async (req,res) => {
    try {

      const {postId} = req.params
      userId = req.user.id

          try {
            const post = await Post.findById(postId);
            console.log(post);
            if (!post) return res.status(404).json("post not found");
           if(post.user.toString() === userId){
            if(post?.image){
            let pictureRef = storage.refFromURL(post?.image);
           await pictureRef.delete()
              .then(async() => {
                 await Post.deleteOne({_id:postId})
                 res.status(200).json({"status":true,"message":"Post Deleted Successfully"})
                })
                .catch((err) => {
                  console.log(err);
                });
              }else{
              await Post.deleteOne({_id:postId})
              res.status(200).json({"status":true,"message":"Post Deleted Successfully"})

            }

           }
           
            
          } catch (err) {
              console.log("err",err);
              res.status(500).json(err);
            
          }
        

    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = deletePost;