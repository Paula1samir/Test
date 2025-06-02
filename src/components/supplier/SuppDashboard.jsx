import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import LivePurchase from "./LivePurchase";
import OrderStatus from "./OrderStatus";
import Logo from "../images/Layer_1.png";
import EditProductDetails from "./EditProductDetails";

const SidebarLayout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [supplier, setSupplier] = useState(null);

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    useEffect(() => {
        const storedSupplier = localStorage.getItem("supplier");
        if (storedSupplier) {
            setSupplier(JSON.parse(storedSupplier));
        }
    }, []);

    const SuuplierToken = localStorage.getItem("SuuplierToken");
    return (
        <div className="">
            <div className="d-flex ">
                {/* Fixed Sidebar Button for Mobile */}
                <button
                    className="btn btn-success rounded-circle position-fixed bottom-0 end-0 m-3 d-md-none z-1030"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>

                {/* Sidebar */}
                {sidebarVisible && (
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
                        style={{ zIndex: 1010 }}
                        onClick={toggleSidebar}
                    />
                )}
                <div
                    className={`sidebar bg-light col-12 col-md-2 p-3 ${sidebarVisible ? "d-block" : "d-none"} d-md-block`}
                    style={{ position: sidebarVisible ? "fixed" : "", zIndex: 1020, height: "100vh", overflowY: "auto" }}
                >
                    <img src={Logo} className="mb-4 img-fluid" alt="logo" />
                    <div className="nav flex-column">
                        <Link to="add" className="nav-link" onClick={() => setSidebarVisible(false)}>
                            Add Product
                        </Link>
                        <Link to="edit" className="nav-link" onClick={() => setSidebarVisible(false)}>
                            Edit Products
                        </Link>
                        <Link to="live" className="nav-link" onClick={() => setSidebarVisible(false)}>
                            Live Purchase Deals
                        </Link>
                        <Link to="order" className="nav-link" onClick={() => setSidebarVisible(false)}>
                            Order Status
                        </Link>
                        <Link
                            className="nav-link"
                            onClick={() => {
                                localStorage.removeItem("SupplierToken");
                                localStorage.removeItem("supplier");
                                window.location.href = "/Login";
                            }}
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            Log-out
                        </Link>
                    </div>
                </div>

                {/* Main content */}
                <div className="col py-3" style={{ width: "0" }}>
                    {/* Topbar */}
                    <div className="d-flex flex-row flex-md-row justify-content-between align-items-center mb-3">
                        <input type="text" className="mr-3 form-control mb-2 mb-md-0 w-100 w-md-50" placeholder="Search" />
                        <div className="d-flex align-items-center ms-md-3">
                            <div>
                                <strong>{supplier ? supplier.fullName : "Loading..."}</strong><br />
                                <small className="text-muted">Supplier</small>
                            </div>
                        </div>
                    </div>

                    {/* Dynamically rendered content via routing */}
                    <div className="p-3">
                        <Routes>
                            <Route path="add" element={<AddProduct supplierId={supplier?.id} />} />
                            <Route path="edit" element={<EditProduct supplierId={supplier?.id} />} />
                            <Route path="edit-product/:name" element={<EditProductDetails supplierId={supplier?.id} />} />
                            <Route path="live" element={<LivePurchase supplierId={supplier?.id} />} />
                            <Route path="order" element={<OrderStatus supplierId={supplier?.id} />} />
                            <Route path="*" element={<div>Select an option from the sidebar.</div>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarLayout;
