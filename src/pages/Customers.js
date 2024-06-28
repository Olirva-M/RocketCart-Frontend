import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Customers.css';
import Loader from './Loader';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // const response = await axios.get(``);
        // setCustomers(response.data);
        
        // setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (error) return <p>Error loading customers: {error.message}</p>;

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      {loading ? (
                    <Loader /> 
                ) :
      (<ul>
        
        {customers.map((customer) => (
          <li key={customer.id}>
            <span>{customer.name}</span>
            <span>{customer.email}</span>
          </li>
        ))}
      </ul>)}
    </div>
  );
};

export default Customer;
