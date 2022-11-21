const { validateEmail, validateLength, validateUsername } =  require('../helpers/validation.js')
const User =  require('../models/User.js')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {generateToken} = require('../helpers/token.js')
const  sendVerificationEmail = require('../helpers/mailer.js')

// Common Controllers



// User Controllers



const register = async (req,res)=>{

  

    try {
        let {
          first_name,
          last_name,
          email,
          password,
          username,
          bYear,
          bMonth,
          bDay,
          gender,
        } = req.body;


        if (!validateEmail(email)) {
            return res.status(400).json({
              message: "invalid email address",
            });
          }

          const check = await User.findOne({ email });

          if (check) {
            return res.status(400).json({
              message:
                "This email address already exists,try with a different email address",
            });
          }
      
          if (!validateLength(first_name, 3, 30)) {
            return res.status(400).json({
              message: "first name must between 3 and 30 characters.",
            });
          }
          if (!validateLength(last_name, 3, 30)) {
            return res.status(400).json({
              message: "last name must between 3 and 30 characters.",
            });
          }
          if (!validateLength(password, 6, 40)) {
            return res.status(400).json({
              message: "password must be atleast 6 characters.",
            });
          }

         const isUsername = await validateUsername(username)
          
          if (isUsername){
            return res.status(400).json({
            message: "Username is already exist",
          });
          }

         password = await bcrypt.hash(password, 12);

        const user = await new User({
            first_name,
            last_name,
            email,
            password,
            username,
            bYear,
            bMonth,
            bDay,
            gender,
          }).save();

          const emailVerificationToken = generateToken(
            {id:user._id.toString()},
            "30m"
          )
          const url = `${process.env.FRONTEND_BASE_URL}/activate/${emailVerificationToken}`;
          sendVerificationEmail(user.email, user.first_name, url);
          const token = generateToken({ id: user._id.toString() }, "7d");
          res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: "Register Success ! please activate your email to start",
          });

         } catch (error) {
          console.log(error);
          res.status(500).json({ message: error.message });
        }
    

};

const activateAccount = async (req, res) => {

  try {
    const { token } = req.body;
  if(!token) return res.status(400).json({ message: "Token is not available" });
  
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  const check = await User.findById(user.id);

  if (check.verified) return res.status(400).json({ message: "this email is already activated" });

    await User.findByIdAndUpdate(user.id, { verified: true });
    return res
      .status(200)
      .json({ message: "Account has beeen activated successfully." });
  
  } catch (error) {
          res.status(500).json({ message: error.message });
  }

  
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          `No User at this email '${email}'`,
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials.Please try again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Login Successful ! ",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Admin Controllers








module.exports = { register , activateAccount , login};

