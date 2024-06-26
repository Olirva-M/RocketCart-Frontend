import React, { useState, useEffect } from 'react';
import './OrderHistory.css'; 
import { useNavigate } from 'react-router-dom';

const OrderHistory = ({logged, setLogged, id, setId}) => {
  const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    // Simulating fetching data from an endpoint
    // Replace with actual fetch call to your endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/customers/${id}/orderhistory`);
        const data = await response.json();
        setOrders(data); // Assuming data is in the format you provided
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

//   useEffect(() => {
//         if (!logged) {
//             navigate('/login');
//             return;
//         }

//         fetchOrderItems(); 
//     }, [logged, navigate]);

  function handleOrderClick(oid){
    navigate(`/order/${oid}`);
  }

  return (
    <div>
      <div className="order-list">
        {orders.map(order => (
          <div key={order.orderId} className="order-item" onClick={()=>handleOrderClick(order.orderId)}>
            <div className="order-status">Order {order.status}</div>
            <div><strong>Total Amount:</strong> <span className="order-amount">${order.totalAmount.toFixed(2)}</span></div>
            <div className="order-date">{new Date(order.orderDate).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
