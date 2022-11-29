import "./header.css";
import { Link } from "react-router-dom";
import Logo from "../../images/ColorMediaLogo.jpg";
import default_profile from "../../images/default_profile.png"
import {
  ArrowDown,
  Menu,
  Messenger,
  Notifications,
  Search,
} from "../../svg";
import { useSelector } from "react-redux";


 const Header = () => {
  const { user } = useSelector((user) => ({ ...user }));
  
  const color = "#65676b";
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
          />
        </div>
      </div>
      <div className="header_middle">
        <Link to="/" className="middle_icon active">
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
      <Link to="/profile" className="profile_link hover1">
          <img src={(user?.profile)? user?.profile :default_profile} alt="Profile" />
          <span>{user?.first_name || "undifined"}</span>
        </Link>
        <div className="circle_icon hover1">
          <Menu />
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        <div className="right_notification">99+</div>          
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">8</div>
        </div>
        <div className="circle_icon hover1">
          <ArrowDown />
        </div>
      </div>
    </header>
  );
}

export default Header