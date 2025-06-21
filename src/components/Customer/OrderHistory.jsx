import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const customerToken = localStorage.getItem('CustomerToken');
            if (!customerToken) {
                setError('Authentication required');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    'https://bulkify-back-end.vercel.app/api/v1/customers/purchases',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': customerToken
                        }
                    }
                );

                setOrders(response.data.purchases || []);
                setError(null);
            } catch (err) {
                setError('Failed to fetch order history');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading order history...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="d-flex">
            <div className="content w-100">
                <h2>ORDER HISTORY</h2>
                {orders.length > 0 ? (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>#{order._id.slice(-6).toUpperCase()}</td>
                                    <td>{order.productId?.name || 'Unknown Product'}</td>
                                    <td className={`status-${order.status?.toLowerCase()}`}>
                                        {order.status?.toUpperCase()}
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                                    <td>${order.productId?.price || 0} bulk</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="alert alert-info">No orders found</div>
                )}
            </div>
        </div>
    );
}
