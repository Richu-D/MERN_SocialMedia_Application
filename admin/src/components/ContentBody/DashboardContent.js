import "./ContentBody.css"
import LeftNavBar from "../LeftNavBar/LeftNavBar.js"
import Dashboard from "../Dashboard/Dashboard"
const DashboardContent = () => {
  return (
    <div className="ContentBody">
        <div className="contents">
   <div className="left">
    <LeftNavBar/>
    </div>
   <div className="right">
     <Dashboard />
   </div>
  </div>
    </div>
  )
}

export default DashboardContent