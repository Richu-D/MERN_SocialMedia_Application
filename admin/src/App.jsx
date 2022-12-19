import {Routes,Route} from "react-router-dom"
import Home from "./Pages/Home/Home";
import Users from "./Pages/Users/Users";
import Login from "./Pages/Login/Login";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import "./app.css"
import Reports from "./Pages/Reports/Reports";

const App = () => { 
  return  <div>
  <Routes>
    <Route element={<LoggedInRoutes />}>
      <Route path="/users" element={<Users />} exact />
      <Route path="/reports" element={<Reports />} exact />
      {/* <Route path="/profile/:username" element={<Profile />}  /> */}
      <Route path="/" element={<Home />} exact /> 
    </Route>
    <Route element={<NotLoggedInRoutes />}>
      {/* <Route path="/activate/:token" element={<Activate />} exact /> */}
      <Route path="/login" element={<Login />} exact /> 
    </Route>
  </Routes>
</div>
};

export default App;