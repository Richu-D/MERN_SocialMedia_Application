import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import {useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css"

const LoginForm = () => {
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
          const { data } =  await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/login`,
             formik.values
          )
          dispatch({ type: "LOGIN", payload: data });
          localStorage.setItem("admin",JSON.stringify(data))
          navigate("/"); 
        } catch (error) {
          setLoading(false);
          setError(error.response.data.message);
        }
      };
  return (
            <div className="login_wrap">              
                  <form onSubmit={formik.handleSubmit}>
                  <BarLoader width="100%" color="#1876f2" loading={loading} size={30} />
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
              
              {error && <div className="error_text">{error}</div>}
            </div>

  )
}

export default LoginForm