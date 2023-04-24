import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import useInstance from "../../axios/axiosInstance.js";
import Header from "../../components/header/Header.js";
import Post from "../../components/post/post.js";
import ProfileMenu from "../Profile/ProfileMenu.js";
import defaultProfilePic from "../../images/default_profile.png"
import Connection from "../../components/connection/Connection.js";
import styled from "styled-components";

const Follow = styled.button`
background-color: var(--blue-color);
border:none;
color:white;
padding: 10px 15px;
border-radius: 50px;
cursor: pointer;
&:hover {
 background-color: #0066ff;
  }
`;
const Message = styled.button`
background-color: #65d74f;
border:none;
color:white;
padding: 10px 15px;
border-radius: 50px;
cursor: pointer;
&:hover {
 background-color: #33bb19;
  }
`;

const Unfollow = styled.button`
border:none;
background-color: rgba(0, 0, 0, 0.418);
color:white;
padding: 10px 15px;
border-radius: 50px;
cursor: pointer;
&:hover {
 background-color: rgb(0 0 0 / 85%);
  }
`;

const ProfileOfOther = () => {
  const navigate =  useNavigate()
  const instance = useInstance()
  const [option,setOption] = useState("posts")

  const [profile,setProfile] = useState(null)
  const [reloadPost,setReloadPost] = useState(false)

const {username } = useParams()
const {user} = useSelector((user)=>({...user}))
useEffect(() => {
  if(username === user?.username || username === "undefined" ){
    navigate("/profile")
  }
}, [username])

useEffect(() => {

  async function getUserInfo(){
    try { 
      let  result = await instance.get(`/profile/${username}`)
      console.log("result of other user",result.data);
      setProfile(result?.data)
       } catch (error) {
         console.log("error is ",error.response?.data?.message);
         navigate("/")
       }
  }

  getUserInfo()

}, [username,reloadPost])



  return (
    <>
    { profile && 
    <div className="profile">
    <Header />
    <div className="profile_top">
      <div className="profile_container">
      <div className="profile_cover" >
        <img src={profile?.cover} className="cover" alt="" />
      </div>
      <div className="profile_img_wrap">
        <div className="profile_w_left">
          <div className="profile_w_img">
            <img
              className="profile_w_bg"
              style={{
                backgroundSize: "cover",
                display:"block"
              }}
              src={profile?.picture}
              onError={(e) => {
                e.target.src = defaultProfilePic;
              }}
              alt="profile"
            />
          </div>
          <div className="profile_w_col">
            <div className="profile_name">
            <div className="username">{profile?.username}</div>
            {/* <div>
              {profile.first_name} {profile.last_name}
            </div> */}
            </div>
            <div className="profile_friend_count"></div>
            <div className="profile_friend_imgs"></div>
          </div>
        </div>
        <div className="profile_w_right">

        <Message onClick={async ()=>{
          await instance.post("/conversations",{"receiverId":profile._id})
          navigate("/messenger")
        }}>Message</Message>
       
       {

          (profile.isAmFollowing)
          ?
          <Unfollow onClick={ async ()=>{
            try {
               await instance.patch(`/unfollow/${profile._id}`)

               setReloadPost(prev => !prev)
               } catch (error) {
                console.log(error);
               } }}>
                Unfollow
          </Unfollow>
          :
          <Follow onClick={async()=>{
            try {
                await instance.patch(`/follow/${profile._id}`)
                
                setReloadPost(prev => !prev)
            } catch (error) {
                console.log(error);
            }
            setReloadPost(prev => !prev)
        }}>Follow</Follow> 
       

}

          <div style={{display:"flex",alignItems:"center"}} className={`${(profile.isPrivate)?"Private_Account_badge":"Public_Account_badge"}`}>
            <span >{`${(profile.isPrivate)?"Private":"Public"} Account`}</span>
          </div>
        </div>
      </div>
        <ProfileMenu 
        followingCount={(profile.isAmFollowing || !profile?.isPrivate) ? (profile?.following?.length||"0") : profile.following }
        
        followersCount={(profile.isAmFollowing || !profile?.isPrivate) ? (profile?.followers?.length||"0") : profile.followers} 
        option={option}  setOption={setOption}
      /> 
      
      </div>
    </div>
   <div className="profile_bottom">
        <div className="profile_container">
  { (!profile.isPrivate || profile.isAmFollowing) ?
          <div className="bottom_container">
            {
              (option === "posts") 

              ? <div className="posts">
              {profile.posts && profile.posts.length ? (
                profile.posts.map((post) => (
                  <Post
                  setReloadPost={setReloadPost} 
                  post={post} key={post._id} 
                  />
                ))
              ) : (
                <div className="no_posts">No posts available</div>
              )}
              </div>

              :(option === "about") 
              ?
              <div className="about_Infos">
               Bio  
               Job    
                workplace
              highSchool
              college 
              currentCity 
              hometown 
              relationship 
               
              </div>
               
              :(option === "followers") 
              ?
              <div className="followers">
              {profile.followers.map(data => 
              <Connection 
              setReloadPost={setReloadPost} key={data._id} {...data} 
              />
              )}
             </div>

              :(option === "following") 
              ?
              <div className="following">
             {profile.following.map(data => 
              <Connection ownerId={profile._id} following={true}
              setReloadPost={setReloadPost} key={data._id} {...data} 
              />
                )}
              </div>

              :"Some went Wrong"
            }
                
                </div>
                : 
                
                  (option === "posts") 
    
                  ? <div className="no_posts">Post is not Available</div>
                  :(option === "about") 
                  ? <div className="no_posts">About is not Available</div>
                  :(option === "followers") 
                  ? <div className="no_posts">Followers list is not Available</div>
                  :(option === "following") 
                  ?<div className="no_posts">Following list is not Available</div>
                  :"Some went Wrong"
                
              }
          </div>
        </div>
  
  </div>
      }
      </>
  )
}

export default ProfileOfOther 

// {profileInfo.username}<br />
// {profileInfo.bDay}<br />
// {profileInfo.bMonth}<br />
// {profileInfo.bYear}<br />
// isprivate   {profileInfo.isPrivate}<br />
// {profileInfo.first_name} {profileInfo.last_name}<br />
// {profileInfo.picture}