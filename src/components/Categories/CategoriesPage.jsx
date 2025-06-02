import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardApi from '../../HomePage/ProductCardApi';
import { useSearchParams } from 'react-router-dom';
import './Categories.css';

/**
 * CategoriesPage Component
 * Displays products filtered by categories with a category navigation bar
 */
const CategoriesPage = () => {
    // URL parameters and state management
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All Products';
    
    // State declarations
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    /**
     * Fetches all available categories from the API
     */
    const fetchCategories = async () => {
        try {
            const res = await axios.get("https://bulkify-back-end.vercel.app/api/v1/categories");
            const allCategories = [
                { name: 'All Products' },
                ...(res.data.categories || [])
            ];
            setCategories(allCategories);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    /**
     * Fetches categories and products on component mount
     * Filters products if initial category is provided
     */
    useEffect(() => {
        Promise.all([
            fetchCategories(),
            axios.get('https://bulkify-back-end.vercel.app/api/v1/products/regular?limit=10000')
        ])
        .then(([, productsResponse]) => {
            const productsData = productsResponse.data.products || [];
            setProducts(productsData);
            // Filter products immediately if category is selected
            if (initialCategory && initialCategory !== 'All Products') {
                const filtered = productsData.filter(product => 
                    product.categoryId && product.categoryId.name.toLowerCase() === initialCategory.toLowerCase()
                );
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts(productsData);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [initialCategory]);

    /**
     * Filters products based on selected category
     * @param {string} categoryName - The name of the selected category
     */
    const filterProducts = (categoryName) => {
        setSelectedCategory(categoryName);
        
        if (categoryName === 'All Products') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => {
                return product.categoryId && product.categoryId.name.toLowerCase() === categoryName.toLowerCase();
            });
            setFilteredProducts(filtered);
        }
    };

    /**
     * Extracts image URL from various possible formats
     * @param {string|string[]} imageSource - The image source to process
     * @returns {string} - The processed image URL
     */
    const getImageUrl = (imageSource) => {
        if (!imageSource) return '';
        if (typeof imageSource === 'string') return imageSource;
        if (Array.isArray(imageSource) && imageSource.length > 0) return imageSource[0];
        return '';
    };

    // Loading state handling
    if (isLoading) {
        return <div className="loading">Loading products...</div>;
    }

    // Component render
return (
    <div className="categories-container">
        <h1>Browse by Category</h1>

        <div className="category-container">
            <div className="category-buttons">
                {categories.map(category => (
                    <button
                        key={category.name}
                        className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
                        onClick={() => filterProducts(category.name)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCardApi
                            key={product._id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            quantity={product.quantity}
                            image={getImageUrl(product.imageSource)}
                        />
                    ))
                ) : (
                    <div className="no-products">
                        No products found in this category
                    </div>
                )}
            </div>
        </div>
    </div>
);

};

export default CategoriesPage;
