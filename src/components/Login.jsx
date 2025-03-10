import React from 'react'
import  './Login.css'
import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from 'axios';
const Login_URL = 'https://bulkify-back-end.vercel.app/api/v1/customers/login';
export default function Login() {
    const {setAuth} = useContext(AuthContext);
    const userRef=useRef();
    const errRef=useRef();
    const [email,setUser] = useState('');
    const [password,setPwd] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState(false);
  
    useEffect(()=>{
      userRef.current.focus();
    },[]);
    useEffect(()=>{
      setErrMsg('');
    },[email,password]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await axios.post(Login_URL, 
            { email, password },
            {
              headers: { 'Content-Type': 'application/json' }
            }
          );
      
          console.log(JSON.stringify(response?.data)); 
          const token = response?.data?.token;
          const roles = response?.data?.roles;
          setAuth({ email, password, roles, token });
          console.log(token);
          console.log(email, password);
          setUser('');
          setPwd('');
          setSuccess(true);
      
        } catch (err) {
          if (err.response) {
            // The request was made, and the server responded with a status code
            // that falls out of the range of 2xx
            if (err.response.status === 400) {
              setErrMsg('Invalid credentials');
            } else if (err.response.status === 401) {
              setErrMsg('Unauthorized');
            } else {
              setErrMsg(err.response.data?.message || 'An error occurred');
            }
          } else if (err.request) {
            // The request was made, but no response was received (network error)
            setErrMsg('Network Error');
          } else {
            // Something happened in setting up the request that triggered an Error
            setErrMsg('An error occurred');
          }
      
          errRef.current.focus();
        }
      };
      
  
return (
    <>
     {success ?(
         <section>
             <h1>Congratulations {email}, You're logged in!</h1>
             <br/>
             <p>
                 <a href="#">Go to Home</a>
             </p>
         </section>
     ):(
         <>
             <p ref={errRef} className={errMsg ? "errMsg" : "offScreen"} aria-live="assertive">{errMsg}</p>
             <div className="login-register">
             <form className="form" onSubmit={handleSubmit}>
                 <div className="button-container">
                     <button className="button-top active" disabled>
                         Sign In
                     </button>
                     <button className="button-top">Sign Up</button>
                 </div>
                 <div className="flex-column">
                    <label>Email </label>
                  </div>
                 <div className="input-group">
                     <input
                         type="email"
                         className='input'
                         placeholder="Enter your Email"
                         ref={userRef}
                         value={email}
                         onChange={(e)=>setUser(e.target.value)}
                     />
                     <br />
                 </div>
                 <div className="flex-column">
                    <label>Password </label>
                  </div>
                  <div className="inputForm">

                     <input
                         type="password"
                         className='input'
                         value={password}
                         onChange={(e)=>setPwd(e.target.value)}
                         placeholder="Enter your Password"
                     />

                  </div>
                  <div className="flex-row">
                    <div>
                      <input type="checkbox"></input>
                      <label>Remember me </label>
                    </div>
                    <span
                      className="span"
                      style={{ cursor: "pointer" }}
                    >
                      Forget Password
                    </span>
                  </div>
                     
                 <button className="button-bottom" type="submit">
                     Sign In
                 </button>
                 <button className="button-bottom">
                     Forget Password
                 </button>   
             </form>
              </div>
         </>
     )}
    </>
)
}
