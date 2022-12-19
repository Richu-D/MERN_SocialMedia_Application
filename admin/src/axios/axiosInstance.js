import axios from "axios";
import { useDispatch } from "react-redux";

export default function useInstance(){
  const dispatch = useDispatch();
  const instance = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL
  });
  
  
  instance.interceptors.request.use(
    (config) => {
      const admin = JSON.parse(localStorage.getItem("admin")); 
      const token = admin?.token
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
      if (err?.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        
        try {
          let admin = JSON.parse(localStorage.getItem("admin")); 
          const refreshToken = admin.refreshToken
          const rs = await instance.get("/refreshtoken", {
            headers:{
              refreshToken: refreshToken,
            }
          });          
          admin = {...admin,"token":rs.data.token}
          localStorage.setItem("admin",JSON.stringify(admin))
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      } else if(err?.response?.status === 403){
        dispatch({
          type:"LOGOUT"
        })
      }
      return Promise.reject(err);
    }
    );
    
    return instance;
  }