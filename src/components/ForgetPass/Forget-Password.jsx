import React, { useState , useRef } from "react";
import "./ForgetPassword.css";
import Login from "../Login";
import SignUp from "../SignUp";
import axios from "axios";
import ResetPass from "../OTP/ResetPass";
const ForgetPass_URL = "https://bulkify-back-end.vercel.app/api/v1/customers/forgot-password";
const ForgetPassword = () => {
    const [showLogin, setLogin] = useState(false);
    const [showSignUp, setshowSignUp] = useState(false);
    const [showResetPass,setshowResetPass] =useState(false);
    const [email, setEmail] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const errRef = useRef(null);
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrMsg(""); // Clear error message
      setSuccessMsg(""); // Clear success message
  
      try {
        await axios.post(ForgetPass_URL, {
          email,
        });
        setSuccessMsg("Check your email for password reset instructions.");
        setEmail(""); // Clear email field after success
        setshowResetPass(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 404) {
          setErrMsg("Email not found.");
        } else {
          setErrMsg("Failed to send reset link.");
        }
        errRef.current.focus();
      }
    };
    if (showLogin) {
      return <Login />;
    }
    if (showSignUp) {
      return <SignUp />;
    }
    if(showResetPass === true){
      return <ResetPass />
    }  
    
    
    return (
      <>
        <div className="forget-password">
          <div className="form-container">
            <div className="logo-container">Forget Password ?</div>
            <p className="text-header">
              Enter the email address or mobile phone number associated with your
              bulkify account.
            </p>
      <p
      ref={errRef}
      className={`alert alert-danger ${errMsg ? 'd-block' : 'd-none'} text-center mx-auto`}
      aria-live="assertive"
      id="alert"
      style={{
        backgroundColor: "#ff4d4d", // Error background color (red)
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "90%", // Max width for responsiveness
        width: "400px",  // Default width on larger screens
        color: "#fff",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Add shadow for pop-up effect
      }}
    >
      
      {errMsg}
    </p>
  
            <form className="form1" action="" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                  type="email"
                  className="input form-control"
                  placeholder="Enter your Email"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  ref={errRef}
                />
                <br />
              </div>
              <div className="flex-row">
              <button class="btn btn-success w-100 mt-4" type="submit">Send Code</button>
              </div>
            </form>
                      
        {/* Display success message */}
        {successMsg && (
          <p className="success-message">
            {successMsg}
          </p>
        )}
            <div className="siginingLinks">
              <p className="signup-link">
                Don't have account?
                <a href="#" className="signup-link link" onClick={() => setshowSignUp(true)}
                style={{ cursor: "pointer" }}>
                  {" "}
                  Sign up now
                </a>
              </p>
              <p className="signup-link">
                Already have account?
                <a href="#" className="signup-link link"   onClick={() => setLogin(true)}
                style={{ cursor: "pointer" }}>
                  {" "}
                  Sign in now
                </a>
              </p>
            </div>
  
            <hr></hr>
            <p className="custService">
              You may contact Customer Service for help restoring access to your
              account.
            </p>
          </div>
        </div>
      </>
    );
}

export default ForgetPassword
