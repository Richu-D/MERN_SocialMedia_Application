const refreshTokenList = require("../../models/refreshToken.model.js")
const jwt = require("jsonwebtoken");
const generateToken = require("../../helpers/token.helper.js");

const refreshToken = async (req,res) => {
    try {
      let refreshToken = req.header("refreshToken")

    if(!refreshToken) return res.status(400).json({ message: "refreshToken is not available" });
    
    let userId = jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.status(401).json({ message: "Invalid Authentification" });
       return user.id
      });
      
      let user =  await refreshTokenList.findById({"_id":userId})
      if(!user) return res.status(400).json({ message: "No user found" });
      
      let {refreshTokens} = user;
     if(!refreshTokens.includes(refreshToken)) return res.status(403).json({ message: "User Logout" });

     const token = generateToken({ id: userId },process.env.TOKEN_SECRET, "20s");

      res.json({token})

    } catch (error) {
      console.log(error.stack);
      res.json({ message: error.message });
    }
  }
  
module.exports = refreshToken;  