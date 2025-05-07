import React, { useRef, useEffect, useState, useContext } from "react";
import "../Login.css";
import "./LoginAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import Alert from "../alert";

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

      const AdminToken = response?.data?.token;
      localStorage.setItem("AdminToken", AdminToken); // Save token to local storage

      console.log("AdminToken : ", AdminToken);
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, AdminToken });
      localStorage.setItem("Admin", JSON.stringify(response.data.admin));
      console.log("Admin: ", response.data.admin);

      setUser(""); // Clear the email field
      setPwd("");  // Clear the password field
      setSuccess(true); // Indicate success
      alert("Login Succefull");
    } catch (err) {
      if (err.response) {
        setErrMsg(err.response.data.message)
        errRef.current.focus(); // Focus the error message
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Congratulations {email}, You're logged in As Admin!</h1>
          <br />
          <p>
            <Link to="/AdminDashboard">Go to Dashboard</Link>
          </p>
        </section>
      ) : (
        <>
          <div className="login-register">
            <Alert ref={errRef} errMsg={errMsg} setErrMsg={setErrMsg} />
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
                  {showPassword ? "🙈" : "👀"} {/* Icons for visibility toggle */}
                </span>
              </div>
              <div className="flex-row">
              
                <Link to="/Forget-Password"
                  className="span"
                  style={{ cursor: "pointer" }}
                // onClick={() => setForgetPassword(true)}
                >
                  Forget Password ?
                </Link>
              </div>
              <button className="btn btn-success w-100 mt-4" type="submit">
                Sign In
              </button>
            </form>
          </div>


        </>
      )}
    </>
  );
}
