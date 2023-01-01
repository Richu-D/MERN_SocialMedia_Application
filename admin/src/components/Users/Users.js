import { useEffect, useState } from "react"
import useInstance from "../../axios/axiosInstance"
import "./Users.css"
import defaultProfilePic from "../../images/default_profile.png"



const Users = () => {
  const instance = useInstance()
  const [usersList,setUsersList] = useState(null)
  const [count,setCount] = useState(0)

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
  const handlePagination = async (skip)=>{
    console.log(skip);
    setCount(count+skip)
    if(count+skip>=0){
      try {
        let result = await instance.get(`/users?skip=${count+skip}`)
        console.log(result.data,"result");
        setUsersList(result?.data)
      } catch (error) {
        console.log("error is",error);
      }
    }else{
      setCount(0)
    }
    
  }
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
      <th>following</th>
      <th>followers</th>
       </tr>
       </thead>
       <tbody>
       
{
      usersList.map(user => {
        let color = user.verified ?"green":"red"
        return <tr key={user._id}>
          <td className="profilePic">
            <div className="User_profile_Wrapper" style={{
              backgroundColor:color
            }}>
            <img src={user.picture||defaultProfilePic} alt="profile"  />
            </div>
            </td>
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
          <td>{user.following.length}</td>
          <td>{user.followers.length}</td>
        </tr>
      })
  }
</tbody>
      </table>
      }
    <div className="usersTablePagination">
      <button className="userTablePrevBtn" onClick={()=>handlePagination(-8)}>Prev</button>
      <span>{(count/8||0)+1}</span>
      <button className="userTableNextBtn" onClick={()=>handlePagination(8)}>Next</button>
    </div>
    </div>
  )
}

export default Users