import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProductDetails.css';
import { Spinner } from 'react-bootstrap';

export default function ProductDetails() {
    const { name } = useParams(); // Get product name from the URL
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImg] = useState(null);

    useEffect(() => {
        if (!name) return;

        fetch(`https://bulkify-back-end.vercel.app/api/v1/products?name=${encodeURIComponent(name)}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response:", data);  // Log API response for debugging
                
                if (data && data.products && data.products.length > 0) {
                    const foundProduct = data.products[0];  // Get the first product from the array
                    setProduct(foundProduct);
                    setMainImg(foundProduct.imageSource?.[0] || "default-image.jpg");
                } else {
                    console.error("Product data is missing or incorrect");
                    setProduct(null);
                }
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setProduct(null);
            });
    }, [name]);

    if (product === null) {
        return (
            <div className="loading-container">
                <Spinner animation="border" variant="success" />
                <p>Loading product...</p>
            </div>
        );
    }

    return (
        <div className="container product-container my-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="product-images text-center">
                        <img id="mainImage" src={mainImage} alt="Product Image" className="img-fluid" />
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                        {product.imageSource.map((image, index) => (
                            <div className="thumbnail mx-1" key={index}>
                                <img src={image} alt={`Thumbnail ${index + 1}`} onClick={() => setMainImg(image)} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <p><strong>Supplier : </strong> {product.supplierId.fullName}</p>
                    <p><strong>Availability: {product.quantity}  </strong> {product.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
                    <p><strong>Price : </strong> ${product.price}</p>
                    <p>{product.description}</p>
                    <label htmlFor="quantity">Quantity : </label>
                    <input type="number" id="quantity" className="form-control mb-3" min="1" max={product.quantity} />
                    <button className="btn btn-success w-100">Start Purchase</button>
                </div>
            </div>
            <div className="mt-5 p-4 bg-light rounded">
                <h4>Description</h4>
                <p>{product.description}</p>
            </div>
        </div>
    );
}
