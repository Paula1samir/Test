import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination as MuiPagination, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";

const OrderHistory = () => {
    // State for orders and pagination
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalOrders: 0,
        limit: 10,
    });
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState("");
    const [cancelLoadingId, setCancelLoadingId] = useState(null);

    // Fetch order history from API
    useState(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setApiError("");
            try {
                const token = localStorage.getItem("CustomerToken");
                const res = await axios.get(
                    `https://bulkify-back-end.vercel.app/api/v1/customers/orders-history?page=${pagination.currentPage}&limit=${pagination.limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
                    { headers: { "Content-Type": "application/json", token } }
                );
                console.log('orders-history API response:', res);
                setOrders(res.data.data.orders || []);
                setPagination(res.data.data.pagination || pagination);
            } catch (error) {
                setOrders([]);
                setPagination(prev => ({ ...prev, totalPages: 1, totalOrders: 0 }));
                setApiError(
                    error.response?.data?.err?.join(", ") ||
                    error.response?.data?.msg ||
                    "Error fetching order history."
                );
            }
            setLoading(false);
        };
        fetchOrders();


        
        // Cancel purchase handler
        const handleCancelPurchase = async (orderId) => {
            if (!window.confirm("Are you sure you want to cancel this purchase?")) return;
            setCancelLoadingId(orderId);
            try {
                const Customertoken = localStorage.getItem("CustomerToken");
                await axios.delete(
                    `https://bulkify-back-end.vercel.app/api/v1/purchases/${orderId}/cancel`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            token: ` ${Customertoken}`
                        }
                    }
                );
                setCancelLoadingId(null);
                setPagination(prev => ({ ...prev })); // trigger useEffect
            } catch (error) {
                setCancelLoadingId(null);
                alert(
                    error.response?.data?.msg ||
                    error.response?.data?.err?.join(", ") ||
                    "Failed to cancel purchase."
                );
            }
        };
        
        
        // eslint-disable-next-line
    }, [pagination.currentPage, sortBy, sortOrder]);

        // Handle page change
        const handlePageChange = (_, value) => {
            setPagination(prev => ({ ...prev, currentPage: value }));
        };

    return (
        <div className="order-history-container">
            <h2>Order History</h2>
            {/* Sorting Controls */}
            <div className="d-flex align-items-center mb-3 gap-3">
                <FormControl size="small">
                    <InputLabel id="sort-by-label" >Sort By</InputLabel>
                    <Select
                        labelId="sort-by-label"
                        value={sortBy}
                        label="Sort By"
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <MenuItem value="createdAt">Date</MenuItem>
                        <MenuItem value="updatedAt">Updated</MenuItem>
                        <MenuItem value="purchaseQuantity">Purchase Quantity</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <InputLabel id="sort-order-label">Order</InputLabel>
                    <Select
                        labelId="sort-order-label"
                        value={sortOrder}
                        label="Order"
                        onChange={e => setSortOrder(e.target.value)}
                    >
                        <MenuItem value="desc">Descending</MenuItem>
                        <MenuItem value="asc">Ascending</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {/* Error Message */}
            {apiError && <div className="alert alert-danger text-center">{apiError}</div>}
            {/* Loading State */}
            {loading ? (
                <div style={{ minHeight: "100vh" }}>Loading...</div>
            ) : orders.length === 0 ? (
                <div>No orders found.</div>
            ) : (
                // Orders Table
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Purchase Quantity</th>
                                <th>Status</th>
                                <th>Payment Method</th>
                                <th>Order Date</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, idx) => {
                                // Find the purchaseId for the pending status for this product
                                let purchaseId = null;
                                if (order.status === "Pending" && order.purchase?._id) {
                                    purchaseId = order.purchase._id;
                                }
                                return (
                                    <tr key={order._id}>
                                        <td>{(pagination.currentPage - 1) * pagination.limit + idx + 1}</td>
                                        <td>{order.product?.name || "N/A"}</td>
                                        <td>
                                            {order.product?.imageSource?.[0] && (
                                                <img
                                                    src={order.product.imageSource[0]}
                                                    alt={order.product?.name}
                                                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                                                />
                                            )}
                                        </td>
                                        <td>{order.product?.category?.name || "N/A"}</td>
                                        <td>{order.purchaseQuantity}</td>
                                        <td>{order.status}</td>
                                        <td>{order.paymentMethod}</td>
                                        <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}</td>
                                        <td>{order.product?.price ? `EGP ${order.product.price}` : "N/A"}</td>
                                        <td>
                                            {order.status === "Pending" && (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    disabled={cancelLoadingId === order._id}
                                                    onClick={() => handleCancelPurchase(order._id)}
                                                >
                                                    {cancelLoadingId === order._id ? "Cancelling..." : "Cancel Purchase"}
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="d-flex justify-content-center mt-4">
                        <MuiPagination
                            count={pagination.totalPages}
                            page={pagination.currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            color="success"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
