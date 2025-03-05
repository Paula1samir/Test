import React from 'react'
import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from '../api/axios';
const Login_URL = 'https://bulkify-back-end.vercel.app';
export default function Login() {
    const {setAuth} = useContext(AuthContext);
    const userRef=useRef();
    const errRef=useRef();
    const [user,setUser] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState(false);
  
    useEffect(()=>{
      userRef.current.focus();
    },[]);
    useEffect(()=>{
      setErrMsg('');
    },[user,pwd]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.get(Login_URL, 
            JSON.stringify({ user, pwd }), 
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );
      
          console.log(JSON.stringify(response?.data)); 
          const accessToken = response?.data?.accessToken;
          const roles = response?.data?.roles;
          setAuth(user, pwd, roles, accessToken);
          console.log(user, pwd);
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
             <h1>Congratulations {user}, You're logged in!</h1>
             <br/>
             <p>
                 <a href="#">Go to Home</a>
             </p>
         </section>
     ):(
         <>
             <p ref={errRef} className={errMsg ? "errMsg" : "offScreen"} aria-live="assertive">{errMsg}</p>
             <form className="form" onSubmit={handleSubmit}>
                 <div className="button-container">
                     <button className="button-top active" disabled>
                         Sign In
                     </button>
                     <button className="button-top">Sign Up</button>
                 </div>
                 <div className="input-container">
                     <input
                         type="email"
                         ref={userRef}
                         value={user}
                         onChange={(e)=>setUser(e.target.value)}
                         placeholder="Email"
                     />
                     <input
                         type="password"
                         value={pwd}
                         onChange={(e)=>setPwd(e.target.value)}
                         placeholder="Password"
                     />
                 </div>
                 <button className="button-bottom" type="submit">
                     Sign In
                 </button>
                 <button className="button-bottom">
                     Forget Password
                 </button>   
             </form>
         </>
     )}
    </>
)
}
