const User  =  require("../models/User.js")


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
  };
 const validateLength = (text, min, max) => {
    if (text.trim().length > max || text.trim().length < min) {
      return false;
    }
    return true;
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