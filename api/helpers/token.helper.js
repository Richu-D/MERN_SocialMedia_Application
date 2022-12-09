const jwt = require("jsonwebtoken") 

const generateToken = (payload, secret, expired ) => {
  console.log("expired in ",expired);
  return jwt.sign(payload, secret, {
    expiresIn: expired,
  });
};

module.exports = generateToken;



