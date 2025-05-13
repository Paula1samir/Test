import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HandleProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://bulkify-back-end.vercel.app/api/v1/products?page=${currentPage}`);
        setProducts(response.data.products || []);
        setTotalProducts(response.data.total || 0);
        setError(null);
      } catch (err) {
        setError('Error fetching products. Please try again later.');
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const adminToken = localStorage.getItem('AdminToken');
      if (!adminToken) {
        setError('Admin authentication required');
        return;
      }

      await axios.delete(
        `https://bulkify-back-end.vercel.app/api/v1/products/admin/${productId}`,
        {
          headers: {
            'token': ` ${adminToken}`
          }
        }
      );

      // Update the products list after successful deletion
      setProducts(products.filter(product => product._id !== productId));
      setTotalProducts(prev => prev - 1);
    } catch (err) {
      setError('Error deleting product. Please try again later.');
      console.error("Error deleting product:", err);
    }
  };

  const getImageUrl = (imageSource) => {
    if (!imageSource) return ''; // Return empty string if no image source
    
    // If imageSource is already a string URL, return it
    if (typeof imageSource === 'string') return imageSource;
    
    // If imageSource is an array, take the first image
    if (Array.isArray(imageSource)) {
      return imageSource[0] || '';
    }
    
    return '';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="handle-products">
      <h2>Manage Products</h2>
      <div className="products-list" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
        {products && products.map((product) => (
          product && (
            <div key={product._id || 'temp-key'} className="product-item" style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: 'white'
            }}>
              <div className="product-info">
                {product && product.imageSource && (
                  <div className="product-image" style={{
                    width: '100%',
                    height: '200px',
                    marginBottom: '10px'
                  }}>
                    <img 
                      src={getImageUrl(product.imageSource)}
                      alt={product?.name || 'Product'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                      }}
                    />
                  </div>
                )}
                <h3 style={{ margin: '10px 0' }}>{product?.name || 'Unnamed Product'}</h3>
                <p style={{ margin: '5px 0' }}>Price: ${product?.price || '0.00'}</p>
              </div>
              <div className="product-actions" style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => product?._id && handleDelete(product._id)}
                  className="delete-btn"
                  style={{
                    backgroundColor: '#ff4444',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                  disabled={!product?._id}
                >
                  Delete Product
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default HandleProducts;
