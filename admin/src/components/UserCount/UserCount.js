import { useEffect, useState } from "react"
import useInstance from "../../axios/axiosInstance"
import "./userCount.css"

const UserCount = () => {
    const Instance = useInstance()
    const [success,setSuccess] = useState(false)
    const [usersCount,setUsersCount] = useState({})
    useEffect(() => {
    const userCount = async () =>{
        setSuccess(false)
        try {
            let userCount = await Instance.get("/usersCount")
            console.log(userCount.data);
            setUsersCount(userCount.data)
            setSuccess(true)
            
        } catch (error) {
            console.log(error.response.data);

        }
    }
    userCount()
    }, [])
    
  return (
    <div>
        {
            success && (
                <div className="AccountCounterContainer">
               {usersCount.map(data =>
            <div>
             <div className="AccountCountHeading"> {(data.verified) ? "Verified": "Non Verified"} Account </div> 
              <div className="AccountCount">
              {data.count}
              </div> 
               </div>
               )}
                </div>
            )
        }
    </div>
  )
}

export default UserCount