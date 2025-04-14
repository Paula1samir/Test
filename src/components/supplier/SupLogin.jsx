import React, { useRef, useState, useEffect, useContext } from "react";
import "../Login.css";
import { useNavigate } from "react-router-dom";
import SupForgetPassword from "./SupForgetPassword.jsx";
import SupSignUp from "./SupSignUp.jsx";
import AuthContext from "../context/AuthProvider.jsx";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const Login_URL = "https://bulkify-back-end.vercel.app/api/v1/suppliers/login";

function SupLogin() {
  const [showForgetPass, setForgetPass] = useState(false);
  const [showSignUp, setSignUp] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        Login_URL,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const SupplierToken = response?.data?.token;
      const roles = response?.data?.roles;

      setAuth({ email, password, roles, SupplierToken });

      // 🔐 Save to localStorage
      localStorage.setItem("SupplierToken", SupplierToken);
      console.log("SupplierToken: ", SupplierToken);
      localStorage.setItem("roles", JSON.stringify(roles)); // in case it's an array or object

      localStorage.setItem("supplier", JSON.stringify(response.data.supplier));
      navigate("/SuppDashboard"); // redirect to dashboard
      setUser("");
      setPwd("");
    } catch (err) {
      if (err.response) {
        if (err.response) {
          setErrMsg(err.response.data.message)
        }
        if (errRef.current) {
          errRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
      errRef.current.focus(); // Focus the error message
    }

  };

  if (showForgetPass) {
    return <SupForgetPassword />;
  }
  if (showSignUp) {
    return <SupSignUp />;
  }

  return (
    <>
        <>
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
          <div className="login-register">
            <h1>Sign In as Supplier</h1>
            <form className="form" onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                ref={userRef}
                value={email}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
              <div className="flex-row">
                <input type="checkbox" />
                <label>Remember me</label>
                <span onClick={() => setForgetPass(true)} style={{ cursor: "pointer" }}>Forget Password</span>
              </div>
              <button className="btn btn-success w-100 mt-4" type="submit">Sign In</button>
            </form>
            <p>Don't have an account? <span onClick={() => setSignUp(true)} style={{ cursor: "pointer" }}>Sign up now</span></p>
          </div>
        </>
      
    </>
  );
}
export default SupLogin;