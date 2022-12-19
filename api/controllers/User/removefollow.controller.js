const User =  require('../../models/User.model.js')

const removefollow = async (req,res) => {
    try {
      id = req.user.id
      user = req.params.user
  
      if(id==user) return res.status(400).json({"message":"You can't remove yourself from followers list"})
  
      await User.updateOne( {"_id":id}, { $pull: { followers: user } }).then(async() => {
      await User.updateOne( {"_id":user}, { $pull: { following: id } }).then(() => {
          res.status(202).json({"message":"user removed from followers list Successfully"})
        })  
      })   
    
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }
  
module.exports = removefollow;  