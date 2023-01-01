import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import useInstance from '../../axios/axiosInstance';
let data = []

const WeeklyRegister = () => {
    const Instance = useInstance()
    const [success,setSuccess] = useState(false)
    useEffect(()=>{
      data = [];
      const getdashboardDetails = async () =>{
      try {
        setSuccess(false)
        let dashboardDetails = await Instance.get("/dashboardDetails")
        console.log(dashboardDetails.data,"dashboard Details");
        dashboardDetails.data.map(day => {
          console.log(day);
          
          switch (day._id) {
            case 1:
              data.push(
                {
                  "name": "Sunday",
                  "Daily Account Register Count": day?.AccountCreactionCount||0,
                }
              )
              break;
            case 2:
              data.push(
                {
                  "name": "Monday",
                  "Daily Account Register Count": day?.AccountCreactionCount||0,
                }
              )
           break;
            case 3:
              data.push(
                {
                  "name": "Tuesday",
                  "Daily Account Register Count": day?.AccountCreactionCount||0,
                }
              )
              break;
            case 4:
              data.push(
                {
                  "name": "Wednessday",
                  "Daily Account Register Count": day?.AccountCreactionCount||0,
                }
              )
              break;
            case 5:
              data.push(
                {
                  "name": "Thursday",
                  "Daily Account Register Count": day?.AccountCreactionCount||0,
                }
              )
              break;
            case 6:
              data.push(
                {
                  "name": "Friday",
                  "Daily Account Register Count": day?.AccountCreactionCount||0,
                },
              )
              break;
            case 7:
              data.push(
                {
                  "name": "Saturday",
                  "Daily Account Register Count": day?.AccountCreactionCount||0,
                }
              )
              break;
          
            default:
              break;
          }
    
        })
        setSuccess(true)
      } catch (error) {
        setSuccess(false)
        console.log(error);
      }
      
    }
      getdashboardDetails()
    },[])
  
  
  
    return (
      <>
      {
        success &&
      <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip  />
      <Legend />
      <Bar dataKey="Daily Account Register Count" fill="blue" />
    </BarChart>
      }
      </>
    )
}

export default WeeklyRegister