
import MonthlyRegister from "../MonthlyRegister/MonthlyRegister"
import UserCount from "../UserCount/UserCount"
import WeeklyRegister from "../WeeklyRegister/WeeklyRegister"
import YearlyRegister from "../YearlyRegister/YearlyRegister"
import "./Dashboard.css"



const Dashboard = () => {
  return(
    <div className="dashboardContainer">
    <WeeklyRegister/>
    <UserCount/>
    <MonthlyRegister />
    <YearlyRegister />
    </div>
  )
}

export default Dashboard


