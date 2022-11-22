import {Routes , Route} from "react-router-dom"
import Login from "./Pages/Login.js";
import Profile from "./Pages/Profile.js";
import Home from "./Pages/Home.js";

const App = () => {
  return <div>

    <Routes>
      <Route path="/" element={<Home/>} exact />
      <Route path="/login" element={<Login/>} exact />
      <Route path="/profile" element={<Profile/>} exact />
    </Routes>

  </div>;
};

export default App;