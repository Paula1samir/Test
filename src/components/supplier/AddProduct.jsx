import React, { useState } from 'react';
export default function AddProduct() {
    const token = localStorage.getItem("token");
    console.log("Token: ", token);
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        description: '',
        price: '',
        bulkThreshold: '',
        category: '',
        imageSource: [],
        token: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = async (e) => {
        const files = e.target.files;
        const uploaded = [];

        // NOTE: Replace this with actual Cloudinary or image upload logic
        for (let file of files) {
            // Dummy URL simulation
            uploaded.push(URL.createObjectURL(file));
        }

        setFormData((prev) => ({
            ...prev,
            imageSource: uploaded
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        console.log("Token: ", token);
        console.log("Form Data:", formData);

        if (!token) {
            alert("Token not found. Please log in.");
            return;
        }

        const payload = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            bulkThreshold: Number(formData.bulkThreshold),
            categoryId: formData.category, // Assuming categoryId is correctly passed
            imageSource: formData.imageSource,
            token: token
        };

        try {
            const res = await fetch("https://bulkify-back-end.vercel.app/api/v1/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Token in the header
                },
                body: JSON.stringify(payload) // Send token in the body as well
            });

            const result = await res.json();
            console.log("✅ API Response:", result);
        } catch (err) {
            console.error("❌ Error submitting product:", err);
        }
    };

    return (
        <>

            <div className="" style={{width: "-webkit-fill-available"}}>
                <div className="form-section">
                    <h5 className="mb-4">ADD Product</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Product Name" />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="form-control" placeholder="Pieces" />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="description" value={formData.description} onChange={handleChange} className="form-control" placeholder="Bulk orders / Description" />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input type="text" name="price" value={formData.price} onChange={handleChange} className="form-control" placeholder="Product Price" />
                            </div>
                            <div className="col">
                                <input type="text" name="bulkThreshold" value={formData.bulkThreshold} onChange={handleChange} className="form-control" placeholder="Bulk Threshold" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Category"
                            />
                        </div>
                        <div className="mb-3">
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-success">ADD</button>
                    </form>
                </div>
            </div>
        </>
    )
}
