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
import Categories from "./components/Categories/Categories.jsx";
import CustomerProfile from "./components/Customer/CustomerProfile.jsx";
import OrderHistory from "./components/Customer/OrderHistory.jsx";

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
        <Route path="/CustomerProfile/*" element={<CustomerProfile />}>
        <Route path="orderhistory" element={<OrderHistory />} />
        </Route>

        {/* Dashboard with nested routes */}
        <Route path="/SuppDashboard/*" element={<SuppDashboard />}>
          <Route path="add" element={<AddProduct />} />
          <Route path="edit" element={<EditProduct />} />
          <Route path="live" element={<LivePurchase />} />
          <Route path="order" element={<OrderStatus />} />
          <Route path="categories" element={<Categories />} />
          </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
