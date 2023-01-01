const bcrypt = require("bcrypt")
const refreshTokenList = require("../../models/refreshToken.model.js")
// model
const User =  require('../../models/User.model.js')

// helpers
const { validateEmail, validateLength, validateUsername } =  require('../../helpers/validation.helper.js')
const  sendVerificationEmail = require('../../helpers/mailer.helper.js')
const generateToken = require('../../helpers/token.helper.js')


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
        
        if(!first_name||!last_name||!email||!username||!password||!bYear||!bMonth||!bDay||!gender) return res.status(411).json({
          message: "Please Enter All feilds",
        });

        if (!validateLength(first_name, 3, 15)) {
          return res.status(411).json({
            message: "first name must between 3 atleast characters.",
          });
        }
        if (!validateLength(last_name, 1, 15)) {
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

          if (!validateLength(username, 3, 15)) {
            return res.status(411).json({
              message: "username must between 3 atleast characters.",
            });
          }
          
          
          const isUsername = await validateUsername(username)
          
          if (isUsername){
            return res.status(409).json({
              message: "Username is already exist"
            });
          }

          if(password.length < 8) return res.status(411).json({ message: "password must be atleast 8 characters."});
          if(password.length > 15) return res.status(411).json({ message: "password must lessthan 15 characters."});
     
        
          
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
          const refreshToken = generateToken({ id: user._id.toString() },process.env.REFRESH_TOKEN,"7d");

          await new refreshTokenList({
            "_id": user._id,
            "refreshTokens":[refreshToken]
          }).save()

          res.status(201).json({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            isPrivate:user.isPrivate,
            message: "Register Success ! please check your email to activate account",
          });

         } catch (error) {
          console.log(error,"Register Error");
          res.status(500).json({ message: error.message }); 
        }
    

};


module.exports = register;
