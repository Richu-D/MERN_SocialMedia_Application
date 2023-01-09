import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Blocked from "../Pages/Blocked/Blocked";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux"


export default function LoggedInRoutes() {
  
  const dispatch = useDispatch()
  const socket= useRef()
  
  const { user } = useSelector((state) => ({ ...state }));
  const value = user?.id
  
  useEffect(() => {
    if(!user?.isBlocked && user?.verified){
      socket.current = io(process.env.REACT_APP_WS_URL)
      dispatch({type:"SOCKET",payload:socket})
    }
  }, [value])


  console.log("loggedinRouter",user);
  return (user?.isBlocked) ? <Blocked />
  :(user?.verified) ?  <Outlet />: <Navigate to="/login" />;
}
