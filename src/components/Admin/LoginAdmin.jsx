import React, { useRef, useEffect, useState, useContext } from "react";
import "../Login.css";
import "./LoginAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
const Login_URL = "https://bulkify-back-end.vercel.app/api/v1/admins/login";
export default function LoginAdmin() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
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
      localStorage.setItem("token", token); // Save token to local storage

      console.log(token);
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, token });

      setUser(""); // Clear the email field
      setPwd("");  // Clear the password field
      setSuccess(true); // Indicate success
      alert("Login Succefull");
    } catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.message)
      errRef.current.focus(); // Focus the error message
    }}
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Congratulations {email}, You're logged in As Admin!</h1>
          <br />
          <p>
            <Link to="/Login">Go to Home</Link>
          </p>
        </section>
      ) : (
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
                <div>
                  <input type="checkbox" />
                  <label>Remember me </label>
                </div>
                <Link to="/Forget-Password"
                  className="span"
                  style={{ cursor: "pointer" }}
                // onClick={() => setForgetPassword(true)}
                >
                  Forget Password
                </Link>
              </div>

              <button className="btn btn-success w-100 mt-4" type="submit">
                Sign In
              </button>
            </form>

          
            <p>
              Don't have an account?{" "}
              <Link to="/SignUpAdmin">Sign up now</Link>
            </p>
          </div>


        </>
      )}
    </>
  );
}
