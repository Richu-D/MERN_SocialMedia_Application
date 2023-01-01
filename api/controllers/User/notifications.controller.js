const NotificationModel =  require('../../models/Notification.model.js')

const notifications = async (req,res) => {
    try {
    let notificationsList = await  NotificationModel.find({userId:req.user.id}).populate("emiterId","picture username").populate("postId","image text").sort({createdAt:-1})
    console.log(notificationsList);
     return res.status(200).json(notificationsList)
    
    } catch (error) {
      console.log(error.stack);
      res.status(500).json({ message: error.message });
    }
  }
  
module.exports = notifications;  