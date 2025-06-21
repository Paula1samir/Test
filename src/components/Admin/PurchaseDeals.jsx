import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function PurchaseDeals() {
    const [nearbyPurchases, setNearbyPurchases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const CustomerToken = localStorage.getItem("CustomerToken");

      useEffect(() => {
        // Fetch nearby purchases
        if (CustomerToken) {
          axios.get(`https://bulkify-back-end.vercel.app/api/v1/products/nearby`, {
            headers: {
              'Content-Type': 'application/json',
              'token': CustomerToken
            }
          })
            .then(response => {
              console.log('Nearby purchases response:', response.data.nearbyProducts);
              if (response.data && response.data.nearbyProducts) {
                setNearbyPurchases(response.data.nearbyProducts);
              }
            })
            .catch(error => {
              console.error("Error fetching nearby purchases:", error.response || error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          console.log('No customer token found');
          setIsLoading(false);
        }
      });

      if (isLoading) {
        return <div>Loading purchases...</div>;
    }

    return (
        <>
            <div className="flex-grow-1">
                <div className="container py-4">
                    <h4 className="fw-semibold mb-4">Purchase Deals</h4>
                    <div className="table-responsive">
                        <table className="table align-middle" id="dealsTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nearbyPurchases && nearbyPurchases.map((purchase) => (
                                    <tr key={purchase._id}>
                                        <td>#{purchase._id.slice(-5)}</td>
                                        <td>{purchase.name || 'N/A'}</td>
                                        <td>{purchase.description || 'N/A'}</td>
                                        <td>${purchase.price || '0.00'}</td>
                                        <td>{purchase.quantity || '0'}</td>
                                        <td>
                                            <span className={`badge-status badge-${(purchase.purchaseDetails?.status || 'pending').toLowerCase()}`}>
                                                {purchase.purchaseDetails?.status || 'pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(!nearbyPurchases || nearbyPurchases.length === 0) && (
                            <div className="text-center py-3">
                                No purchase deals available
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
