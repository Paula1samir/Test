import React from 'react';
import { Link } from 'react-router-dom';
import './LivePurchase.css';

const LivePurchase = ({ nearby }) => {
  if (!nearby || nearby.length === 0) {
    return <div>No live purchases available</div>;
  }

  return (
    <div className="live-purchases-container">
      <h2>Live Purchases Near You</h2>
      <div className="live-purchases-grid">
        {nearby.map((purchase) => (
          <div key={purchase._id} className="live-purchase-card">
            <img 
              src={purchase.productId.imageSource[0]} 
              alt={purchase.productId.name} 
              className="product-image"
            />
            <div className="purchase-details">
              <h3>{purchase.productId.name}</h3>
              <p className="description">{purchase.productId.description}</p>
              <div className="purchase-info">
                <p><strong>Price:</strong> ${purchase.productId.price}</p>
                <p><strong>Quantity:</strong> {purchase.quantity}</p>
                <p><strong>Status:</strong> <span className={`status-${purchase.status.toLowerCase()}`}>{purchase.status}</span></p>
                <p><strong>Ends:</strong> {new Date(purchase.endDate).toLocaleDateString()}</p>
              </div>
              <Link 
                to={`/ProductDetails/${purchase.productId._id}`} 
                className="view-details-btn"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePurchase;