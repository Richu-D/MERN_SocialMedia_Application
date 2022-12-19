const User =  require('../../models/User.model.js')

const unfollow = async (req,res) => {
    try {
      id = req.user.id
      user = req.params.user
  
      if(id==user) return res.status(400).json({"message":"You can't unfollow your self"})
  
      await User.updateOne( {"_id":user}, { $pull: { followers: id } }).then(async () => {
        await User.updateOne( {"_id":id}, { $pull: { following: user } }).then(() => {
          res.status(202).json({"message":"unfollowed Successfully"})
        })   
      })  
    
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }
  
module.exports = unfollow;  