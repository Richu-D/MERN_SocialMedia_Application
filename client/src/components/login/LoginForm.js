import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import Logo from "../../images/ColorMediaLogo.jpg"
import DotLoader from "react-spinners/DotLoader";
import {useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = ({setVisible}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues:{
          email:"",
          password:""
        },
        onSubmit:(values)=>{
          loginSubmit();
        },
        validationSchema:yup.object({
          email:yup.string()
          .email("Invalid Email Address")
          .required("Email is Required"),
          password:yup.string()
          .min(8,"password must be atleast 8 characters.")
          .max(15,"password must lessthan 15 characters.")
          .required("password is required")
        })
      })

      const loginSubmit = async () => {
        try {
          setError(false)
          setLoading(true);
          const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/login`,
             formik.values
          );
          dispatch({ type: "LOGIN", payload: data });
          localStorage.setItem("user",JSON.stringify(data))
          navigate("/");
        } catch (error) {
          setLoading(false);
          setError(error.response.data.message);
        }
      };
  return (
    <div className="login_wrap">
          <div className="login_1">
            <img src={Logo} alt="Logo" />
            <span>
              ColorMedia helps you connect and share with the people in your life.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">              
                  <form onSubmit={formik.handleSubmit}>
                    <div className="input_wrap">
                    <input 
                    name="email" 
                    type="email" 
                    placeholder="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}                    
                    />
                    {formik.touched.email && formik.errors.email ? <div className="field-validation-Error">{formik.errors.email}</div> : <div className="field-validation-Error" style={{visibility:"hidden"}}>error</div>}
                    </div>
                    <div className="input_wrap">
                    <input 
                    name="password" 
                    type="password" 
                    placeholder="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}                                        
                    />
                    {formik.touched.password && formik.errors.password ? <div  className="field-validation-Error">{formik.errors.password}</div> :<div className="field-validation-Error" style={{visibility:"hidden"}}>error</div>}
                    </div>
                    <button type="submit" className="btn">
                      Log In
                    </button>
                  </form>
              
              <Link to="/forgot" className="forgot_password">
                Forgotten password ?
              </Link>
              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              <div className="sign_splitter"></div>
              <button className="btn open_signup" onClick={()=>setVisible(true)}>Create Account</button>
            </div>
          </div>
        </div>
  )
}

export default LoginForm