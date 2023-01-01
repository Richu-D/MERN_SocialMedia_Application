import "./chatOnline.css"
import defaultImg from "../../images/default_profile.png"
import { useEffect, useState } from "react"
import useInstance from "../../axios/axiosInstance"

const ChatOnline = ({onlineUsers,currentUser,setCurrentChat}) => {
  const [friends,setFriends] = useState([])
  const [onlineFriends,setOnlineFriends] = useState([])
  const Instance = useInstance()

  useEffect(() => {
  const getChatFriends = async ()=>{
    let res = await Instance.get("/chatFriends")
    console.log(res.data,"res");
    setFriends(res.data);

    }
    getChatFriends()
    
  }, [currentUser])

  useEffect(() => {
    // setOnlineFriends(friends?.filter((onlineUser => onlineFriends.includes(onlineUser?._id))))
    // console.log(onlineFriends);
  }, [])
  


  

  return (
    <div className="chatOnline">
      {onlineFriends.map(eachOnlineFriend => (
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img src={eachOnlineFriend.picture||defaultImg} alt="" className="chatOnlineImg" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{eachOnlineFriend?.username}</span>
        </div>
          ))}
    </div>
  )
}

export default ChatOnline