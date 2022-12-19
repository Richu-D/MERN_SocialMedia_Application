import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/ColorMediaLogo.jpg";
import Swal from "sweetalert2"
import default_profile from "../../images/default_profile.png"
// import { io } from "socket.io-client";


import {
  Menu,
  Messenger,
  Notifications,
  Search,
} from "../../svg";
import { useDispatch, useSelector } from "react-redux";
import useInstance from "../../axios/axiosInstance.js";
import { useState } from "react";

 const Header = ({page}) => {
  const navigate = useNavigate()
  let instance = useInstance()
  const [searchText,setSearchText] = useState("")
  const { user } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch()
  
  const color = "#65676b";


//   const socket = io("ws://localhost:5000");
// socket.emit("welcome",{data:"hello from client"})
// socket.on("welcome",(data)=>{
//   console.log("Message from server",data);
// })
 

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
            }}
          
          />
        </div>
      </div>
      <div className="header_middle">
        <Link to="/" className={`middle_icon ${page === "home" ? "active" : "" } `}>
          <i className="fa-solid fa-house-user" style={{color:"#5ba95b",fontSize:"25px"}}/>
          {/* <HomeActive /> */}
        </Link>
        <Link to="/" className="middle_icon hover1">
          {/* <Friends color={color} /> */}
        <i className="fa-solid fa-user-group" style={{color:"#0092bf",fontSize:"25px"}}/>
          <div className="middle_notification">99+</div> 
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
          <img src={user?.picture ||default_profile} alt="Profile" />
          <span>{user?.username}</span>
        </Link>
        <div className="circle_icon hover1">
          <Menu />
        </div>
        <div  className={`circle_icon hover1 ${page === "message" ? "active_link" : ""}`} onClick={()=>{
            navigate("/message")
        }}>
          <Messenger />
        <div className={`${page === "message" ? "" : "right_notification"}`}>{`${page === "message" ? "" : "99+"}`}</div>          
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">8</div>
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
      </div>
    </header>
  );
}

export default Header