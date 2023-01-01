const postSchema = require("../../models/Post.model.js")
const getAllPost = async (req,res) =>{ 
// console.log(req.user);
    try {
      let allPostwithoutFilter = await postSchema.find().populate("user", "first_name last_name picture username gender isPrivate followers")
      .sort({ createdAt: -1 });
      
      // console.log(allPostwithoutFilter); 
      let allPost = allPostwithoutFilter.filter(eachpost => {
        // if((false)|| true){
        //   return true
        // }
        if(!eachpost.reports.includes(req.user.id)){
          // console.log("post",eachpost.user._id.toString(),'me',req.user.id);
          if(!eachpost.user.isPrivate ||( (eachpost.user.isPrivate && eachpost.user.followers.includes(req.user.id)) || (eachpost.user._id.toString() === req.user.id) )){
            return true
          }
        }else {
          return false
        }

        // else if(eachpost.user._id === req.user.id){
        //   return true
        // }

        // else if(eachpost.user.followers.includes(req.user.id)){
        //   return true
        // }else{
        //   return false
        // }

        // return (
        //   !eachpost.reports.includes(req.user.id)  //no reported post 
        //  && !eachpost.user.isPrivate
        //  || eachpost.user._id === req.user.id 
        //  || eachpost.user.followers.includes(req.user.id)
        //  )
      })
      // console.log("allPost",allPost,"all post is");
        res.json(allPost)
     }  catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
}



module.exports = getAllPost