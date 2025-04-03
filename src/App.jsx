import React from "react";
import Login from "../src/components/Login";
import Signup from "../src/components/SignUp";
import LoginAdmin from "./components/Admin/LoginAdmin";
import SignUpAdmin from "./components/Admin/SignUpAdmin";
import ForgetPassword from "../src/components/ForgetPass/Forget-Password";
import SupLogin from "./components/supplier/SupLogin";
import Header from '../Header_Footer/header.jsx'
import Footer from '../Header_Footer/footer.jsx'
import HomePage from "./HomePage/HomePage.jsx";
import ProductDetails from "./HomePage/ProductDetails.jsx";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

function App() {
  // Hook to get the current location (route path)

  return (
    <>
    <Header />
      <Routes>
        <Route path="/Signup/*" element={<Signup />} />
        <Route path="/Login/*" element={<Login />} />
        <Route path="/Forget-Password" element={<ForgetPassword />} />
        <Route path="/SupLogin" element={<SupLogin />} />
        <Route path="/LoginAdmin" element ={<LoginAdmin />}/>
        <Route path="/SignUpAdmin" element ={<SignUpAdmin />}/>
        <Route path="/" element ={<HomePage />}/>
        <Route path="/ProductDetails/:name" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;