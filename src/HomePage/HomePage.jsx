import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate import
import './HomePage.css';
import ProductCard from './ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faBox } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Pagination from "./Pagination";
import ProductCardApi from "./ProductCardApi";
import LivePurchase from "./LivePurchase";
import RecommendedProducts from '../components/Recommendations/RecommendedProducts';

/**
 * HomePage Component
 * Main landing page displaying featured products, categories, and live purchases
 */
export default function HomePage() {
    const navigate = useNavigate(); // Add navigate hook
    // State declarations
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [nearbyPurchases, setNearbyPurchases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const CustomerToken = localStorage.getItem('CustomerToken');

    const getImageUrl = (imageSource) => {
        if (!imageSource) return '';
        if (typeof imageSource === 'string') return imageSource;
        if (Array.isArray(imageSource) && imageSource.length > 0) return imageSource[0];
        return '';
    };

    /**
     * Fetches all available categories from the API
     */
    const fetchCategories = async () => {
        try {
            const res = await axios.get("https://bulkify-back-end.vercel.app/api/v1/categories?limit=10000");
            setCategories(res.data.categories || []);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    /**
     * Fetches featured products from the API
     */
    const fetchFeaturedProducts = async () => {
        try {
            const response = await axios.get("https://bulkify-back-end.vercel.app/api/v1/products/regular?limit=5");
            setFeaturedProducts(response.data.products || []);
        } catch (error) {
            console.error("Error fetching featured products:", error);
        }
    };

    /**
     * Fetches initial data: products, categories, and nearby purchases
     */
    useEffect(() => {
        fetchCategories();
        fetchFeaturedProducts();
        axios.get(`https://bulkify-back-end.vercel.app/api/v1/products/regular?page=${currentPage}&limit=6`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setProducts(response.data.products || []);
                setTotalProducts(response.data.total || 0); // Set total products
            })
            .catch(error => console.error("Error fetching products:", error));
        // Fetch nearby purchases
        if (CustomerToken) {
            axios.get(`https://bulkify-back-end.vercel.app/api/v1/products/nearby?limit=20000`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': CustomerToken
                }
            })
                .then(response => {

                        setNearbyPurchases(response.data.nearbyProducts);
                        console.log(response.data.nearbyProducts);

                })
                .catch(error => {
                    console.error("Error fetching nearby purchases:", error.response || error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            console.log('No customer token found');
            setIsLoading(false);
        }
    }, [currentPage, CustomerToken]);
    /**
     * Updates current page for pagination
     */
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalProducts / 5);

    return (
        <>
            <div className="HomePage">
                <div className='mainContainer' style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {featuredProducts.length > 0 && (
                        <>
                            <ProductCard
                                title={featuredProducts[0]?.name || "Loading..."}
                                description={featuredProducts[0]?.description || ""}
                                image={getImageUrl(featuredProducts[0]?.imageSource)}
                                onPurchase={() => handleProductClick(featuredProducts[0]?._id)}
                                style={{ backgroundColor: '#F2F4F5', display: 'flex' }}
                            />
                            <div className="sideContainer">
                                <ProductCard
                                    title={featuredProducts[1]?.name || "Loading..."}
                                    description={`$${featuredProducts[1]?.price || 0}`}
                                    image={getImageUrl(featuredProducts[1]?.imageSource)}
                                    onPurchase={() => handleProductClick(featuredProducts[1]?._id)}
                                    style={{ backgroundColor: '#191C1F', color: '#fff' }}
                                />
                                <ProductCard
                                    title={featuredProducts[2]?.name || "Loading..."}
                                    description={featuredProducts[2]?.description || ""}
                                    image={getImageUrl(featuredProducts[2]?.imageSource)}
                                    onPurchase={() => handleProductClick(featuredProducts[2]?._id)}
                                    style={{ backgroundColor: '#F2F4F5' }}
                                />
                            </div>
                        </>
                    )}
                </div>

                <h1 style={{ paddingLeft: '20px', paddingTop: '50px' }}>Products</h1>
                <div className="flex mt-3 product-list" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {products && products.map((product) => (
                        product && (
                            <ProductCardApi
                                key={product?._id || 'temp-key'}
                                _id={product?._id}
                                name={product?.name || 'Unnamed Product'}
                                description={product?.description || 'No description available'}
                                price={product?.price || 0}
                                quantity={product?.quantity || 0}
                                image={getImageUrl(product?.imageSource)}
                            />
                        )
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    style={{ textAlign: 'center' }}
                />
                {/* Live Purchases Section - Moved to top */}
                <div className="live-purchases-wrapper">
                    <LivePurchase nearby={nearbyPurchases} isLoading={isLoading} />
                </div>
                <div className='mt-5 d-flex justify-content-center align-items-center'>
                    <div className="features mt-5 d-flex justify-content-around align-items-center">
                        <div className="left d-flex justify-content-around align-items-center">
                            <FontAwesomeIcon icon={faBox} style={{ width: '40px', height: '40px', paddingRight: '15px', cursor: 'pointer' }} />
                            <span>Fastest Delivery</span>
                        </div>
                        <div className="right d-flex justify-content-around align-items-center">
                            <FontAwesomeIcon icon={faCreditCard} style={{ width: '40px', height: '40px', paddingRight: '15px', cursor: 'pointer' }} />
                            <span>Secure Payment</span>
                        </div>
                    </div>
                </div>
                <div className="sideContainer2 mt-5">
                    {featuredProducts.length > 3 && (
                        <>
                            <ProductCard
                                title={featuredProducts[3]?.name || "Loading..."}
                                description={featuredProducts[3]?.description || ""}
                                image={getImageUrl(featuredProducts[3]?.imageSource)}
                                onPurchase={() => handleProductClick(featuredProducts[3]?._id)}
                                style={{ backgroundColor: '#F2F4F5', color: '#000' }}
                            />
                            {featuredProducts[4] && (
                                <ProductCard
                                    title={featuredProducts[4]?.name || "Loading..."}
                                    description={featuredProducts[4]?.description || ""}
                                    image={getImageUrl(featuredProducts[4]?.imageSource)}
                                    onPurchase={() => handleProductClick(featuredProducts[4]?._id)}
                                    style={{ backgroundColor: '#191C1F', color: '#fff' }}
                                />
                            )}
                        </>
                    )}
                </div>
                <div className='mt-5 category-section'>
                    <h2>Categories</h2>
                    <div className="category-buttons" style={{ display: 'flex',flexDirection:"row", gap: '10px' }}>
                        {categories.map(category => (
                            <Link 
                                key={category._id}
                                to={`/categories?category=${category.name}`}
                                className="btn btn-success"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Add Recommendations section after Products section */}
                <div className="mt-5">
                    <RecommendedProducts />
                </div>
            </div>
        </>
    );
}
