import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import Loader from './Loader';
import '../css/VerifiedSellers.css';

const VerifiedSellers = () => {
  const [sellers, setsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchsellers = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:8080/api/admin/sellers/verified`);
        setsellers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchsellers();
  }, []);

  if (error) return <p>Error loading sellers: {error.message}</p>;

  return (
    <div className="seller-table-container">
      {loading ? (
        <Loader />
      ) : (
        <table className="seller-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.sellerId}>
                <td>{seller.username}</td>
                <td>{seller.phoneNumber}</td>
                <td>{seller.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VerifiedSellers;
