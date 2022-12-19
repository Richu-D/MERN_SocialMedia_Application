const User =  require('../../models/User.model.js')
const Post = require("../../models/Post.model.js")

const getProfile = async (req, res) => {
    try {
      const {username} = req.params;
      const userId = req.user.id;
      
      if (!username) return res.status(400).json({ message: "No username  is provided to search user" });
      
      let user = await User.findOne( {"username":username} ).select(["-password","-requests","-search","-savedPosts","-email"]);
      
      if (!user || !user.verified) return res.status(404).json({ message: "Account does not exists." });

      
      let followersList = await User.find({"_id":user.followers}).select(["username","picture","followers","first_name","last_name"])

      let followers = followersList.map(data => {
        let isAmFollowing = data.followers.includes(userId)
        return {...data._doc,"followers":isAmFollowing}
      })
      console.log("Is am following",followers);
      
      
      let following = await User.find({"_id":user.following}).select(["username","picture","first_name","last_name"])
      let posts = await Post.find({"user":user._id}).populate("user", "first_name last_name picture username gender")
      .sort({ createdAt: -1 });

      let isAmFollowing = user.followers.includes(req.user.id)
      
      if(user.isPrivate && isAmFollowing) return res.status(200).json({...user.toObject(),posts,followers,following,"isAmFollowing":true})
      
      if(!user.isPrivate) return res.status(200).json({...user.toObject(),posts,following,followers,"isAmFollowing":isAmFollowing});
    
      user = {
      "_id":user._id,
      "first_name":user.first_name,
      "last_name":user.last_name,
      "username":user.username,
      "picture":user.picture,
      "isPrivate":user.isPrivate,
      "following":user.following.length,
      "followers":user.followers.length,
      "isAmFollowing":false
      } 
  
      return res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = getProfile;