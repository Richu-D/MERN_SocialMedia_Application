const User =  require('../../models/User.model.js')

const editAbout = async (req, res) => {
try {
    console.log("From edit about",req.body);
    userId = req.user.id
    let x = await User.updateOne({_id:userId},{$set:{details:req.body}})
    console.log(x);
    res.status(200).json({"status":true,"message":"Message Updated Successfully"})

} catch (error) {
    console.log(error.stack);
      res.status(500).json({ message: error.message });
}
}

module.exports = editAbout;