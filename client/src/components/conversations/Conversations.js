import "./Conversation.css"
import defaultImg from "../../images/default_profile.png"
import { useEffect, useState } from "react"
import useInstance from "../../axios/axiosInstance"

const Conversations = ({conversation,currentUser}) => {
 const Instance = useInstance()
const [user,setUser] = useState(null)


useEffect(() => {
  // console.log(conversation);
    try {
      const friendId = conversation.members.find((memberId)=>memberId!==currentUser)
      // console.log(friendId);
      // console.log(currentUser);
      const getUser = async ()=>{
      const res = await Instance.get(`/userPicAndName/${friendId}`)
      setUser(res.data)
      // console.log(res.data);
      }
      getUser()
    } catch (error) {
      console.log(error);
    }
  
}, [conversation,currentUser])

  return (
    <div className="conversation">
        <img src={user?.picture||defaultImg} alt="" className="conversationImg" />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversations