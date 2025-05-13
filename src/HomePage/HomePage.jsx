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
import LivePurchase from "./LivePurchase";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0); // Total number of products
  const [nearbyPurchases, setNearbyPurchases] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const CustomerToken = localStorage.getItem('CustomerToken');

  const getImageUrl = (imageSource) => {
    if (!imageSource) return '';
    if (typeof imageSource === 'string') return imageSource;
    if (Array.isArray(imageSource) && imageSource.length > 0) return imageSource[0];
    return '';
  };

  useEffect(() => {
    axios.get(`https://bulkify-back-end.vercel.app/api/v1/products?page=${currentPage}`)
      .then(response => {
        setProducts(response.data.products || []);
        setTotalProducts(response.data.total || 0); // Set total products
      })
      .catch(error => console.error("Error fetching products:", error));

    // Fetch nearby purchases
    axios.get(`https://bulkify-back-end.vercel.app/api/v1/products/u`, {
      headers: {
        'Content-Type': 'application/json',
        'token': `${CustomerToken}`
      }
    })
      .then(response => {
        if (response.data && response.data.nearby) {
          setNearbyPurchases(response.data.nearby);
        }
      })
      .catch(error => console.error("Error fetching nearby purchases:", error));
  }, [currentPage, CustomerToken]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const totalPages = Math.ceil(totalProducts / 5);

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

        {/* Live Purchases Section */}
        <div className="mt-5">
          <LivePurchase nearby={nearbyPurchases} />
        </div>

        <h1 style={{ paddingLeft: '20px', paddingTop: '50px' }}>Products</h1>
        <div className="flex mt-3 product-list" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {products && products.map((product) => (
            product && (
              <ProductCardApi
                key={product?._id || 'temp-key'}
                name={product?.name || 'Unnamed Product'}
                description={product?.description || 'No description available'}
                price={product?.price || 0}
                quantity={product?.quantity || 0}
                image={getImageUrl(product?.imageSource)}
              />
            )
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          style={{ textAlign: 'center' }}
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
