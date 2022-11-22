const jwt = require("jsonwebtoken")

exports.generateToken = (payload, secret, expired ) => {
  return jwt.sign(payload, secret, {
    expiresIn: expired,
  });
};



