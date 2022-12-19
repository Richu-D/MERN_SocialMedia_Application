import { useEffect, useState } from "react"
import useInstance from "../../axios/axiosInstance"
import "./Users.css"
import defaultProfilePic from "../../images/default_profile.png"



const Users = () => {
  const instance = useInstance()
  const [usersList,setUsersList] = useState(null)

  async function handleBlock(userId){
    console.log(userId)
    let result = await instance.patch(`/block/${userId}`)
    console.log(usersList);
    console.log(result);
    setUsersList(prev => prev.map(user => {
      if(user._id === userId){
        return {...user,isBlocked:true}
      }
      return user
    }))
  }
  
  async function handleUnblock(userId){
    console.log(userId)
    let result = await instance.patch(`/unblock/${userId}`)
    console.log(result);
    setUsersList(prev => prev.map(user => {
      if(user._id === userId){
        return {...user,isBlocked:false}
      }
      return user
    }))
  }

  useEffect(() => {
    async function fetchUser(){
      try {
        let result = await instance.get("/users")
        console.log(result.data,"result");
        setUsersList(result?.data)
      } catch (error) {
        console.log("error is",error);
      }
    }
    fetchUser()
   
  },[])
  
  return (
    <div>
      {
      usersList && 
      <table className="userTable">
        <thead>
        <tr>
      <th>picture</th>
      <th>username</th>
      <th>email</th>
      <th>Birth Day</th>
      <th>operation</th>
      <th>verified</th>
      <th>following</th>
      <th>followers</th>
       </tr>
       </thead>
       <tbody>
       
{
      usersList.map(user => {
        return <tr key={user._id}>
          <td className="profilePic"><img src={user.picture||defaultProfilePic} alt="profile"  /></td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{`${user.bDay}/${user.bMonth}/${user.bYear}`}</td>
          <td>
            {
            (user.isBlocked)
            ?
            <button className="unblockbtn" onClick={()=>handleUnblock(user._id)}>
            Unblock
            </button>
            :
            <button className="blockbtn" onClick={()=>handleBlock(user._id)}>
            Block
            </button>
            }
            </td>
          <td>{`${user.verified}`}</td>
          <td>{user.following.length}</td>
          <td>{user.followers.length}</td>
        </tr>
      })
  }
</tbody>
      </table>
      }
    </div>
  )
}

export default Users