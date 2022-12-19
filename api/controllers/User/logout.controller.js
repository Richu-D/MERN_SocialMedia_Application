// const User =  require('../models/User.model.js')
const refreshTokenList = require("../../models/refreshToken.model.js")

const logout = async (req,res) => {
    try {
      id = req.user.id
     refreshTokenList.updateOne( {"_id":id}, { $set: { "refreshTokens":[] } }).then(async () => {
        res.status(200).json({message:"Logout Successfully"})
      })  
    
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }
  
module.exports = logout;  