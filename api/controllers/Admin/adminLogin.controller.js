const generateToken = require('../../helpers/token.helper.js')


const login = async (req, res) => {
    try {
        console.log("hyy");
      const email = req.body.email;
      const password = req.body.password;

      if(email !== "richu@gmail.com" || password !== "12345678" ) return res.status(400).json({ message: "Invalid Entry" });


      
      const token = generateToken({ admin:true },process.env.TOKEN_SECRET, "30m");
      const refreshToken = generateToken({ admin:true },process.env.REFRESH_TOKEN,"7d");

      res.status(200).json({
        token,
        refreshToken,   
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = login;