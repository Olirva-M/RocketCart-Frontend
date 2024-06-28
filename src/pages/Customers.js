import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import Loader from './Loader';
import '../css/Customers.css';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:8080/api/admin/customers`);
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (error) return <p>Error loading customers: {error.message}</p>;

  return (
    <div className="customer-table-container">
      {loading ? (
        <Loader />
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Billing Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.username}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>{customer.billingAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Customer;
