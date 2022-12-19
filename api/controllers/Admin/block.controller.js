const User =  require('../../models/User.model.js')
const block = async (req,res) => {
    try {
     let {userId }= req.params
     console.log(userId,"userId");
      await User.updateOne( {"_id":userId}, { $set: { isBlocked: true } }).then(async () => {
       
          res.status(202).json({"message":"User Blocked successfully"})
       
      })   
  
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = block;