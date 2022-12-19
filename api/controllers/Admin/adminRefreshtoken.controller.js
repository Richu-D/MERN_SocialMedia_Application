
const jwt = require("jsonwebtoken");
const generateToken = require("../../helpers/token.helper.js");

const refreshToken = async (req,res) => {
    try {
      let refreshToken = req.header("refreshToken")

    if(!refreshToken) return res.status(400).json({ message: "refreshToken is not available" });
   
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.status(401).json({ message: "Invalid Authentification" });
       return user.id
      });
      

     const token = generateToken({ admin:true },process.env.TOKEN_SECRET, "30m");

      res.json({token})

    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }
  
module.exports = refreshToken;  