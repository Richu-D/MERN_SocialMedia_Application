import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/ColorMediaLogo.jpg";
import Swal from "sweetalert2"
import default_profile from "../../images/default_profile.png"
import Moment from "react-moment";


import {
  Messenger,
  Notifications,
  Search,
} from "../../svg";
import { useDispatch, useSelector } from "react-redux";
import useInstance from "../../axios/axiosInstance.js";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";


 const Header = ({page}) => {

   
   const [searchSuggession,setSearchSuggession] = useState(false)
  const [notificationIcon,setNotificationIcon] = useState(false)
  const navigate = useNavigate()
  let instance = useInstance()
  const [searchText,setSearchText] = useState("")
  const [msgCount,setMsgCount] = useState(0)
  const [usersList,setUsersList] = useState([])
  const [notificationList,setNotificationList] = useState([])
  const { user } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch()
  const suggessionPromt = useRef(null)
  useClickOutside(suggessionPromt,()=>{
    setSearchSuggession(false)
  })

  const color = "#65676b";
  
  const socket = useRef()
  useEffect(()=>{
    socket.current = user?.socket?.current;
    socket?.current?.on("getMessage", (data) => {
      setMsgCount(prev => prev+1)
    });
  },[])
  

  const searchUserSuggession = async (pattern)=>{
    // console.log(pattern);
    let suggestedUsers = await instance.get(`/searchUserSuggession/${pattern}`)
    // console.log(suggestedUsers.data);
    setUsersList(suggestedUsers.data)
  }

  const handleNotification = async ()=>{
    setNotificationIcon(prev=>!prev)
    if(!notificationIcon){
      try {
        let res = await instance.get(`/notifications`)
        console.log(res.data);
        setNotificationList(res.data)
      } catch (error) {
        console.log(error);
      }
      
    }
  }
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="logo-container">
            <img src={Logo} alt="" />
          </div>
        </Link> 
        <div className="search search1">
          <Search color={color} />
          <input
            type="text"
            placeholder="Search...."
            className="hide_input"
            value={searchText}
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                navigate(`/profile/${searchText}`)
              }
            }}
            onChange={(e)=>{
              setSearchText(e.target.value)
              setSearchSuggession(true)
              searchUserSuggession(e.target.value)
            }}
          
          />
        </div>
        {
          searchSuggession && 
          <div ref={suggessionPromt} className="search_suggession">
           <p>search suggesions</p> 
          {
           usersList && usersList?.map(eachUser => {
              // console.log(eachUser);
          return  (<div key={eachUser?._id} onClick={()=>{navigate(`/profile/${eachUser?.username}`)}} className="profile_suggession_container">
            <div className="profile_suggession_image">
              <img src={eachUser?.picture}
              onError={(e) => {
                e.target.src = default_profile;
              }}
              alt="" srcset="" />
            </div>
            <div className="profile_suggession_username">{eachUser?.username}</div>
           </div>)
            })
          }
           
            
            </div>
        }
        
      </div>
      <div className="header_middle">
        <Link to="/" className={`middle_icon ${page === "home" ? "active" : "" } `}>
          <i className="fa-solid fa-house-user" style={{color:"#5ba95b",fontSize:"25px"}}/>
          {/* <HomeActive /> */}
        </Link>
        <Link to="/" className="middle_icon hover1">
          {/* <Friends color={color} /> */}
        <i className="fa-solid fa-user-group" style={{color:"#0092bf",fontSize:"25px"}}/>
          {/* <div className="middle_notification">99+</div>  */}
        </Link>
        <Link to="/" className="middle_icon hover1">
        <i className="fa fa-bolt fa-fw" style={{color:"#0092bf",fontSize:"25px"}}/>
          
        </Link>
        <Link to="/" className="middle_icon hover1">
        <i className="fa-sharp fa-solid fa-snowflake"style={{color:"rgb(37 53 247 / 81%)",fontSize:"25px"}}/>

        </Link>
        <Link to="/" className="middle_icon hover1">
        <i className="fa-solid fa-music" style={{color:"rgb(52 0 136)",fontSize:"25px"}}/>
        </Link>
      </div>
      <div className="header_right">
      <Link to="/profile" className={`profile_link hover1 ${page === "profile" ? "active_link" : ""}`}>
          <img src={user?.picture}
          onError={(e) => {
            e.target.src = default_profile;
          }}
          alt="Profile" />
          <span>{user?.username}</span>
        </Link>
        
        <div  className={`circle_icon hover1 ${page === "message" ? "active_link" : ""}`} onClick={()=>{
            navigate("/messenger")
        }}>
          <Messenger />
          {
            msgCount ?
            <div className={`${page === "message" ? "" : "right_notification"}`}>
          {`${page === "message" ? "" : msgCount ? msgCount : ""}`}
          </div>   
          :""       
        }
        </div>
        <div className={`notification circle_icon hover1 ${notificationIcon ? "active_link" :""} `} onClick={()=>{handleNotification()}}>
          <Notifications />
          {/* <div className="right_notification">8</div>  */}
          {
          notificationIcon && 
          <div ref={suggessionPromt} className="notification_container">
           <p>Notifications </p> 
          {
           notificationList && notificationList?.map(eachNotification => {
              console.log(eachNotification);
          return  (
           <div className="postNotificationContainer">
            <div className="emiterImgAndNameContainer">
            <div className="Notification_image">
              <img 
               onClick={()=>{navigate(`/profile/${eachNotification?.emiterId?.username}`)}}
              src={eachNotification?.emiterId?.picture} 
              onError={(e) => {
                e.target.src = default_profile;
              }}
              alt="" srcset="" />
            </div>
            <div className="profile_suggession_username">{eachNotification?.emiterId?.username}</div>
            </div>
            <div className="postNotificationBody">
            <div className="PostNotificationHeader">
            <div className="PostNotificationHeading">
            <div className="NotificationMsg">{eachNotification?.text}</div>
            </div>
            <div className="NotificationTime">
               <Moment fromNow interval={30}>
                {eachNotification?.createdAt}
              </Moment>
            </div>
            </div>
            <div className="PostNotificationContentBody">
              {
                (eachNotification?.postId?.image)?
              <div className="PostNotificationImg">
              <img src={eachNotification?.postId?.image} alt="" srcset="" />
              </div>
                :""
              }
              
              <div className="PostNotificationText">
              <p>{eachNotification?.postId?.text}</p>
              </div>
            </div>
            </div>
           </div>
           )


            })
          }
           
            
            </div>
        }
        </div>
        
        <div className="circle_icon hover1"  onClick={
          ()=>{
      
          Swal.fire({
            title: 'Are you sure to logout ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
          }).then(async(result) => {
            if (result.isConfirmed) {
                await instance.patch("/logout")
                 localStorage.setItem("user",null)
                 dispatch({
                   type:"LOGOUT"
                 })
            }
          })
                 
          }
          
         }>
          <i className="fa-solid fa-right-from-bracket"/>
        </div>
        <div className="hamburgerMenu circle_icon hover1">
        <i className="fa-solid fa-bars"/>
        </div>
      </div>
    </header>
  );
}

export default Header