import "./ContentBody.css"
import LeftNavBar from "../LeftNavBar/LeftNavBar.js"
import Reports from "../Reports/Reports.js"
const ReportsContent = () => {
  return (
    <div className="ContentBody">
        <div className="contents">
   <div className="left">
    <LeftNavBar/>
    </div>
   <div className="right">
     <Reports />
   </div>
  </div>
    </div>
  )
}

export default ReportsContent