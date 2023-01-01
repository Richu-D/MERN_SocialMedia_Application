const Post =  require('../../models/Post.model.js')
const User =  require('../../models/User.model')
const storage = require("../../firebase/config.js")

const reportPost = async (req,res) => {
    try {

      const {postId} = req.params
      userId = req.user.id
          try {
            const previousStatus = await Post.findByIdAndUpdate(postId,{$addToSet:{reports:userId}})
            if(previousStatus && previousStatus.reports.length > 0){
              console.log(previousStatus.reports.length);
              if(previousStatus?.image){
                  let pictureRef = storage.refFromURL(previousStatus?.image);
                 await pictureRef.delete()
                    .then(async() => {
                      await User.updateOne( {"_id":previousStatus.user}, { $pull: { posts: postId} })
                       await Post.deleteOne({_id:postId})
                       res.status(200).json({"status":true,"message":"Post Reported and Deleted Successfully"})
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    }else{
                    await Post.deleteOne({_id:postId})
                    res.status(200).json({"status":true,"message":"Post Reported and Deleted Successfully"})
      
                  }
            }else{
              res.status(200).json({"status":true,"message":"Post Reported Successfully"})
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

  module.exports = reportPost;