const User =  require('../../models/User.model.js')
const dashboardDetails = async (req,res) => {
    try {
     let dashboardDetails =  await User.aggregate([
      {$match:{"verified":true}},
      {
        $match:{ createdAt:{ $lt:new Date(),$gt:new Date(new Date().getTime()-(24*60*60*1000*365))}}
      },
      {
        $group:{
          _id:{ $month:"$createdAt"},
          AccountCreactionCount:{$sum:1}
       }    
      }
      ,{
        $sort:{_id:1}
      }
      ])
  res.status(202).json(dashboardDetails)
    
  
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = dashboardDetails;