const Post =  require('../../models/Post.model.js')
const usersCount = async (req,res) => {
    try {
   let reportedPost = await Post.find({reports:{ $size:1 }}).populate("user","picture username gender")
     
  res.status(202).json(reportedPost)
    
  
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = usersCount;