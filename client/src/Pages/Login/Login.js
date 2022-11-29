import { useState } from "react";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../Register/Register";
import "./login.css";
export default function Login() {
const [visible,setVisible] = useState(false)
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible}/>
        {visible && <RegisterForm setVisible={setVisible} />}
        
      </div>
    </div>
  );
}
