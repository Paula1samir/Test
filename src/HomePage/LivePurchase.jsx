import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './LivePurchase.css';

const LivePurchase = ({ nearby }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const getImageUrl = (imageSource) => {
    if (!imageSource) return '';
    if (typeof imageSource === 'string') return imageSource;
    if (Array.isArray(imageSource) && imageSource.length > 0) return imageSource[0];
    return '';
  };

  if (!nearby || nearby.length === 0) {
    return <div>No live purchases available</div>;
  }

  return (
    <div className="live-purchases-container">
      <h2>Live Purchases Near You</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {nearby.map((purchase) => (
          purchase?.productId && (
            <div key={purchase?._id || 'temp-key'} className="live-purchase-card">
              <img 
                src={getImageUrl(purchase?.productId?.imageSource)} 
                alt={purchase?.productId?.name || 'Product'} 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                }}
              />
              <div className="purchase-details">
                <h3>{purchase?.productId?.name || 'Unnamed Product'}</h3>
                <p className="description">{purchase?.productId?.description || 'No description available'}</p>
                <div className="purchase-info">
                  <p><strong>Price:</strong> ${purchase?.productId?.price || '0.00'}</p>
                  <p><strong>Quantity:</strong> {purchase?.quantity || 0}</p>
                  <p><strong>Status:</strong> <span className={`status-${(purchase?.status || 'pending').toLowerCase()}`} style={{
                    color: (purchase?.status || 'pending').toLowerCase() === 'pending' ? '#ffa500' : 
                          (purchase?.status || 'pending').toLowerCase() === 'completed' ? '#28a745' :
                          (purchase?.status || 'pending').toLowerCase() === 'cancelled' ? '#dc3545' : '#000'
                  }}>{purchase?.status || 'Pending'}</span></p>
                  <p><strong>Ends:</strong> {purchase?.endDate ? new Date(purchase.endDate).toLocaleDateString() : 'Date not available'}</p>
                </div>
                {purchase?.productId?._id && (
                  <Link 
                    to={`/ProductDetails/${purchase.productId._id}`} 
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                )}
              </div>
            </div>
          )
        ))}
      </Carousel>
    </div>
  );
};

export default LivePurchase;