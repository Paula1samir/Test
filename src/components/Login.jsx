import React, { useRef, useEffect, useState, useContext } from "react";
import "./Login.css";
import "./Login";
import SupLogin from './supplier/SupLogin';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import axios from "axios";
const Login_URL = "https://bulkify-back-end.vercel.app/api/v1/customers/login";
export default function Login() {
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
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, token });

      setUser(""); // Clear the email field
      setPwd("");  // Clear the password field
      setSuccess(true); // Indicate success
      alert("Login Succefull");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setErrMsg("Invalid credentials");
        } else if (err.response.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg(err.response.data?.message || "An error occurred");
        }
      } else if (err.request) {
        setErrMsg("Network Error");
      } else {
        setErrMsg("An error occurred");
      }
      errRef.current.focus(); // Focus the error message
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Congratulations {email}, You're logged in!</h1>
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

            <div className="or-text">OR</div>

            <Link className="btn btn-success w-100 mt-4"
              // onClick={() => setSupLogin(true)}
              to={'/SupLogin'}
              style={{ cursor: "pointer" }}
            >
              Sign in As Supplier
            </Link>

            <br />
            <br />

            <p>
              Don't have an account?{" "}
              <Link to="/Signup">Sign up now</Link>
            </p>
          </div>


        </>
      )}
    </>
  );
}
