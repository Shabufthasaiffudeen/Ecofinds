import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const MyListings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/my-products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        setProducts(products.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <button onClick={() => navigate('/')} className="back-btn">← Back</button>
          <h1>🌱 EcoFinds</h1>
        </div>
      </header>

      <div className="add-product-section">
        <Link to="/add-product" className="add-product-btn">+ Add New Product</Link>
      </div>

      {loading ? (
        <div className="loading">Loading your listings...</div>
      ) : (
        <div className="products-grid">
          {products.length === 0 ? (
            <div className="no-products">You haven't listed any products yet</div>
          ) : (
            products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.title} />
                  ) : (
                    <div className="placeholder-image">📷</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="product-price">${product.price}</p>
                  <p className="product-category">{product.category}</p>
                  <div className="product-actions">
                    <button 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyListings;
