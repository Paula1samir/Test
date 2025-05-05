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
    

    useEffect(() => {
        const CustomerToken = localStorage.getItem('CustomerToken');
        if (!CustomerToken) return;
      
        const fetchCustomerProfile = async () => {
          try {
            const response = await axios.get('https://bulkify-back-end.vercel.app/api/v1/customers/profile', {
              headers: { token: CustomerToken }
            });
            console.log(response.data); // Handle your data here
          } catch (err) {
            console.error('Error fetching customer profile:', err);
          }
        };
      
        fetchCustomerProfile();
      }, []);
      

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

    const handleStartPurchase = async () => {
        const token = localStorage.getItem("CustomerToken");
    
        if (!token) {
            alert("Please log in first.");
            navigate("/login");
            return;
        }
    
        let customerProfile;
        try {
            const profileRes = await axios.get('https://bulkify-back-end.vercel.app/api/v1/customers/profile', {
                headers: { token }
            });
            customerProfile = profileRes.data.customer;
        } catch (err) {
            console.error('Error fetching customer profile:', err);
            setErrMsg("Failed to fetch customer profile.");
            return;
        }
    
        const payload = {
            purchaseQuantity: quantity,
            deliveryAddress: {
                city: customerProfile.city,
                street: customerProfile.street,
                homeNumber: customerProfile.homeNumber
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

                        <button className="btn btn-success w-100" onClick={handleStartPurchase}>
                            Start Purchase
                        </button>
                
                </div>
            </div>

            <div className="mt-5 p-4 bg-light rounded">
                <h4>Description</h4>
                <p>{product.description}</p>
            </div>
        </div>
    );
}
