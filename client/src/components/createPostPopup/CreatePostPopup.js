import { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import defaultPicture from "../../images/default_profile.png"
import useClickOutside from "../../helpers/clickOutside.js";
import BarLoader from "react-spinners/BarLoader";
// import storage from "../../firebase/config";
import  useInstance  from "../../axios/axiosInstance.js";
// import { v4 as uuidv4 } from 'uuid';
export default function CreatePostPopup({ user,setPostVisiblity,setReloadPost }) {
  let instance = useInstance() 
  const postPromt = useRef(null)
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState(null);
  const [success,setSuccess]= useState(null);
  const [err,setErr]= useState(null);
  const [loading,setLoading]= useState(false);

  useClickOutside(postPromt,()=>{
    setPostVisiblity(false)
  })

 async function  handlePost(){


    // console.log("text",text,"image",images);
    // /users/post/
    // let fileName = "Hello"
    // storage.ref(`/items/${fileName}`).put(images);
    // try {
      
    
  // if(images){
  //   const fileId = uuidv4();
  //   const uploadTask = storage.ref(`/items/${fileId}`).put(images);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       // setProcess(progress)
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //    async () => {
  //     uploadTask.snapshot.ref.getDownloadURL().then(async(url) => { 
        try {
          
var formData = new FormData();

images && formData.append("image",images)
text && formData.append("text",text)

if(text||images) {
  setLoading(true)
          let data = await instance.post("/post",
          formData,
         { headers: {
            'Content-Type': 'multipart/form-data'
          }}
          )
          if(data.status === 201){
            setSuccess(data.data.message)
            setLoading(false)
            setTimeout(() => {
              setPostVisiblity(false)
              setReloadPost(prev => !prev)
            }, 1000);
          }

}
          
        // } catch (error) {
        //   console.log("error",error);
        // }
      // })

      }
      // )
    
    // }else{
    //   try {
    //   //  console.log("token from local storage",getTokenFromLocalStorage())
    //     let data = await instance.post("/post",{
    //       text,
    //       "visibility":"public"
    //     })
        // console.log("data",data.data); 
        // alert("Uploaded successfully")
        
       catch (error) {
        setErr("Something Wrong Please Try after few time");
        setLoading(false)
        setTimeout(() => {
          setPostVisiblity(false)
        }, 2000);
      }
    }
      // } catch (error) {
      //     console.log("Error from firebase ",error);
      // }
  // }
  return (
    <div  className="blur">
      <div ref={postPromt}  className="postBox">
        <div className="box_header">
          <div  className="small_circle">
            <i  className="fa-regular fa-circle-xmark" onClick={()=>{setPostVisiblity(false)}} />
          </div>
          <span>Create Post</span>
        </div>
          <BarLoader color="#1876f2" loading={loading} width={500} size={50} />
        <div className="box_profile">
          <img src={user?.picture||defaultPicture} alt="Profile" className="box_profile_img" />
        
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
     
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev} 
          />
        )}
        <AddToYourPost setImages={setImages} setShowPrev={setShowPrev} />
 

    {
     (success) ?  <div className="successful-btn">{success}</div>
     : (err) ? <div className="err-btn">{err}</div>
     : <button className="post_submit" onClick={handlePost}>Post </button>
    }

      </div>
    </div>
  );
}
