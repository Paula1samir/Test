import React from 'react'
import { Card, CardContent, Button, } from '@mui/material';
const ProductCard = ({ title, description, image, onPurchase, style }) => {
  const cardStyle = style ? style : {};

  return (
    <Card style={{ ...cardStyle, padding: '16px', margin: '16px', width: "-webkit-fill-available" ,boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' ,alignItems:'center'} }>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{title}</h2>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>{description}</p>
          <button className="btn btn-success w-100 h-100 mt-4" type="submit" onClick={onPurchase}>Start Purchase</button>      
            </div>
        <img src={image} alt={title} style={{ width: '50%', objectFit: 'cover', borderRadius: '8px' }} />
      </div>
    </Card>
  );
};
export default ProductCard;