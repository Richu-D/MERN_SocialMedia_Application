import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  console.log("loggedinRouter",user);
  return (user?.verified) ?  <Outlet />: <Navigate to="/login" />;
}
