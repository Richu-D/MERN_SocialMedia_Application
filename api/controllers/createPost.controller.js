const PostSchema = require("../models/Post.model.js")
const UserSchema = require("../models/User.model.js")
const storage = require("../firebase/config.js")
const { v4 } = require("uuid")
const createPost = async (req,res) =>{ 
// console.log(req.user);
    try {
        console.log(req.body);
    //  

const file = req?.files?.image?.data
if(file){
const fileId = v4();
let storageRef = storage.ref(`/items/${fileId}`)
storageRef.put(file,{
  contentType: req.files.image.mimetype
}).then(() => storageRef.getDownloadURL()) // after upload, obtain the download URL
.then(
  (url) => {
    // persisted to storage successfully and obtained download URL
    let post =  PostSchema({
              user:req.user.id,
              image:url,
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
    // uploadTask.on(
    //   "state_changed",
    //   (error) => {
    //     console.log("Err Richu",error);
    //   },
    //  async () => {
    // await uploadTask.snapshot.ref.getDownloadURL().then(async(url) => {
    //     console.log("url is ",url);
    //   }
    //   )
    // }
    // )
    
     }  catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
}



module.exports ={
    createPost
} ;