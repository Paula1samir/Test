import React from "react";
import {  Routes, Route } from 'react-router-dom';

import Login from "./components/Login";
import Signup from "./components/SignUp";
import LoginAdmin from "./components/Admin/LoginAdmin";
import SignUpAdmin from "./components/Admin/SignUpAdmin";
import ForgetPassword from "./components/ForgetPass/Forget-Password";
import SupLogin from "./components/supplier/SupLogin";
import Header from '../Header_Footer/header.jsx'
import Footer from '../Header_Footer/footer.jsx'
import HomePage from "./HomePage/HomePage.jsx";
import ProductDetails from "./HomePage/ProductDetails.jsx";
import SuppDashboard from "./components/supplier/SuppDashboard.jsx";
import AddProduct from "./components/supplier/AddProduct.jsx";
import EditProduct from "./components/supplier/EditProduct.jsx";
import LivePurchase from "./components/supplier/LivePurchase.jsx";
import OrderStatus from "./components/supplier/OrderStatus.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forget-Password" element={<ForgetPassword />} />
        <Route path="/SupLogin" element={<SupLogin />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/SignUpAdmin" element={<SignUpAdmin />} />
        <Route path="/ProductDetails/:name" element={<ProductDetails />} />

        {/* Dashboard with nested routes */}
        <Route path="/SuppDashboard/*" element={<SuppDashboard />}>
          <Route path="add" element={<AddProduct />} />
          <Route path="edit" element={<EditProduct />} />
          <Route path="live" element={<LivePurchase />} />
          <Route path="order" element={<OrderStatus />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
