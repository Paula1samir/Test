import React, { useRef, useState, useEffect, useContext } from "react";
import "../Login.css";
import { useNavigate } from "react-router-dom";
import SupForgetPassword from "./SupForgetPassword.jsx";
import SupSignUp from "./SupSignUp.jsx";
import AuthContext from "../context/AuthProvider.jsx";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../alert.jsx";


const suppLogin_URL = "https://bulkify-back-end.vercel.app/api/v1/suppliers/login";

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
  const [showPassword, setShowPassword] = useState(false);

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
        suppLogin_URL,
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
        <Alert ref={errRef} errMsg={errMsg} setErrMsg={setErrMsg} />
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
            <div className="d-flex input-group" >
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                className="form-control"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPwd(e.target.value)}
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
              <span className="span" onClick={() => setForgetPass(true)} style={{ cursor: "pointer" }}>Forget Password ?</span>
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