const Post =  require('../../models/Post.model.js')

const editPost = async (req,res) => {
    try {

      const {postId} = req.params
      userId = req.user.id

          await Post.updateOne({$and:[{_id:postId},{user:userId}]},{$set:{text:req.body.text,edited:true}})

            
            .then(()=> res.status(200).json({"status":true,"message":"Message Updated Successfully"}))

            .catch((err)=>{
              console.log(err);
                res.status(500).json({"status":false,"message":"some Error Occer"})
            })
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = editPost;