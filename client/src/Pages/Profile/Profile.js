
import { useEffect, useReducer, useState } from "react";
import  useInstance  from "../../axios/axiosInstance.js";
import Header from "../../components/header/Header.js";
import Cover from "./Cover.js";
import { profileReducer } from "../../functions/reducers.js";
import "./profile.css"
import ProfielPictureInfos from "./ProfilePictureInfos.js";
import ProfileMenu from "./ProfileMenu.js";
import Post from "../../components/post/post.js";




const Profile = () => {
  
  const instance = useInstance()
  const [refresh,setRefresh] = useState(false)

  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });

  
    useEffect(() => {
      getProfileInfo()
    },[refresh])
    
    const getProfileInfo = async () => {
      try {
        dispatch({
          type: "PROFILE_REQUEST",
        });
        const { data } =  await instance.get("profile")
        console.log(data);

          dispatch({
            type: "PROFILE_SUCCESS",
            payload: data,
          });
    
      } catch (error) {
        dispatch({
          type: "PROFILE_ERROR",
          payload: error.response.data.message,
        });
      }
    };
  
  return (
    <div className="profile">
    <Header page="profile" />
    <div className="profile_top">
      <div className="profile_container">
        <Cover cover={profile?.cover} />
        <ProfielPictureInfos  setRefresh={setRefresh} profile={profile} />
        <ProfileMenu />
      </div>
    </div>
    <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">

            <div className="profile_grid">
              <div className="profile_left"> some other datas came here</div>
              <div className="profile_right">
              
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post post={post} key={post._id} />
                    ))
                  ) : (
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default Profile 

