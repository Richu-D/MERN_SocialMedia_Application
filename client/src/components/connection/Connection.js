import "./connection.css"
import defaultProfile from "../../images/default_profile.png"
import { Link } from "react-router-dom"
import useInstance from "../../axios/axiosInstance"
import styled from "styled-components"
import { useSelector } from 'react-redux';

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
const RemoveFollow = styled.button`
border:none;
background-color: rgba(0, 0, 0, 0.418);
color:white;
padding: 10px 15px;
border-radius: 50px;
cursor: pointer;
margin-right:10px;
&:hover {
 background-color: rgb(0 0 0 / 85%);
  }
`;



const Connection = ({
setReloadPost,
username,
picture,
first_name,
last_name,
followers = true,
_id,
ownerId,
following
}) => {
    const instance = useInstance()
    let { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="connection_container">
        <Link
          to={`/profile/${username}`}
          className="connection_header_left">
          <img src={picture||defaultProfile} alt="" />
          <div className="connection_header_col">
            <div className="connection_profile_username">
              {username}
            </div>
            <div className="connection_profile_name">
            {`${first_name} ${last_name}`} 
            </div>
          </div>
        </Link>
         
         <div >
           
           
            {followers
            ?
            <>
            {
              (user.id !== _id && !following)?


              <Unfollow onClick={ async ()=>{
                try {
                   await instance.patch(`/unfollow/${_id}`)

                   setReloadPost(prev => !prev)
                   } catch (error) {
                    console.log(error);
                   }
            }}>

                Unfollow
            </Unfollow>
            :""

            }
              </>
            
            : 
            <>

            {
              (user.id !== _id)
              ? <>
              {
                user.id === ownerId
                ? <RemoveFollow onClick={async()=>{
                  try {
                      await instance.patch(`/removefollow/${_id}`)
                      
                      setReloadPost(prev => !prev)
                  } catch (error) {
                      console.log(error);
                  }
                  setReloadPost(prev => !prev)
              }}>Remove</RemoveFollow> 
                :""
          
              }
              
               
        
            <Follow onClick={async()=>{
                try {
                    await instance.patch(`/follow/${_id}`)
                    
                    setReloadPost(prev => !prev)
                } catch (error) {
                    console.log(error);
                }
                setReloadPost(prev => !prev)
            }}>Follow</Follow> </>
              :""
            }
           
            
            </>
        }
         </div>
      
        
      </div>
  )
}

export default Connection