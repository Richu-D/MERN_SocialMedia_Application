import { Feeling, LiveVideo, Photo } from "../../svg";
import "./createPost.css";
import defaultProfilePic from "../../images/default_profile.png"
import { useSelector } from "react-redux";
import CreatePostPopup from "../createPostPopup/CreatePostPopup"
import { useState } from "react";
export default function CreatePost({setReloadPost}) {
  let { user } = useSelector((user) => ({ ...user }));
 const [postVisiblity,setPostVisiblity] = useState(false)
 
  return (
    <>
   {(postVisiblity)?<CreatePostPopup setReloadPost={setReloadPost} setPostVisiblity={setPostVisiblity} user={user}/>:null} 
    <div className="createPost">
      <div className="createPost_header">
        <img src={(user?.picture)}
        onError={(e) => {
          e.target.src = defaultProfilePic;
        }}
        alt="profile" />
        <div className="open_post hover2" onClick={()=>{setPostVisiblity(true)}}>
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
    </>
  );
}
