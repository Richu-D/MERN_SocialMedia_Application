import axios from "axios";
import { useDispatch } from "react-redux";

export default function useInstance(){
  const dispatch = useDispatch();
  const instance = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL
  });
  
  
  instance.interceptors.request.use(
    (config) => {
      const user = JSON.parse(localStorage.getItem("user")); 
      const token = user?.token
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; 
      }
      return config;
    },
  (error) => {
    return Promise.reject(error);
  }
  );
  
  instance.interceptors.response.use(
    (res) => { 
      return res;
    },
    async (err) => {
      const originalConfig = err?.config;
      if (err?.response?.status === 401 && err?.response?.data?.message === "Invalid RefreshToken"){
        dispatch({
          type:"LOGOUT"
        })
      } else if (err?.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        
        try {
          let user = JSON.parse(localStorage.getItem("user")); 
          const refreshToken = user.refreshToken
          const rs = await instance.get("/refreshtoken", {
            headers:{
              refreshToken: refreshToken,
            }
          });          
          user = {...user,"token":rs.data.token}
          localStorage.setItem("user",JSON.stringify(user))
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }else if(err?.response?.status === 403 && err?.response?.data?.message === "User Blocked"){
       try {
        dispatch({
          type:"BLOCK"
        })
       } catch (error) {
        console.log(error);
       }
      }
       else if(err?.response?.status === 403  && err?.response?.data?.message === "User Logout"){
        dispatch({
          type:"LOGOUT"
        })
      }
      return Promise.reject(err);
    }
    );
    
    return instance;
  }