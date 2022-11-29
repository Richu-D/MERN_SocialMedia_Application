import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  return (user==='null') ? <Navigate to="/login" />: <Outlet /> ;
}
