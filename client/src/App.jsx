import {Routes , Route} from "react-router-dom"
import Login from "./Pages/Login/Login.js";
import Profile from "./Pages/Profile/Profile.js";
import Home from "./Pages/Home/Home.js";
import LoggedInRoutes from "./routes/LoggedInRoutes"
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes"

const App = () => {
  return  <div>
  <Routes>
    <Route element={<LoggedInRoutes />}>
      <Route path="/profile" element={<Profile />} exact />
      <Route path="/" element={<Home />} exact />
    </Route>
    <Route element={<NotLoggedInRoutes />}>
      <Route path="/login" element={<Login />} exact />
    </Route>
  </Routes>
</div>
};

export default App;