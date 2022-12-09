import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import useInstance from "../../axios/axiosInstance.js";

// import  useInstance  from "../../axios/axiosInstance.js";
const ProfileOfOther = () => {
  const navigate =  useNavigate()
  const instance = useInstance()

const {username } = useParams()
const {user} = useSelector((user)=>({...user}))

async function getUserInfo(){
  try { 
    const profileInfo = await instance.get(`/profile/${username}`)
    console.log(profileInfo.data.data);
     } catch (error) {
       console.log("error is ",error.response?.data?.message);
     }
}
// console.log(username,user?.username);
useEffect(() => {
  if(username === user?.username || username === "undefined" ){
    navigate("/profile")
  }else{
    getUserInfo()
  }
}, [username])

  return (
    <div>Profile of other</div>
  )
}

export default ProfileOfOther 