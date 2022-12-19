const PostSchema = require("../../models/Post.model.js")
const UserSchema = require("../../models/User.model.js")
const storage = require("../../firebase/config.js")
const { v4 } = require("uuid")
const updateProfile = async (req,res) =>{ 
// console.log(req.user);
    try {
const file = req?.files?.image?.data
if(file){
const fileId = v4();
let storageRef = storage.ref(`/profile/${fileId}`)
storageRef.put(file,{
  contentType: req.files.image.mimetype
}).then(() => storageRef.getDownloadURL()) 
.then(
  (url) => {
    let post =  PostSchema({
              user:req.user.id,
              image:url,
              ...req.body
          })
          post.save(async (err,result)=>{
              if(err) return console.log("err",err)
              await UserSchema.updateOne( {"_id":req.user.id}, { $push: { posts: result._id} })
              await UserSchema.updateOne( {"_id":req.user.id}, { $set: { "picture": url} })
              console.log(url);
          })
    res
      .status(201)
      .json({
        "message": "Upload successful",
        "picture":url
      });
  },
  (err) => {
    // failed to save to storage
    console.log(err);
    res
         .status(500)
         .json({
           "message": "Upload failed"
         });
     }
   )

  }else {
    try {
      let post =  PostSchema({
        user:req.user.id,
        ...req.body
    })
    post.save(async (err,result)=>{
        if(err) return console.log("err",err)
        console.log("user",result._id);
        await UserSchema.updateOne( {"_id":req.user.id}, { $push: { posts: result._id} })
    })
res
.status(201)
.json({
  "message": "Upload successful"
});
    } catch (error) {
      console.log(error);
    }
  }
    
     }  catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
}



module.exports = updateProfile