import { useState } from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "../../components/profielPicture/ProfilePicture.js";
import defaultProfilePic from "../../images/default_profile.png"


export default function ProfielPictureInfos({setRefresh}) { 
  const [show, setShow] = useState(false);
  let { user } = useSelector((user) => ({ ...user }));
  // console.log("profile is ",profile);
    return (
      <div className="profile_img_wrap">
         {show && <ProfilePicture setRefresh={setRefresh}  setShow={setShow}/>}
        <div className="profile_w_left">
          <div className="profile_w_img">
            <div
              className="profile_w_bg"
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${user?.picture||defaultProfilePic})`,
              }}
            ></div>
            <div className="profile_circle hover1">
              <i className="fa-solid fa-camera" onClick={()=>{setShow(prev => !prev)}}></i>
            </div>
          </div>
          <div className="profile_w_col">
            <div className="profile_name">
              {/* {profile.first_name} {profile.last_name} */}
            <div className="username">{user?.username}</div>
            </div>
            <div className="profile_friend_count"></div>
            <div className="profile_friend_imgs"></div>
          </div>
        </div>
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      </div>
    );
  }
  