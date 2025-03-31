import React from 'react'
import './HomePage.css';
import { Card, CardContent, Button, } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import nikeImg from "../images/nike.png";
import protienImg from "../images/protien.png";
import appleWatchImg from "../images/appleWatch.png";
// eslint-disable-next-line no-unused-vars
const ProductCard = ({ title, description, image, onPurchase, style }) => {
  const cardStyle = style ? style : {};

  return (
    <Card style={{ ...cardStyle, padding: '16px', margin: '16px', width: "-webkit-fill-available" ,boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' ,alignItems:'center'} }>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{title}</h2>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>{description}</p>
          <Button
            variant="contained"
            color="success"
            startIcon={<ShoppingCartIcon />}
            onClick={onPurchase}
            style={{width:'100%'}}
          >
            Start Purchase
          </Button>
        </div>
        <img src={image} alt={title} style={{ width: '50%', objectFit: 'cover', borderRadius: '8px' }} />
      </div>
    </Card>
  );
};


export default function HomePage() {
  return (
    <div 
    className='mainContainer'
    style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <ProductCard
        title="Nike Air Max Systm"
        description="Mesh for breathability and comfort at every step"
        image={nikeImg}
        onPurchase={() => alert('Purchasing Nike Air Max Systm')}
        style={{backgroundColor:'#F2F4F5'}}
      />
      <div className="sideContainer">

      <ProductCard
        title="Protein Powder Double Rich"
        description="29% OFF"
        image={protienImg}
        onPurchase={() => alert('Purchasing Protein Powder')}
        style={{ backgroundColor: '#191C1F ' , color: '#fff', }}        
      />

      <ProductCard
      
        title="Pixel Watch3 with Fitbit"
        description="Advanced health tracking and smartwatch features"
        image={appleWatchImg}
        onPurchase={() => alert('Purchasing Pixel Watch3')}
        style={{backgroundColor:'#F2F4F5'}}
      />
      </div>
    </div>
    
  )
}
