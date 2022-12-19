import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./LeftNavBar.css"

const LeftNavBar = () => {
  const navigate = useNavigate()
  let currentLocation = useLocation()
  return (
    <div className="LeftNavBar">
        <div onClick={()=>{navigate("/")}} className={(currentLocation.pathname==="/")?"selected":""}>Dashboard</div>
        <div onClick={()=>{navigate("/users")}} className={(currentLocation.pathname==="/users")?"selected":""}>Users</div>
        <div onClick={()=>{navigate("/reports")}} className={(currentLocation.pathname==="/reports")?"selected":""}>Reports</div>
    </div>
  )
}

export default LeftNavBar