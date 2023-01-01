const Post =  require('../../models/Post.model')
const User =  require('../../models/User.model')

const storage = require("../../firebase/config.js")

const deletePost = async (req,res) => {
    try {

      const {postId} = req.params
      console.log(postId,"postId is form deletepost admin");
   

          try {
            const post = await Post.findById(postId);
            console.log(post);
            if (!post) return res.status(404).json("post not found");
           
            if(post?.image){
            let pictureRef = storage.refFromURL(post?.image);
           await pictureRef.delete()
              .then(async() => {
                await User.updateOne( {"_id":post.user.toString()}, { $pull: { posts: postId} })
                 await Post.deleteOne({_id:postId})
                 res.status(200).json({"status":true,"message":"Post Deleted Successfully"})
                })
                .catch((err) => {
                  console.log(err);
                });
              }else{
              await Post.deleteOne({_id:postId})
              await User.updateOne( {"_id":post.user.toString()}, { $pull: { posts: postId} })
              res.status(200).json({"status":true,"message":"Post Deleted Successfully"})

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