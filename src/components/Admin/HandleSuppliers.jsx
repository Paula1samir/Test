import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HandleSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const AdminToken = localStorage.getItem("AdminToken");

  useEffect(() => {
    fetchSuppliers(currentPage);
  }, [currentPage]);

  const fetchSuppliers = async (page) => {
    try {
      const response = await axios.get(
        `https://bulkify-back-end.vercel.app/api/v1/admins/getAllSuppliers?page=${page}`,
        {
          headers: {
            token: AdminToken,
          },
        }
      );
      setSuppliers(response.data.suppliers || []);
      setTotalSuppliers(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const totalPages = Math.ceil(totalSuppliers / 5);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4" style={{ width: "100%" }}>
      <h5 className="mb-4">Handle Suppliers</h5>

      <div className="row g-4">
        {suppliers.map((supplier) => (
          <div className="col-md-3" key={supplier._id}>
            <div
              className="product-card-live"
              style={{
                border: "2px solid #4CAF50",
                padding: "15px",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#f2f2f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                {supplier.fullName[0]}
              </div>
              <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                {supplier.fullName}
              </div>
              <div style={{ color: "#555", marginTop: "5px" }}>
                {supplier.email}
              </div>
              <div style={{ marginTop: "5px", color: "#007BFF" }}>
                {supplier.phoneNumber}
              </div>
              <div style={{ marginTop: "5px", fontSize: "14px", color: "#888" }}>
                {supplier.supplierAddress?.city}, {supplier.supplierAddress?.street}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: "0 5px",
              padding: "8px 12px",
              backgroundColor: currentPage === index + 1 ? "#4CAF50" : "#f2f2f2",
              color: currentPage === index + 1 ? "#fff" : "#000",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
