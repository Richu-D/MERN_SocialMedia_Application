import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import useInstance from "../../axios/axiosInstance.js";
import ProfilePicture from "../../components/profielPicture/ProfilePicture.js";
import defaultProfilePic from "../../images/default_profile.png"



export default function ProfielPictureInfos({setReloadPost}) { 
  const Instance = useInstance()
  const makeAccountPublic = async () =>{
    try {
      let result = await Instance.patch("/makeAccountPublic")
      console.log(result.data.message);
      dispatch({
        type:"PUBLIC"
      })
    } catch (error) {
      console.log(error);
    }
  }

  const makeAccountPrivate = async () =>{
    try {
      let result = await Instance.patch("/makeAccountPrivate")
      console.log(result);
      dispatch({
        type:"PRIVATE"
      })
    } catch (error) {
      console.log(error);
    }
  }
  const [show, setShow] = useState(false);
  let { user } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch();
  // console.log("profile is ",profile);
  {console.log(user,"User from profile pictrue infos")}
    return (
      <div className="profile_img_wrap">
         {show && <ProfilePicture setReloadPost={setReloadPost}  setShow={setShow}/>}
        <div className="profile_w_left">
          <div className="profile_w_img"> 
            <img
              className="profile_w_bg"
              style={{
                backgroundSize: "cover",
                display:"block"
              }}
              src={user?.picture}
              onError={(e) => {
                e.target.src = defaultProfilePic;
              }}
              alt="profile"
            />
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
              {(user.isPrivate)
              ? <button className="publicAccountBtn" onClick={()=>makeAccountPublic()}>Make Account Public</button>
                : <button className="privateAccountBtn" onClick={()=>makeAccountPrivate()}>Make Account Private</button>
                }
          </div>
        </div>
      </div>
    );
  }
  