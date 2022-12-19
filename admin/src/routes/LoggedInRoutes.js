import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedInRoutes() {
  const { admin } = useSelector((admin) => ({ ...admin }));
  console.log("loggedinRouter",admin);
  return (admin) ?  <Outlet />: <Navigate to="/login" />;
}
