const User =  require('../../models/User.model.js')
const Post = require("../../models/Post.model.js")

const profile = async (req, res) => {
    try {
      const userId = req.user.id;
  
      let user = await User.findById( userId ).select("-password")
      let followersList = await User.find({"_id":user.followers}).select(["username","picture","followers","first_name","last_name"])

      let followers = followersList.map(data => {
        let isAmFollowing = data.followers.includes(userId)
        return {...data._doc,"followers":isAmFollowing}
      })

      let following = await User.find({"_id":user.following}).select(["username","picture","first_name","last_name"])
      let posts = await Post.find({"user":user._id}).populate("user", "first_name last_name picture username gender")
      .sort({ createdAt: -1 });
      return res.status(200).json({...user.toObject(),posts,followers,following})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = profile;