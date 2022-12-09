import { useFormik } from "formik";
import "./register.css"
import * as Yup from "yup"
import { useRef, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import useClickOutside from "../../helpers/clickOutside"

const RegisterForm = ({setVisible}) => {
  const element = useRef(null);
  useClickOutside(element,()=>{
    setVisible(false)
  })
    const dispatch = useDispatch();

    const usernameError = useRef()

    const yearTemp = new Date().getFullYear();
    const years = Array.from(new Array(100), (val, index) => yearTemp - index);
    const months = Array.from(new Array(12), (val, index) => 1 + index);
    const getDays = () => {
      return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    };
    const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const formik = useFormik({
    initialValues:{
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        bYear: new Date().getFullYear(),
        bMonth: new Date().getMonth() + 1,
        bDay: new Date().getDate(),
        gender: "",
    },
    onSubmit:(values)=>{
        registerSubmit()
    },
    validationSchema:Yup.object({
        first_name: Yup.string()
          .required("First Name is required")
          .min(3, "Fisrt name must atleast 3 characters.")
          .max(15, "Fisrt name must lessthan 15 characters.")
          .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
          last_name: Yup.string()
          .required("Last Name is required")
          .min(1, "Last name must atleast 1 characters.")
          .max(15, "Last name must lessthan 15 characters.")
          .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
          username: Yup.string()
          .required("Unique Username is require")
          .min(3, "Username must atleast 3 characters.")
          .max(15, "Username must lessthan 15 characters.")
          .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
        email: Yup.string()
          .required("Email Must required to register your account.")
          .email("Enter a valid email address."),
        
        password: Yup.string()
          .required("password must require (Enter a strong password)")
          .min(8, "Password must be atleast 8 characters.")
          .max(15, "Password can't be more than 15 characters"),
        
        gender:Yup.string().required("gender is Required")
      })
  })
  

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
         formik.values
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;

      
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        localStorage.setItem("user",JSON.stringify(rest))
        // navigate("/");
      }, 1000);
    } catch (error) {
        console.log("Error");
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };


  return (
    <div className="blur">
      <div className="register" ref={element}>
        <div className="register_header">
          <i className="fa-solid fa-xmark"  onClick={()=>setVisible(false)} />
          <h3>Register</h3>
        </div>
            <form onSubmit={formik.handleSubmit} className="register_form">
              <div className="reg_line">
                <div className="input_wrap">

                <input
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name} 
                />
                {formik.touched.first_name && formik.errors.first_name ? <div className="field-validation-Error">{formik.errors.first_name}</div> : <div className="field-validation-Error" style={{visibility:"hidden"}}>error</div>}
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name} 
                  />
                  {formik.touched.last_name && formik.errors.last_name ? <div className="field-validation-Error">{formik.errors.last_name}</div> : <div className="field-validation-Error" style={{visibility:"hidden"}}>error</div>}
              
          
                <input
                  type="text"
                  placeholder="email address"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email} 
                  />
                  {formik.touched.email && formik.errors.email ? <div className="field-validation-Error">{formik.errors.email}</div> : <div className="field-validation-Error" style={{visibility:"hidden"}}>error</div>}
               
              <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username} 
                  />
                  {formik.touched.username && formik.errors.username ? <div className="field-validation-Error">{formik.errors.username}</div> : <div ref={usernameError} className="field-validation-Error" style={{visibility:"hidden"}}>error</div>}
                <input
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                  {formik.touched.password && formik.errors.password ? <div className="field-validation-Error">{formik.errors.password}</div> : <div className="field-validation-Error" style={{visibility:"hidden"}}>error</div>}
              </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth 
                </div>
                <div className="reg_grid">
                  <select name="bDay" value={formik.values.bDay} onChange={formik.handleChange}>
                  {days.map((day, i) => (
                      <option key={i} 
                      value={day} 
                      >
                        {day}
                      </option>
                    ))}
                  </select>
                  <select name="bMonth" value={formik.values.bMonth} onChange={formik.handleChange} >
                    {months.map((month, i) => (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select name="bYear" value={formik.values.bYear} onChange={formik.handleChange}>
                    {years.map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender 
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label htmlFor="Other">
                  Other
                    <input
                      type="radio"
                      name="gender"
                      id="Other"
                      value="other"
                      onChange={formik.handleChange}
                    />
                  </label>
                </div>
              </div>
 {formik.touched.gender && formik.errors.gender ? <div className="field-validation-Error">{formik.errors.gender}</div> : <div className="field-validation-Error" style={{visibility:"hidden"}}>error</div>}

              <div className="reg_btn_wrapper">
                <button className="btn open_signup" type="submit">Sign Up</button>
              </div>
              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </form>
      </div>
    </div>
  );
}


export default RegisterForm
