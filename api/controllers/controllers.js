const { validateEmail, validateLength, validateUsername } =  require('../helpers/validation.js')
const User =  require('../models/User.js')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {generateToken} = require('../helpers/token.js')
const  sendVerificationEmail = require('../helpers/mailer.js')
const validateDate = require("validate-date");
const sanitize = require('mongo-sanitize');

// Common Controllers



// User Controllers



const register = async (req,res)=>{

  

    try {
        let {
          first_name,
          last_name,
          email,
          username,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        } = req.body;

        if (!validateLength(first_name, 3, 30)) {
          return res.status(411).json({
            message: "first name must between 3 atleast characters.",
          });
        }
        if (!validateLength(last_name, 1, 30)) {
          return res.status(411).json({
            message: "last name must between 1 atleast characters.",
          });
        }
        
        if (!validateEmail(email)) {
            return res.status(400).json({
              message: "invalid email address",
            });
          }

          const check = await User.findOne({ email });

          if (check) {
            return res.status(409).json({
              message:
                "This email address already exists,try with a different email address",
            });
          }

          
          
          const isUsername = await validateUsername(username)
          
          if (isUsername){
            return res.status(409).json({
              message: "Username is already exist",
            });
          }
          
          if (password.length > 40 || password.length < 8) {
            return res.status(411).json({
              message: "password must be atleast 8 characters.",
            });
          }

          const isDoBValid = validateDate(`${bMonth}/${bDay}/${bYear}`)
  
          if(isDoBValid !== "Valid Date") return res.status(400).json({ message: isDoBValid });
          
          if(!["male","female","other"].includes(gender)) return res.status(400).json({ message: "Invalid gender" });

         
  
        
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
            process.env.EMAIL_TOKEN_SECRET,
            "30m"
          )
          const url = `${process.env.FRONTEND_BASE_URL}/activate/${emailVerificationToken}`;
          sendVerificationEmail(user.email, user.first_name, url);
          const token = generateToken({ id: user._id.toString() },process.env.TOKEN_SECRET, "7d");
          res.status(201).json({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: "Register Success ! please check your email to activate account",
          });

         } catch (error) {
          console.log(error);
          res.status(500).json({ message: error.message });
        }
    

};

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

const login = async (req, res) => {
  try {
    const email = sanitize(req.body.email);
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: `No User at this email '${email}'` });
    
    const check = await bcrypt.compare(password, user.password);
    if (!check) return res.status(401).json({ message: "Invalid credentials.Please try again." });
    
    const token = generateToken({ id: user._id.toString() },process.env.TOKEN_SECRET, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const findUser = async (req, res) => {
  try {
    const {email,Username} = req.query;

    const isvalidQuery = email || Username

    if (!isvalidQuery) return res.status(400).json({ message: "No email or username  is provided to search user" });

    const searchUser = (email)? {"email":email} : {"username":Username}

    let user = await User.findOne( searchUser ).select(["-password","-requests","-search","-savedPosts"]);

    if (!user || !user.verified) return res.status(404).json({ message: "Account does not exists." });

    if(!user.isPrivate) return res.status(200).json({data:user})

   const {
    _id,
    first_name,
    last_name,
    username,
    picture,
    isPrivate,
    following,
    followers,
    
    } = user._doc

      user = {
        _id,
      first_name,
      last_name,
      picture,
      isPrivate,
      username,
      "following":following.length,
      "followers":followers.length,
 }

    return res.status(200).json({data:user})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const makeAccountPrivate = async (req,res) => {
  try {
    id = req.user.id
    await User.findByIdAndUpdate(id,{"isPrivate":true}).then(()=>{
      res.status(202).json({"message":"Now account is private"})
    })
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: error.message });
  }
}

const makeAccountPublic = async (req,res) => {
  try {
    id = req.user.id
    await User.findByIdAndUpdate(id,{"isPrivate":false}).then(() => {
      res.status(202).json({"message":"Now account is Public"})
    })   
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: error.message });
  }
}




// Admin Controllers








module.exports = { 
  register,
  activateAccount , 
  login ,
  resendVerification,
  findUser,
  makeAccountPrivate,
  makeAccountPublic

};

