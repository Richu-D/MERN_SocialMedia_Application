import { useState } from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "../../components/profielPicture/ProfilePicture.js";
import defaultProfilePic from "../../images/default_profile.png"


export default function ProfielPictureInfos({setReloadPost}) { 
  const [show, setShow] = useState(false);
  let { user } = useSelector((user) => ({ ...user }));
  // console.log("profile is ",profile);
    return (
      <div className="profile_img_wrap">
         {show && <ProfilePicture setReloadPost={setReloadPost}  setShow={setShow}/>}
        <div className="profile_w_left">
          <div className="profile_w_img">
            <div
              className="profile_w_bg"
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${user?.picture||defaultProfilePic})`,
              }}
            ></div>
            <div className="profile_circle hover1" onClick={()=>{setShow(prev => !prev)}}>
              <i className="fa-solid fa-camera" />
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

          <div className={`${(user.isPrivate)?"Private_Account_badge":"Public_Account_badge"}`}>
            <i className="edit_icon"></i>
            <span>{`${(user.isPrivate)?"Private":"Public"} Account`}</span>
          </div>
        </div>
      </div>
    );
  }
  