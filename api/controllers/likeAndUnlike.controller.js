const Post =  require('../models/Post.model.js')
const NotificationModel =  require('../models/Notification.model.js')

const likeAndUnlike = async (req,res) => {
    try {

      const {postId} = req.params
      console.log("post id is ",postId);
      userId = req.user.id

          try {
            const post = await Post.findById(postId);
            console.log(post);
            if (!post) return res.status(404).json("post not found");
            
            if (!post.like.includes(userId)) {
              await post.updateOne({ $push: { like: userId } });
              if (post.user != userId) {
                NotificationModel.create({
                  userId: post.user,
                  emiterId: userId,
                  text: 'liked your post.',
                  postId: postId
                })
                  .then((response) => res.status(200).json({status:true,message:"post Liked"}))
                  .catch((error) => res.status(500).json(error))
              } else res.status(200).json({status:true,message:"post Liked"})
            } else {
              await post.updateOne({ $pull: { like: userId } });
              if (post.user != userId) {
                NotificationModel.deleteOne({
                  postId: postId
                })
                  .then((response) => res.status(200).json({status:false,message:"post disliked"}))
                  .catch((error) => res.status(500).json(error))
              } else res.status(200).json({status:false,message:"post Liked"})
            }
          } catch (err) {
              console.log("err is here",err);
              res.status(500).json(err);
            
          }
        

    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = likeAndUnlike;