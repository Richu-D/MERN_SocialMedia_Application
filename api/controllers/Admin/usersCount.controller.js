const User =  require('../../models/User.model.js')
const usersCount = async (req,res) => {
    try {
     let usersCount =  await User.aggregate([
   
      {
        $group:{
          _id:{ verified:"$verified"},
          count:{$sum:1}
       }    
      },{
        $project:{
          verified:"$_id.verified",
          count:"$count",
          _id:0
        }
      }
      ])
  res.status(202).json(usersCount)
    
  
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = usersCount;