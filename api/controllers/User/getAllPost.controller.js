const postSchema = require("../../models/Post.model.js")
const getAllPost = async (req,res) =>{ 
// console.log(req.user);
    try {
      let allPostwithoutFilter = await postSchema.find().populate("user", "first_name last_name picture username gender isPrivate followers")
      .sort({ createdAt: -1 });
      
      let allPost = allPostwithoutFilter.filter(eachpost => {
        return !eachpost.user.isPrivate || eachpost.user.followers.includes(req.user.id)
      })
        res.json(allPost)
     }  catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
}



module.exports = getAllPost