import React, { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/AuthProvider";
import axios from "axios";
const Login_URL = "https://bulkify-back-end.vercel.app/api/v1/customers/login";
export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate(); // Initialize useNavigate at the top level

  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg(""); // Reset error message when email or password is modified
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        Login_URL,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response?.data?.token;
      console.log(token);
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, token });
      localStorage.setItem("Customer", JSON.stringify(response.data.customer)); // Store customer data in local storage
      navigate("/CustomerProfile"); // Use the navigate function to redirect
      localStorage.setItem("CustomerToken", token); // Store the token in local storage
    } catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.message)
      errRef.current.focus(); // Focus the error message
    }}
  };

  return (
        <>
          <div className="login-register">
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

            <form className="form" onSubmit={handleSubmit}>
              <div className="flex-column">
                <label>Email </label>
              </div>
              <div className="input-group">
                <input
                  type="email"
                  className="input form-control"
                  placeholder="Enter your Email"
                  ref={userRef}
                  value={email}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
                <br />
              </div>
              <div className="flex-column">
                <label>Password </label>
              </div>
              <div className="d-flex input-group" >
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  className="input form-control"
                  value={password}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="Enter your Password"
                  required
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? "🙈" : "👁"} {/* Icons for visibility toggle */}
                </span>
              </div>
              <div className="flex-row">  
                <a href="/Forget-Password"
                  className="span"
                  style={{ cursor: "pointer" }}
                // onClick={() => setForgetPassword(true)}
                >
                  Forget Password ?
                </a>
              </div>

              <button className="btn btn-success w-100 mt-4" type="submit">
                Sign In
              </button>
            </form>

            <div className="or-text">OR</div>

            <a className="btn btn-success w-100 mt-4"
              // onClick={() => setSupLogin(true)}
              href={'/SupLogin'}
              style={{ cursor: "pointer" }}
            >
              Sign in As Supplier
            </a>

            <br />

            <div className="or-text">OR</div>

            <a className="btn btn-success w-100 mt-4"
              href={'/LoginAdmin'}
              style={{ cursor: "pointer" }}
            >
              Sign in As Admin
            </a>
            <br />
            <p>
              Don't have an account?{" "}
              <a href="/Signup">Sign up now</a>
            </p>
          </div>


        </>
      
   
  );
}
