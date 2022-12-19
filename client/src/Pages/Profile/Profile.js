
import { useEffect, useReducer, useState } from "react";
import  useInstance  from "../../axios/axiosInstance.js";
import Header from "../../components/header/Header.js";
import Cover from "./Cover.js";
import { profileReducer } from "../../functions/reducers.js";
import "./profile.css"
import ProfielPictureInfos from "./ProfilePictureInfos.js";
import ProfileMenu from "./ProfileMenu.js";
import Post from "../../components/post/post.js";
import { useSelector } from 'react-redux';
import Connection from "../../components/connection/Connection.js";
const Profile = () => {
  
  const instance = useInstance()
  const [reloadPost,setReloadPost] = useState(false)
  const [option,setOption] = useState("posts")

  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });

  
    useEffect(() => {
      getProfileInfo()
    },[reloadPost])
    
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
        <Cover setReloadPost={setReloadPost}  />
        <ProfielPictureInfos  setReloadPost={setReloadPost} profile={profile} />
        <ProfileMenu followingCount={profile?.following?.length||"0"} followersCount={profile?.followers?.length||"0"} option={option}  setOption={setOption}/>
      </div>
    </div>
    <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            {
              (option === "posts") 

              ? <div className="posts">
              {profile.posts && profile.posts.length ? (
                profile.posts.map((post) => (
                  <Post setReloadPost={setReloadPost} post={post} key={post._id} />
                ))
              ) : (
                <div className="no_posts">No posts available</div>
              )}
              </div>

              :(option === "about") 
              ?
              <div className="about_form">
               Bio  <input name="bio" type="text"/>  <br />
               Job <input name="job" /> <br />
               workplace <input name="workplace" type="text"/> <br />
              highSchool <input name="highSchool" type="text"/> <br />
              college <input name="college" type="text"/> <br />
              currentCity <input name="currentCity" type="text"/> <br />
              hometown  <input name="hometown" type="text"/> <br />
              <label htmlFor="Relationship">relationship </label>
                <select name="Relationship" id="Relationship">
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="In a relationship">In a relationship</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
                <button>Submit</button>
              </div>
               
              :(option === "followers") 
              ?
              <div className="followers">
              {profile.followers.map(data => 
              <Connection ownerId={profile._id} setReloadPost={setReloadPost} key={data._id} {...data} />
              )}
              </div>

              :(option === "following") 
              ?
              <div className="following">
             {profile.following.map(data => 
              <Connection setReloadPost={setReloadPost} key={data._id} {...data} />
                )}
              </div>

              :"Some went Wrong"
            }
                
          </div>
        </div>
      </div>
  </div>
  )
}

export default Profile 

