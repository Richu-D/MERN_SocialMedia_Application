const User =  require('../models/User.model.js')
const bcrypt = require("bcrypt")
const generateToken = require('../helpers/token.helper.js')
const sanitize = require('mongo-sanitize');

const refreshTokenList = require("../models/refreshToken.model.js")

const login = async (req, res) => {
    try {
      const email = sanitize(req.body.email);
      const password = req.body.password;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: `No User at this email '${email}'` });
      
      const check = await bcrypt.compare(password, user.password);
      if (!check) return res.status(401).json({ message: "Invalid credentials.Please try again." });
      
      const token = generateToken({ id: user._id.toString() },process.env.TOKEN_SECRET, "20s");
      const refreshToken = generateToken({ id: user._id.toString() },process.env.REFRESH_TOKEN,"7d");

      await refreshTokenList.updateOne({"_id":user._id},{$addToSet:{refreshTokens:refreshToken}})

      res.send({
        id: user._id,
        username: user.username,
        picture: user.picture,
        first_name: user.first_name,
        last_name: user.last_name,
        token,
        refreshToken,
        verified: user.verified,
        isBlocked:user.isBlocked
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = login;