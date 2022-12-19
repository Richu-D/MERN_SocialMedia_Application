const User =  require('../../models/User.model.js')
const Unblock = async (req,res) => {
    try {
     let {userId }= req.params
     console.log(userId,"userId");
      await User.updateOne( {"_id":userId}, { $set: { isBlocked: false } }).then(async () => {

          res.status(202).json({"message":"User Unlocked successfully"})
       
      })   
  
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = Unblock;