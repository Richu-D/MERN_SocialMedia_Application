const postSchema = require("../models/Post.model.js")
const getAllPost = async (req,res) =>{ 
// console.log(req.user);
    try {
      let allPost = await postSchema.find().populate("user", "first_name last_name picture username gender")
      .sort({ createdAt: -1 });
    //    console.log(allPost);
        res.json(allPost)
     }  catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
}



module.exports = getAllPost