import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

export default function ProductRequests() {
    const [products, setProducts] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const AdminToken = localStorage.getItem("AdminToken");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                'https://bulkify-back-end.vercel.app/api/v1/admins/getPendingProducts',
                { headers: { "token": AdminToken } }
            );
            setProducts(res.data.products || []);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    const approveProduct = async (productId) => {
        try {
            await axios.patch(
                `https://bulkify-back-end.vercel.app/api/v1/products/${productId}/approve`,
                { isApproved: true },
                { headers: { "token": AdminToken } }
            );
            setSnackbarOpen(true); // show MUI snackbar
            fetchProducts();
        } catch (err) {
            console.error('Error approving product:', err);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={{ width: "100%" }}>
            <div className="form-section">
                <h5 className="mb-4">Product Requests</h5>
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Bulk Threshold</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Supplier</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={product?.imageSource?.[0] || './images/default.png'}
                                            alt={product.name}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.categoryId?.name || 'N/A'}</td>
                                    <td>{product.bulkThreshold}</td>
                                    <td>EGP{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.supplierId?.fullName || 'Unknown'}</td>
                                    <td>
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => approveProduct(product._id)}
                                        >
                                            Accept
                                        </button>
                                        <button className="btn btn-danger btn-sm">
                                            Deny
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Product accepted successfully
                </Alert>
            </Snackbar>
        </div>
    );
}
