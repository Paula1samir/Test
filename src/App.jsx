import React from "react";
import Login from "../src/components/Login";
import Signup from "../src/components/SignUp";
import ForgetPassword from "../src/components/ForgetPass/Forget-Password";
import SupLogin from "./components/supplier/SupLogin";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

function App() {
  // Hook to get the current location (route path)
  const location = useLocation();

  return (
    <>
      <div className="login-register">
        <div className="tab-switch">
          {/* Link for Login */}
          <Link
            to="/Login"
            className={`link ${location.pathname === '/Login' ? 'active' : ''}`}
          >
            Login
          </Link>

          {/* Link for Sign Up */}
          <Link
            to="/Signup"
            className={`link ${location.pathname === '/Signup' ? 'active' : ''}`}
          >
            Sign Up
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/Signup/*" element={<Signup />} />
        <Route path="/Login/*" element={<Login />} />
        <Route path="/Forget-Password" element={<ForgetPassword />} />
        <Route path="/SupLogin" element={<SupLogin />} />
      </Routes>
    </>
  );
}

export default App;
