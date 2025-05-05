import React, { useEffect, useState } from "react";
import './HomePage.css';
import ProductCard from './ProductCard';
import nikeImg from "../images/nike.png";
import protienImg from "../images/protien.png";
import appleWatchImg from "../images/appleWatch.png";
import gucciBag from "../images/gucciBag.png";
import softChair from "../images/softChair.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faBox } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Pagination from "./Pagination";
import ProductCardApi from "./ProductCardApi";


export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    axios.get(`https://bulkify-back-end.vercel.app/api/v1/products?page=${currentPage}`)
      .then(response => {
        setProducts(response.data.products || []);
        setTotalPages(response.data.totalPages || 1); // API should return totalPages
      })
      .catch(error => console.error("Error fetching products:", error));
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="HomePage">
        <div
          className='mainContainer'
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}
        >
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
              style={{ backgroundColor: '#191C1F', color: '#fff' }}
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
        <div className="flex mt-3 product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {products.map((product) => (
            <ProductCardApi
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              image={product.imageSource[0]}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={handlePageChange}
        />
        <div className='mt-5 d-flex justify-content-center align-items-center'>
          <div className="features mt-5 d-flex justify-content-around align-items-center">
            <div className="left d-flex justify-content-around align-items-center">
              <FontAwesomeIcon icon={faBox} style={{ width: '40px', height: '40px', paddingRight: '15px', cursor: 'pointer' }} />
              <span>Fastest Delivery</span>
            </div>
            <div className="right d-flex justify-content-around align-items-center">
              <FontAwesomeIcon icon={faCreditCard} style={{ width: '40px', height: '40px', paddingRight: '15px', cursor: 'pointer' }} />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
        <div className="sideContainer2 mt-5">
          <ProductCard
            title="Large waterproof Bean bag"
            description="Collapses into a seat that forms to fit your body."
            image={softChair}
            onPurchase={() => alert('Purchasing Bean Bag')}
            style={{ backgroundColor: '#F2F4F5', color: '#000' }}
          />
          <ProductCard
            title="Gucci Fashion Handbag, brown, leather"
            description="Stay on top of the latest fashion trends"
            image={gucciBag}
            onPurchase={() => alert('Purchasing Gucci Bag')}
            style={{ backgroundColor: '#191C1F', color: '#fff' }}
          />
        </div>
      </div>
    </>
  );
}
