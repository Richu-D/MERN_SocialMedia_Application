import "./ContentBody.css"
import LeftNavBar from "../LeftNavBar/LeftNavBar.js"
import User from "../Users/Users.js"
const UsersContent = () => {
  return (
    <div className="ContentBody">
        <div className="contents">
   <div className="left">
    <LeftNavBar/>
    </div>
   <div className="right">
     <User />
   </div>
  </div>
    </div>
  )
}

export default UsersContent