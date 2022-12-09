import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Login from '../Login/Login';
import ActivateForm from './ActivateForm';

const Activate = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        let { user } = useSelector((user) => ({ ...user }));
        const [success, setSuccess] = useState("");
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);
        const {token} = useParams();
        useEffect(() => {
            activateAccount();
          },[]);

          const activateAccount = async () => {
            try {
              setLoading(true);
              const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/activate`,
                { token },
                {
                  headers: {
                    Authorization: `Bearer ${user?.token}`,
                  },
                }
              );
              setSuccess(data.message);
              localStorage.setItem("user", JSON.stringify({ ...user, verified: true }))
              
              dispatch({
                type: "VERIFY",
                payload: true,
              });
        
              setTimeout(() => {
                navigate("/");
              }, 3000);
            } catch (error) {
              console.log(error);
              if(error.response.status===401){
                setError("Please Log in to Verify this Account")
              }else{
                setError(error?.response?.data?.message||error);
              }
            }
          };


        return (

          <div className="home">

            {success && (
              <ActivateForm
                type="success"
                header="Account Verified"
                text={success}
                loading={loading}
              />
            )}
            {error && (
              <ActivateForm
                type="error"
                header="Account verification failed."
                text={error}
                loading={loading}
              />
            )}
            <div>
                <Login />
            </div>
          </div>
        );
      
}

export default Activate