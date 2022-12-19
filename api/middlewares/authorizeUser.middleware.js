const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model")

const authorizeUser = async (req, res, next) => {

  try {
    let token = req.header("Authorization")
    if(!token) return res.status(400).json({ message: "Token is not available" });
    
    token = token.split(" ")[1]
    if(!token) return res.status(417).json({ message: "Invalid Token" }); 
    
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ message: "Invalid Authentification"})
      let Blocked = await UserModel.findById(user.id).select("isBlocked")
      if(Blocked.isBlocked) return res.status(403).json({ message: "User Blocked" });
      req.user = user;
      console.log("Current User :",user.id);
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = authorizeUser;

