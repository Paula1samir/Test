import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "../src/components/Login.jsx";
import Signup from "./components/SignUp";
import LoginAdmin from "./components/Admin/LoginAdmin";
import SignUpAdmin from "./components/Admin/SignUpAdmin";
import ForgetPassword from "./components/ForgetPass/Forget-Password";
import SupSignUp from "./components/supplier/SupSignUp";
import Header from '../src/Header_Footer/header.jsx';
import Footer from '../src/Header_Footer/footer.jsx';
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

import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import ProductRequests from "./components/Admin/ProductRequests.jsx";
import Reports from "./components/Admin/Reports.jsx";
import HandleCustomer from "./components/Admin/HandleCustomer.jsx";
import HandleSuppliers from "./components/Admin/HandleSuppliers.jsx";
import HandleProducts from "./components/Admin/HandleProducts.jsx";

import CategoriesPage from './components/Categories/CategoriesPage';
import LiveProductPurchase from './components/LiveProductPurchase/LiveProductPurchase.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Forget-Password" element={<ForgetPassword />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/SignUpAdmin" element={<SignUpAdmin />} />
        <Route path="/ProductDetails/:name" element={<ProductDetails />} />
        <Route path="/CustomerProfile/*" element={<CustomerProfile />}>
        <Route path="orderhistory" element={<OrderHistory />} />
        </Route>
        <Route path="/SupSignUp" element={<SupSignUp />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/live-product/:id" element={<LiveProductPurchase />} />

        {/* Dashboard for Supplier with nested routes */}
        <Route path="/SuppDashboard/*" element={<SuppDashboard />}>
          <Route path="add" element={<AddProduct />} />
          <Route path="edit" element={<EditProduct />} />
          <Route path="live" element={<LivePurchase />} />
          <Route path="order" element={<OrderStatus />} />
          </Route>

        {/* Dashboard for Admin with nested routes */}
        <Route path="/AdminDashboard/*" element={<AdminDashboard />}>
          <Route path="categories" element={<Categories />} />
          {/* <Route path="categories" element={<Categories />} /> */}
          <Route path="product-requests" element={<ProductRequests />} />
          <Route path="reports" element={<Reports />} />
          <Route path="handle-customer" element={<HandleCustomer />} />
          <Route path="handle-suppliers" element={<HandleSuppliers />} />
          <Route path="handle-products" element={<HandleProducts />}/>
          <Route path="categories-page" element={<CategoriesPage />} />
        </Route>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
