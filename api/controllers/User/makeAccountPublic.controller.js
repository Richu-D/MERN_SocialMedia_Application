const User =  require('../../models/User.model.js')

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

  module.exports = makeAccountPublic;