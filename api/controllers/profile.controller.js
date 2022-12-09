const User =  require('../models/User.model.js')
const Post = require("../models/Post.model.js")

const profile = async (req, res) => {
    try {
      const userId = req.user.id;
  
      let user = await User.findById( userId ).select("-password");
      let posts = await Post.find({"user":user._id}).populate("user", "first_name last_name picture username gender")
      .sort({ createdAt: -1 });
      return res.status(200).json({...user.toObject(),posts})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = profile;