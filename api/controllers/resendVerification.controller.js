const User =  require('../models/User.model.js')
const generateToken = require('../helpers/token.helper.js')
const  sendVerificationEmail = require('../helpers/mailer.helper.js')

const resendVerification = async (req, res) => {
    try {
      const id = req.user.id;
      const user = await User.findById(id);
      if (user.verified === true) return res.status(406).json({ message: "This account is already activated."});
      
      const emailVerificationToken = generateToken(
        { id: user._id.toString() },
        process.env.EMAIL_TOKEN_SECRET,
        "30m"
      );
      const url = `${process.env.FRONTEND_BASE_URL}/activate/${emailVerificationToken}`;
      sendVerificationEmail(user.email, user.first_name, url);
      return res.status(201).json({ message: "Email verification link has been sent to your email." });
  
    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = resendVerification;