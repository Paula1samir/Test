import React from 'react'
import './HomePage.css';
import ProductCard from './ProductCard';
import nikeImg from "../images/nike.png";
import protienImg from "../images/protien.png";
import appleWatchImg from "../images/appleWatch.png";
import gucciBag from "../images/gucciBag.png";
import softChair from "../images/softChair.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard ,faBox } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { Link } from 'react-router-dom';



const ProductCardApi = ({ name, description, price, quantity, image }) => {
  return (
    <div className="product-card" style={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
        <img src={image} alt={name} className="product-img" />
      {/* Pass name in URL instead of ID */}

      <p className="product-name" style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0' }}>
        {name}
      </p>
      <p className="product-description" style={{ fontSize: '1rem', color: '#555', marginBottom: '10px' }}>
        {description}
      </p>
      <div className="details d-flex justify-content-center align-items-center"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Price:</p>
        <p className="product-price" style={{ margin: 0, fontSize: '1rem', color: '#007BFF' }}>${price}</p>
      </div>
      <p className="product-quantity" style={{ fontSize: '0.9rem', color: '#777' }}>Quantity: {quantity}</p>
      <Link to={`/ProductDetails/${encodeURIComponent(name)}`} className="btn btn-success">
        View Details
      </Link>
    </div>
  );
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("https://bulkify-back-end.vercel.app/api/v1/products")
      .then(response => {
        setProducts(response.data.products || []);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);
  return (
    <>
      <div className="HomePage">
        <div
          className='mainContainer'
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <ProductCard
            title="Nike Air Max Systm"
            description="Mesh for breathability and comfort at every step"
            image={nikeImg}
            onPurchase={() => alert('Purchasing Nike Air Max Systm')}
            style={{ backgroundColor: '#F2F4F5', display: 'flex' }}
          />


          <div className="sideContainer">
            <ProductCard
              title="Protein Powder Double Rich"
              description="29% OFF"
              image={protienImg}
              onPurchase={() => alert('Purchasing Protein Powder')}
              style={{ backgroundColor: '#191C1F ', color: '#fff', }}
            />

            <ProductCard

              title="Pixel Watch3 with Fitbit"
              description="Advanced health tracking and smartwatch features"
              image={appleWatchImg}
              onPurchase={() => alert('Purchasing Pixel Watch3')}
              style={{ backgroundColor: '#F2F4F5' }}
            />
          </div>
        </div>
        <h1 style={{ paddingLeft: '20px', paddingTop: '50px' }}>Products</h1>
        <div className="flex mt-3 product-list">
          {products.map((product) => (
            <ProductCardApi
              key={product._id}
              id={product._id}  // ✅ Pass the product ID here!
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              image={product.imageSource[0]} // ✅ Show only the first image
            />
          ))}
        </div>
          <div className=' mt-5 d-flex  justify-content-center algin-items-center'>
        <div className=" features mt-5 d-flex  justify-content-around algin-items-center" >
          <div className="left d-flex justify-content-around align-items-center"> <FontAwesomeIcon icon={faBox} style={{width:'40px',height:'40px' ,paddingRight:'15px' ,cursor:'pointer'}}/><span>Fasted Delivery</span> </div>
          <div className="right d-flex justify-content-around align-items-center"><FontAwesomeIcon icon={faCreditCard} style={{width:'40px',height:'40px' ,paddingRight:'15px' ,cursor:'pointer'}}  /> <span>Secure Payment</span> </div>
        </div>

          </div>

        <div className="sideContainer2 mt-5">
            <ProductCard
              title="Large waterproof Bean bag ."
              description="Collapses into a seat that forms to fit your body."
              image={softChair}
              onPurchase={() => alert('Purchasing Protein Powder')}
              style={{ backgroundColor: ' #F2F4F5', color: '#000', }}
            />

            <ProductCard
              title="Gucci Fashion  Handbag, brown, leather."
              description="“Stay on top of the latest fashion trends”"
              image={gucciBag}
              onPurchase={() => alert('Purchasing Pixel Watch3')}
              style={{ backgroundColor: '#191C1F',color: '#fff' }}
            />
          </div>

      </div>
    </>
  );
}
