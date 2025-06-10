import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../HomePage/Pagination';
import { Modal, Button, Form } from 'react-bootstrap';

const HandleProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const adminToken = localStorage.getItem('AdminToken');
      if (!adminToken) {
        setError('Admin authentication required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://bulkify-back-end.vercel.app/api/v1/products?page=${currentPage} `,
          {
            headers: {
              'Content-Type': 'application/json',
              'token': adminToken
            }
          }
        );
        
        if (response.data && response.data.products) {
          setProducts(response.data.products);
          setTotalProducts(response.data.total || 0);
          setError(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching products. Please try again later.');
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://bulkify-back-end.vercel.app/api/v1/categories');
        setCategories(response.data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

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

  const handleEdit = async (productId) => {
    const adminToken = localStorage.getItem('AdminToken');
    if (!adminToken) return;

    try {
      const response = await axios.get(
        `https://bulkify-back-end.vercel.app/api/v1/products/${productId}`,
        {
          headers: { token: adminToken }
        }
      );
      setEditingProduct(response.data.product);
      setShowEditModal(true);
    } catch {
      setError('Error fetching product details');
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const adminToken = localStorage.getItem('AdminToken');
    if (!adminToken || !editingProduct || !editingProduct._id) {
        setError('Invalid product data or authentication');
        return;
    }

    try {
        const productData = {
            name: editingProduct.name || '',
            description: editingProduct.description || '',
            price: Number(editingProduct.price) || 0,
            quantity: Number(editingProduct.quantity) || 0,
            bulkThreshold: Number(editingProduct.bulkThreshold) || 0,
            categoryId: editingProduct.categoryId === 'uncategorized' ? 
                null : 
                (editingProduct.categoryId?._id || editingProduct.categoryId || null)
        };

        const response = await axios.put(
            `https://bulkify-back-end.vercel.app/api/v1/products/admin/${editingProduct._id}`,
            productData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': adminToken
                }
            }
        );

      if (response.data && response.data.product) {
        setProducts(products.map(p => 
          p._id === editingProduct._id ? response.data.product : p
        ));
        setShowEditModal(false);
        setError(null);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                           err.response?.data?.err?.[0] || 
                           'Error updating product';
      setError(errorMessage);
      console.error('Error updating product:', err);
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

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / 10); // Assuming 10 products per page

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                  onClick={() => handleEdit(product._id)}
                  className="edit-btn mb-2"
                  style={{
                    backgroundColor: '#198754',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Edit Product
                </button>
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

              {/* Edit Modal */}
              <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmitEdit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={editingProduct?.name || ''}
                        onChange={e => setEditingProduct({
                          ...editingProduct,
                          name: e.target.value
                        })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={editingProduct?.description || ''}
                        onChange={e => setEditingProduct({
                          ...editingProduct,
                          description: e.target.value
                        })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={editingProduct?.price || 0}
                        onChange={e => setEditingProduct({
                          ...editingProduct,
                          price: Number(e.target.value)
                        })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        value={editingProduct?.categoryId || 'uncategorized'}
                        onChange={e => setEditingProduct({
                          ...editingProduct,
                          categoryId: e.target.value
                        })}
                      >
                        <option value="uncategorized">Uncategorized</option>
                        {categories.map(category => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Button variant="success" type="submit">
                      Save Changes
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
          )
        ))}
      </div>
      
      {/* Add Pagination */}
      <div className="mt-4 d-flex justify-content-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default HandleProducts;
