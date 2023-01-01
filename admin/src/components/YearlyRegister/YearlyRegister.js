// import React, { useEffect, useState } from 'react'
// import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
// import useInstance from '../../axios/axiosInstance'

// let data = []
  

// const MonthlyRegister = () => {
//     const Instance = useInstance()
//         const [success,setSuccess] = useState(true)
//         useEffect(()=>{
//           data = [];
//         const getMonthlyRegisterDetails = async () =>{
//                   try {
//                     setSuccess(false)
//                     let monthlyRegisterDetails = await Instance.get("/monthlyRegisterDetails")
//                     console.log(monthlyRegisterDetails.data,"dashboard Details");
//                     monthlyRegisterDetails.data.map(month => {
//                                   console.log(month);
                                  
//                                   switch (month._id) {
//                                     case 1:
//                                       data.push(
//                                         {
//                                           "name": "January",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                       break;
//                                     case 2:
//                                       data.push(
//                                         {
//                                           "name": "February",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                    break;
//                                     case 3:
//                                       data.push(
//                                         {
//                                           "name": "March",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                       break;
//                                     case 4:
//                                       data.push(
//                                         {
//                                           "name": "April",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                       break;
//                                     case 5:
//                                       data.push(
//                                         {
//                                           "name": "May",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                       break;
//                                     case 6:
//                                       data.push(
//                                         {
//                                           "name": "June",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         },
//                                       )
//                                       break;
//                                     case 7:
//                                       data.push(
//                                         {
//                                           "name": "July",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                       break;
//                                     case 8:
//                                       data.push(
//                                         {
//                                           "name": "August",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                       break;
//                                     case 9:
//                                       data.push(
//                                         {
//                                           "name": "September",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                       break;
//                                     case 10:
//                                       data.push(
//                                         {
//                                           "name": "October",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                       break;
//                                     case 11:
//                                       data.push(
//                                         {
//                                           "name": "November",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                       break;
//                                     case 12:
//                                       data.push(
//                                         {
//                                           "name": "December",
//                                           "Monthly Account Creation Count": month?.AccountCreactionCount||0,
//                                         }
//                                       )
//                                       break;
                                  
//                                     default:
//                                       break;
//                                   }
                            
//                                 })
//                     setSuccess(true)

                  
                
//             } catch (error) {
//                 setSuccess(false)
//         console.log(error.response.data);
//             }
//         }
//         getMonthlyRegisterDetails()
//         },[])
//   return (
//     <>
//       {
//         success &&
//     <AreaChart width={730} height={250} data={data}
//   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//   <defs>
//     <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//       <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
//       <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
//     </linearGradient>
//   </defs>
//   <XAxis dataKey="name" />
//   <YAxis />
//   <CartesianGrid strokeDasharray="3 3" />
//   <Tooltip />
//   <Area type="monotone" dataKey="Monthly Account Creation Count" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
// </AreaChart>
//     }
//     </>
//   )
// }

// export default MonthlyRegister

import React, { useEffect, useState } from 'react'
import { Pie, PieChart, Tooltip } from 'recharts';
import useInstance from '../../axios/axiosInstance';

// let data = [
//   {
//     "name": "Group A",
//     "value": 2400
//   },
//   {
//     "name": "Group B",
//     "value": 4567
//   },
//   {
//     "name": "Group C",
//     "value": 1398
//   },
//   {
//     "name": "Group D",
//     "value": 9800
//   },
//   {
//     "name": "Group E",
//     "value": 3908
//   },
//   {
//     "name": "Group F",
//     "value": 4800
//   }
// ];
   


const YearlyRegister = () => {
  const Instance = useInstance()
        const [success,setSuccess] = useState(true)
        const [data,setData] = useState([])
        useEffect(()=>{
        const getYearlyRegisterDetails = async () =>{
                  try {
                    setSuccess(false)
                    let yearlyRegisterDetails = await Instance.get("/yearlyRegisterDetails")
                    console.log(yearlyRegisterDetails.data,"dashboard Details");
                    setData(yearlyRegisterDetails.data)
                    setSuccess(true)
                  }
                  catch(error){
                    setSuccess(false)
                    console.log(error.response.data);
                  }
                }
                getYearlyRegisterDetails()
              },[])


  return (
    <>
    {
        success &&
    <PieChart width={300} height={250}>
  <Pie data={data} dataKey="AccountCreactionCount" nameKey="_id" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
  <Pie data={data} dataKey="AccountCreactionCount" nameKey="_id" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
  <Tooltip />
</PieChart>
}
  </>

  )
}

export default YearlyRegister