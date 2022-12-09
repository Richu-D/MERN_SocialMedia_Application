const User  =  require("../models/User.model.js")


const validateEmail = (email) => {
    return String(email)
      .match(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
  };
  
 const validateLength = (text, min, max) => {
  try {
    if (text.trim().length > max || text.trim().length < min) {
      return false;
    }
    return true;
 

  } catch (error) {
    console.log(error);
  }
};
 const validateUsername = async (username) => {
   let check = await User.findOne({ username });
  if(check!=null){
    return true;
  }else{
    return false;
  }
      
  }
module.exports = {
    validateEmail,
    validateLength,
    validateUsername
}