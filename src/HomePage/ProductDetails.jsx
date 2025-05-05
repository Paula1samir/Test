import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProductDetails.css';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function ProductDetails() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImg] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errMsg, setErrMsg] = useState("");
    const [existingPurchase, setExistingPurchase] = useState(null);
    const [voterData, setVoterData] = useState({
        city: '',
        street: '',
        homeNumber: ''
    });

    useEffect(() => {
        if (!name) return;

        fetch(`https://bulkify-back-end.vercel.app/api/v1/products?name=${encodeURIComponent(name)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.products && data.products.length > 0) {
                    const foundProduct = data.products[0];
                    setProduct(foundProduct);
                    setMainImg(foundProduct.imageSource?.[0] || "default-image.jpg");
                } else {
                    setProduct(null);
                }
            })
            .catch(() => setProduct(null));
    }, [name]);

    useEffect(() => {
        if (!product) return;
        const token = localStorage.getItem("CustomerToken");
        const customerData = JSON.parse(localStorage.getItem("CustomerData"));

        if (!token || !customerData) return;

        axios.get(`https://bulkify-back-end.vercel.app/api/v1/purchases/checkNearbyPurchases/${product._id}`, {
            headers: { token },
            params: {
                lat: customerData.coordinates[0],
                lng: customerData.coordinates[1]
            }
        })
        .then(res => {
            if (res.data && res.data.nearbyPurchase) {
                setExistingPurchase(res.data.nearbyPurchase);
            }
        })
        .catch(() => {});
    }, [product]);

    const handleStartPurchase = async () => {
        const token = localStorage.getItem("CustomerToken");
        const CustomerData = JSON.parse(localStorage.getItem("CustomerData"));

        if (!token || !CustomerData) {
            alert("Please log in first.");
            navigate("/login");
            return;
        }

        const payload = {
            purchaseQuantity: quantity,
            deliveryAddress: {
                city: CustomerData.city,
                street: CustomerData.street,
                homeNumber: CustomerData.homeNumber
            }
        };

        try {
            const response = await axios.post(
                `https://bulkify-back-end.vercel.app/api/v1/purchases/startPurchase/${product._id}`,
                payload,
                {
                    headers: {
                        token
                    }
                }
            );

            if (response.data?.url) {
                window.location.href = response.data.url;
            } else {
                setErrMsg("Unexpected response from server.");
            }
        } catch (err) {
            setErrMsg(err.response?.data?.message || "An error occurred while starting the purchase.");
        }
    };

    const handleVoteToPurchase = async () => {
        const token = localStorage.getItem("CustomerToken");

        if (!token || !existingPurchase?.id) {
            alert("Please log in first.");
            navigate("/login");
            return;
        }

        const payload = {
            purchaseQuantity: quantity,
            deliveryAddress: {
                city: voterData.city,
                street: voterData.street,
                homeNumber: voterData.homeNumber
            }
        };

        try {
            const res = await axios.post(
                `https://bulkify-back-end.vercel.app/api/v1/purchases/vote/${existingPurchase.id}`,
                payload,
                {
                    "token":token 
                }
            );

            if (res.data?.url) {
                window.location.href = res.data.url;
            } else {
                setErrMsg("Unexpected response from vote API.");
            }
        } catch (err) {
            setErrMsg(err.response?.data?.message || "Vote failed.");
        }
    };

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
            <p className={`alert alert-danger ${errMsg ? 'd-block' : 'd-none'} text-center mx-auto`} aria-live="assertive" id="alert" style={{ backgroundColor: "#ff4d4d", padding: "20px", borderRadius: "10px", maxWidth: "90%", width: "400px", color: "#fff", textAlign: "center", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}>
                {errMsg}
            </p>

            <div className="row">
                <div className="col-md-6">
                    <div className="product-images text-center">
                        <img id="mainImage" src={mainImage} alt="Product" className="img-fluid" />
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
                    <p><strong>Supplier:</strong> {product?.supplierId?.fullName?product.supplierId.fullName : " Not found"}</p>
                    <p><strong>Availability:</strong> {product.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p>{product.description}</p>

                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        className="form-control mb-3"
                        min="1"
                        max={product.quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />

                    {existingPurchase ? (
                        <>
                            <div className="alert alert-info text-center">
                                There is a purchase in your area ({existingPurchase.votesCount} out of 12)
                            </div>

                            <div className="mb-3">
                                <label>City</label>
                                <input type="text" className="form-control" value={voterData.city} onChange={(e) => setVoterData({ ...voterData, city: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label>Street</label>
                                <input type="text" className="form-control" value={voterData.street} onChange={(e) => setVoterData({ ...voterData, street: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label>Home Number</label>
                                <input type="text" className="form-control" value={voterData.homeNumber} onChange={(e) => setVoterData({ ...voterData, homeNumber: e.target.value })} />
                            </div>

                            <button className="btn btn-primary w-100" onClick={handleVoteToPurchase}>
                                Vote to Complete Purchase
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-success w-100" onClick={handleStartPurchase}>
                            Start Purchase
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-5 p-4 bg-light rounded">
                <h4>Description</h4>
                <p>{product.description}</p>
            </div>
        </div>
    );
}
