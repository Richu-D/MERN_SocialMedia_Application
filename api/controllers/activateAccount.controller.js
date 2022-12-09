const jwt = require("jsonwebtoken")
const User =  require('../models/User.model.js')

const activateAccount = async (req, res) => {

    try {
      const { token } = req.body;
    if(!token) return res.status(404).json({ message: "Token is not available" });
    
    const user = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);
    const check = await User.findById(user.id);
  
    // verifing same user sent the token
    if(req.user.id !== user.id) return res.status(401).json({ message: "You can't Authorized to activate this Account" });
  
    if (check.verified) return res.status(406).json({ message: "this email is already activated" });
  
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(202)
        .json({ message: "Account has been activated successfully." });
    
    } catch (error) {
            res.status(500).json({ message: error.message });
    }
  
    
  };

  module.exports = activateAccount;