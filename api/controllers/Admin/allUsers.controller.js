const User = require("../../models/User.model")
const getAllUsers = async (req,res) =>{ 
// console.log(req.query.skip);
let skip = req.query.skip || 0
    try {
      let UsersList = await User.find().select("-password").skip(skip).limit(8)
      // console.log(UsersList,"All Users");
        res.json(UsersList)
     }  catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
}



module.exports = getAllUsers