import {Routes , Route} from "react-router-dom"
import Login from "./Pages/Login/Login.js";
import Profile from "./Pages/Profile/Profile.js";
import Blocked from "./Pages/Blocked/Blocked.js";
import Home from "./Pages/Home/Home.js";
import LoggedInRoutes from "./routes/LoggedInRoutes"
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes"
import Activate from "./Pages/Activate/Activate.js";
import ProfileOfOther from "./Pages/ProfileOfOther/ProfileOfOther.js";
import Message from "./Pages/Message/Message.js";

const App = () => { 
  return  <div>
  <Routes>
    <Route element={<LoggedInRoutes />}>
      <Route path="/message" element={<Message />} exact />
      <Route path="/profile" element={<Profile />} exact />
      <Route path="/profile/:username" element={<ProfileOfOther />}  />
      <Route path="/" element={<Home />} exact />
    </Route>
    <Route element={<NotLoggedInRoutes />}>
      <Route path="/activate/:token" element={<Activate />} exact />
      <Route path="/login" element={<Login />} exact />
    </Route>
  </Routes>
  
</div>
};

export default App;