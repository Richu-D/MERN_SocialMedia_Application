const User =  require('../../models/User.model.js')


const chatFriends = async (req, res) => {
  try {
    const users = await User.findById(req.user.id).select("chatFriends")
    const usersList = await Promise.all(
      users.chatFriends.map(userId=>{
        return User.findById(userId).select(["picture","username"])
      })
    )
 
   console.log(usersList,"user chat Friends");
    return res.status(200).json(usersList)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = chatFriends;