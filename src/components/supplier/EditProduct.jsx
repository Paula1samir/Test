import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SuppDashboard.css';

export default function EditProduct() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const SupplierToken = localStorage.getItem("SupplierToken");
    useEffect(() => {
        axios.get('https://bulkify-back-end.vercel.app/api/v1/products?limit=10', {
            headers: {
                'Content-Type': 'application/json',
                'token': `${SupplierToken}`
            }
        })
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const handleEdit = (product) => {
        const encodedName = encodeURIComponent(product.name);
        navigate(`/SuppDashboard/edit-product/${encodedName}`, { state: { product } });
    };

    return (
        <div className="">
            <div className="">
                <div className="col-md-10" style={{ width: "-webkit-fill-available" }}>
                    <div className="p-4">
                        <div className="table-section">
                            <h5 className="mb-4">Edit Or Delete Product</h5>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Bulk Pieces</th>
                                            <th>Bulk Price</th>
                                            <th>Pieces</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product._id}>
                                                <td>
                                                    <img
                                                        src={product.imageSource[0] || './images/default.png'}
                                                        className="product-img"
                                                        alt={product.name}
                                                    />
                                                </td>
                                                <td>{product.name}</td>
                                                <td>{product.categoryId?.name || 'Uncategorized'}</td>
                                                <td>{`EGP ${product.price}`}</td>
                                                <td>{product.bulkThreshold}</td>
                                                <td>{`EGP ${product.price * product.bulkThreshold}`}</td>
                                                <td>{product.quantity}</td>
                                                <td className="action-icons">
                                                    <i
                                                        className="bi bi-pencil-square edit me-2"
                                                        onClick={() => handleEdit(product)}
                                                        style={{ cursor: 'pointer' }}
                                                    ></i>
                                                    <i className="bi bi-trash delete"></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
