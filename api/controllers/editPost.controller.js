const Post =  require('../models/Post.model.js')

const editPost = async (req,res) => {
    try {

      const {postId} = req.params
      userId = req.user.id

   
            // const post = await Post.findById(postId);
            // console.log(post);
            // if (!post) return res.status(404).json("post not found");
          //  if(post.user.toString() === userId){
            // await Post.updateOne({_id:postId},{$set:{text:req.body.text,edited:true}})

          await Post.updateOne({$and:[{_id:postId},{user:userId}]},{$set:{text:req.body.text,edited:true}})

            
            .then(()=> res.status(400).json({"status":true,"message":"Message Updated Successfully"}))

            .catch((err)=>{
              console.log(err);
                res.status(500).json({"status":false,"message":"some Error Occer"})
            })

            
            //   }else{

            //   res.status(400).json({"status":false,"message":"You can't delete this post"})

            // }


    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = editPost;