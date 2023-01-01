const User =  require('../../models/User.model.js')


const findUser = async (req, res) => {
    try {
      let user = await User.findById(req.params.userId).select(["picture","username"])
      return res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = findUser;