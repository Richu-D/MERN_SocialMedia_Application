import { useState } from "react";
import LoginForm from "../../components/login/LoginForm";
import ResendMail from "../../components/resendVerificationMail/ResendMail";
import RegisterForm from "../Register/Register";
import "./login.css";
export default function Login() {
const [visible,setVisible] = useState(false)
const [reSendMailvisible,setreSendMailVisible] = useState(false)
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible}/>
        {visible && <RegisterForm setVisible={setVisible} setreSendMailVisible={setreSendMailVisible} />}
        {reSendMailvisible && <ResendMail />}
        
      </div>
    </div>
  );
}
