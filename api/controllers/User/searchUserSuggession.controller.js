const User =  require('../../models/User.model.js')


const searchUserSuggession = async (req, res) => {
    try {
      let user = await User.find({ "username" : { $regex: `${req.params.pattern}`, $options: 'i' }}).select(["picture","username"])
      return res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = searchUserSuggession;