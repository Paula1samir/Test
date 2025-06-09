import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardApi from '../../HomePage/ProductCardApi';

const RecommendedProducts = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const customerData = JSON.parse(localStorage.getItem('Customer'));
                if (!customerData?.id) return;

                // Get recommendations
                const recommendResponse = await axios.post(
                    'https://recommendation-system-production-4877.up.railway.app/recommend',
                    {
                        user_id: customerData.id,
                        num_recommendations: 5
                    }
                );

                // Fetch product details for recommended products
                const products = await Promise.all(
                    recommendResponse.data.recommendations.map(productId => 
                        axios.get(`https://bulkify-back-end.vercel.app/api/v1/products/${productId}`)
                    )
                );

                setRecommendations(products.map(p => p.data.product));
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) return null;
    if (recommendations.length === 0) return null;

    return (
        <div className="recommended-products m-5">
            <h2>Recommended For You</h2>
            <div className="products-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {recommendations.map(product => (
                    <ProductCardApi
                        key={product._id}
                        _id={product._id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        quantity={product.quantity}
                        image={product.imageSource?.[0] || ''}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecommendedProducts;
