import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HandleCustomer() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const AdminToken = localStorage.getItem("AdminToken");

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const fetchCustomers = async (page) => {
    try {
      const response = await axios.get(`https://bulkify-back-end.vercel.app/api/v1/admins/getAllCustomers?page=${page}`, {
        headers: {
          "token": AdminToken,
        },
      });
      setCustomers(response.data.customers || []);
      setTotalCustomers(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const totalPages = Math.ceil(totalCustomers / 5);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

return (
    <div className="p-4" style={{ width: "100%" }}>
        <h5 className="mb-4" style={{ fontWeight: "bold", fontSize: "24px", textAlign: "center", color: "#333" }}>Handle Customers</h5>

        <div className="row g-4">
            {customers.map((customer) => (
                <div className="col-md-4" key={customer._id}>
                    <div className=" product-card-live-customer" style={{ border: '2px solid #4CAF50', padding: '15px', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                        <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#4CAF50' }}>
                            {customer.firstName} {customer.lastName}
                        </div>
                        <div style={{ margin: '5px 0' }}>Email: <span style={{ fontWeight: 'bold' }}>{customer.email}</span></div>
                        <div style={{ margin: '5px 0' }}>Phone: <span style={{ fontWeight: 'bold' }}>{customer.phoneNumber}</span></div>
                        <div style={{ margin: '5px 0' }}>Gender: <span style={{ fontWeight: 'bold' }}>{customer.gender}</span></div>
                        <div style={{ margin: '5px 0' }}>City: <span style={{ fontWeight: 'bold' }}>{customer.city}</span></div>
                        <div style={{ margin: '5px 0' }}>Street: <span style={{ fontWeight: 'bold' }}>{customer.street}</span></div>
                        <div style={{ margin: '5px 0' }}>Home Number: <span style={{ fontWeight: 'bold' }}>{customer.homeNumber}</span></div>
                        <div style={{ margin: '5px 0' }}>
                            Coordinates: <span style={{ fontWeight: 'bold' }}>{customer.coordinates?.[1]}, {customer.coordinates?.[0]}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className=" justify-content-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    style={{
                        margin: '15px 5px',
                        padding: '10px 15px',
                        backgroundColor: currentPage === index + 1 ? '#4CAF50' : '#e9ecef',
                        color: currentPage === index + 1 ? '#fff' : '#000',
                        border: '2px solid #4CAF50',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, color 0.3s',
                    }}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    </div>
);
}
