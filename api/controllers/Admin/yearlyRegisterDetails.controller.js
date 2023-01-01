const User =  require('../../models/User.model.js')
const yearlyDetails = async (req,res) => {
    try {
     let yearlyDetails =  await User.aggregate([
      {$match:{"verified":true}},
      {
        $group:{
          _id:{ $year:"$createdAt"},
          AccountCreactionCount:{$sum:1}
       }    
      }
      // ,{
      //   $sort:{_id:1}
      // }
      ])
  res.status(202).json(yearlyDetails)
    
  
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = yearlyDetails;