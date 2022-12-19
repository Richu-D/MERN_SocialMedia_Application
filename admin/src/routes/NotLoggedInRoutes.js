import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes() {
  const { admin } = useSelector((admin) => ({ ...admin }));
  console.log("notloggedinrouter",admin);
  return (admin) ?<Navigate to="/" />: <Outlet />  ;
}
