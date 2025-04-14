/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SuppDashboard.css";
import axios from "axios";
import Select from 'react-select';


export default function EditProductDetails() {

    const { name } = useParams();
    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [categories, setCategories] = useState([]);
    const handleCategoryChange = (selectedOptions) => {
        setFormData(prev => ({
            ...prev,
            category: selectedOptions || []
        }));
    };
    const categoryOptions = categories.map(cat => ({
        value: cat._id,
        label: cat.name
    }));
    
    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await axios.get("https://bulkify-back-end.vercel.app/api/v1/categories");
                setCategories(res.data.categories || []);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        axios
            .get("https://bulkify-back-end.vercel.app/api/v1/products")
            .then((res) => {
                const found = res.data.products.find((p) => p.name === name);
                setProduct(found || null);
                setFormData(found || null);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setProduct(null);
            });
    }, [name]);

    if (loading) return <p>Loading...</p>;
    if (!formData) return <p>Product not found</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const SupplierToken = localStorage.getItem("SupplierToken");
        if (!SupplierToken) {
            setMessage("Token not found. Please log in again.");
            return;
        }
        const cleanFormData = {
            name: formData.name,
            categoryId: formData.categoryId || "",
            price: Number(formData.price),
            bulkThreshold: Number(formData.bulkThreshold),
            quantity: Number(formData.quantity)
        };
        console.log("Product ID:", formData._id);
        console.log("Clean Form Data:", cleanFormData);
        axios
            .put(
                `https://bulkify-back-end.vercel.app/api/v1/products/${formData._id}`,
                cleanFormData,
                {
                    headers: {
                        "token": `${SupplierToken}`
                    }
                }
            )
            .then(() => {
                setMessage("Product updated successfully");
            })
            .catch((err) => {
                setMessage("Failed to update product");
                console.error(err.response.data);
            });
    };


    return (
        <div className="container-fluid">
            <div className="p-4">
                <div className="form-section">
                    <h5 className="mb-4">Edit Or Delete Product</h5>
                    {message && <p>{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">category</label>
                        <Select
                            isMulti
                            options={categoryOptions}
                            value={formData.category}
                            onChange={handleCategoryChange}
                            placeholder="Select categories..."
                        />
                    </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bulk Pieces</label>
                            <input
                                type="number"
                                className="form-control"
                                name="bulkThreshold"
                                value={formData.bulkThreshold}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Pieces</label>
                            <input
                                type="number"
                                className="form-control"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bulk Price</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.bulkThreshold * formData.price}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Upload Extra Photos</label>
                            <div className="upload-preview">
                                <div>
                                    <img
                                        src={formData.imageSource?.[0] || "/images/Bitmap.png"}
                                        className="preview-img"
                                        alt=""
                                        style={{
                                            cursor: "pointer",
                                            width: "100px",
                                            height: "100px",
                                        }}
                                    />
                                    <i
                                        className="bi bi-trash text-danger"
                                        style={{ cursor: "pointer" }}
                                    ></i>
                                </div>
                                <label className="upload-label" htmlFor="uploadInput">
                                    <i className="bi bi-image"></i>
                                </label>
                                <input type="file" id="uploadInput" className="d-none" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
