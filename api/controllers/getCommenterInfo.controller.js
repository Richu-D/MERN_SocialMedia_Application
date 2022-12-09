const User = require("../models/User.model.js")

const getCommenterInfo=async (req, res) => {
    try {
      const {userId} = req.params
      console.log(userId);
    let result = await User.findById(userId).select(["username","picture"])

    console.log(result);
        res.status(200).json({"status":true,"result":result});
     
    } catch (err) {
      console.log(err);
      res.status(500).json({"status":false,"message":err.message});
    }
  }

  module.exports = getCommenterInfo
  