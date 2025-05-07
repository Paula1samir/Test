import React, { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/AuthProvider";
import axios from "axios";
import Alert from "./Alert.jsx";
const Login_URL = "https://bulkify-back-end.vercel.app/api/v1/customers/login";
const suppLogin_URL = "https://bulkify-back-end.vercel.app/api/v1/suppliers/login";
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
    setErrMsg("");
  
    try {
      // Try customer login first
      const customerResponse = await axios.post(
        Login_URL,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const token = customerResponse?.data?.token;
      const customer = customerResponse?.data?.customer;
  
      setAuth({ email, token });
      localStorage.setItem("Customer", JSON.stringify(customer));
      localStorage.setItem("CustomerToken", token);
      navigate("/CustomerProfile");
      return;
    } catch (err) {
      if (!err.response || err.response.status !== 401) {
        // If it's not an auth error, or there's no response at all, stop
        setErrMsg(err.response?.data?.message || "Customer login failed");
        return;
      }
    }
  
    try {
      // Try supplier login if customer login failed
      const supplierResponse = await axios.post(
        suppLogin_URL,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const token = supplierResponse?.data?.token;
      const supplier = supplierResponse?.data?.supplier;
      const roles = supplierResponse?.data?.roles;
  
      setAuth({ email, token, roles });
      localStorage.setItem("supplier", JSON.stringify(supplier));
      localStorage.setItem("SupplierToken", token);
      navigate("/SuppDashboard");
      return;
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Supplier login failed");
      errRef.current?.scrollIntoView({ behavior: "smooth" });
      errRef.current?.focus();
    }
  };
  
  return (
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
          href={'/LoginAdmin'}
          style={{ cursor: "pointer" }}
        >
          Sign in As Admin
        </a>
        <br />
        <p>
          Don't have an account?{" "}
          <a href="/Signup">Sign up now</a><br />
          <a href="/SupSignUp">Sign up now as Supplier</a>
        </p>
      </div>


    </>


  );
}
