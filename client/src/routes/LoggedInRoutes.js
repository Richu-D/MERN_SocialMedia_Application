import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Blocked from "../Pages/Blocked/Blocked";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  console.log("loggedinRouter",user);
  return (user?.isBlocked) ? <Blocked />
  :(user?.verified) ?  <Outlet />: <Navigate to="/login" />;
}
