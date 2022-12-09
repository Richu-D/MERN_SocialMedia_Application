const User =  require('../models/User.model.js')


const getProfile = async (req, res) => {
    try {
      const {username} = req.params;
  
      if (!username) return res.status(400).json({ message: "No username  is provided to search user" });
  
      let user = await User.findOne( {"username":username} ).select(["-password","-requests","-search","-savedPosts"]);
  
      if (!user || !user.verified) return res.status(404).json({ message: "Account does not exists." });
  
      if(user.isPrivate && user.followers.includes(req.user.id)) return res.status(200).json({data:user})
  
      if(!user.isPrivate) return res.status(200).json({data:user})
  
      // console.log({...user._doc});
  
      user = {
      "_id":user._id,
      "first_name":user.first_name,
      "last_name":user.last_name,
      "username":user.username,
      "picture":user.picture,
      "isPrivate":user.isPrivate,
      "following":user.following.length,
      "followers":user.followers.length,
      } 
  
      return res.status(200).json({data:user})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = getProfile;