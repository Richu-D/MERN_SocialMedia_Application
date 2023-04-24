import { useEffect, useState } from "react";
import useInstance from "../../axios/axiosInstance";
import "./resendMail.css";

const ResendMail = () => {

const [counter,setCounter] = useState("0m:10s")
const [resetCounter,setResetCounter] = useState(false)
const [success,setSuccess] = useState(null)
const [error,setError] = useState(null)
const Instance = useInstance()

useEffect(()=>{
let timer = 10; 
let minute,second;
    let counterInterval = setInterval(()=>{
        if(timer <= 0 ) { 
            setCounter("")

            return clearInterval(counterInterval)
        }
        timer = timer - 1;
        minute = Math.floor(timer / 60) 
        second = timer % 60;
        setCounter(`${minute}m : ${second}s`)
    },1000)
},[resetCounter])

async function handleResendMail(){
    try {
    let Result = await Instance.post("/resendVerification")   
    setError("")
    setSuccess(Result?.data?.message); 
    setResetCounter(prev => !prev)
        
    } catch (error) {
        console.log(error?.response?.data?.message,"error");
        setSuccess("");
        setError(error?.response?.data?.message)
        if(error?.response?.data?.message==="This account is already activated."){
            setTimeout(()=>{
                window.location.reload()
            },2500)
        }
    }
    
}

  return (
    <div className="blur">
        <div className="resendMailContainer">
           <div className="resendMailContent">
            <div className={success ?"result_success":"field-validation-Error"}>{(success)?success:error}</div>
            <h3>Resend Verification Mail</h3>
            <div style={{visibility:counter ?"":"hidden"}}>{counter||"placeholder"}</div>
            <button onClick={handleResendMail} disabled={counter ? "disabled" : ""} >Resend</button>
           </div>
        </div>
    </div>
  )
}

export default ResendMail