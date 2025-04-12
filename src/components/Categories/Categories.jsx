import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../supplier/SuppDashboard.css';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2IwZjYxNTFlNjhlM2YyMGJkMTFjYzIiLCJlbWFpbCI6ImFkbWluQGJ1bGtpZnkuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTc0NDI4NzUxNywiZXhwIjoxNzQ0MzczOTE3fQ.O2xUr_Tj7KX3PfFfC18kRaZ0PbFijKTkZKoq7YUqGQs";

    const fetchCategories = async () => {
        try {
            const res = await axios.get("https://bulkify-back-end.vercel.app/api/v1/categories");
            setCategories(res.data.categories || []);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://bulkify-back-end.vercel.app/api/v1/categories/${id}`,
                {
                    headers: {
                        token: token,
                    },
                }
            );
            fetchCategories();
        } catch (err) {
            console.log("Failed to delete category", err);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;

        try {
            await axios.post(
                "https://bulkify-back-end.vercel.app/api/v1/categories",
                { name: newCategory },
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                }
            );

            setShowModal(false);
            setNewCategory('');
            fetchCategories();
        } catch (err) {
            console.log("Failed to add category", err);
        }
    };

    return (
        <div className="container-fluid">
            <div className="col-md-10" style={{ width: "100%" }}>
                <div className="table-section">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Categories</h5>
                        <button
                            className="btn btn-success"
                            onClick={() => setShowModal(true)}
                        >
                            Add Category
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(category._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title ">Add New Category</h5>
                                        <button type="button" className="close" onClick={() => setShowModal(false)}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter category name"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                        <button className="btn btn-success" onClick={handleAddCategory}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
