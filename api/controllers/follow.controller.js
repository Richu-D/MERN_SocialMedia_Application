const User =  require('../models/User.model.js')
// need private account implementation
const follow = async (req,res) => {
    try {
      id = req.user.id
      user = req.params.user
  
      if(id==user) return res.status(400).json({"message":"You can't follow your self"})
  
      await User.updateOne( {"_id":user}, { $addToSet: { followers: id } }).then(async () => {
        await User.updateOne( {"_id":id}, { $addToSet: { following: user } }).then(() => {
          res.status(202).json({"message":"Now you are a follower"})
        })   
      })   
  
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = follow;