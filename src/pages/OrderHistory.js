import React, { useState, useEffect } from 'react';
import '../css/OrderHistory.css'; 
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';

const OrderHistory = ({ logged, id, onClose }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:8080/api/customers/${id}/orderhistory`);
        setOrders(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [logged, id, navigate]);

  function handleOrderClick(oid) {
    navigate(`/order/${oid}`);
  }

  return (
    <div className="order-history-slider open">
      <div className="order-history">
        <button className="close-button" onClick={()=>{try{onClose();}catch(e){navigate('/profile'); }}}>x</button>
        <h2>Order History</h2>
        <div className="order-list">
          {orders.map(order => (
            <div key={order.orderId} className="order-item" onClick={() => handleOrderClick(order.orderId)}>
              <div className={`order-status ${order.status.toLowerCase()}`}>
                Order {order.status}
              </div>

              <div><strong>Total Amount:</strong> <span className="order-amount">${order.totalAmount.toFixed(2)}</span></div>
              <div className="order-date">{new Date(order.orderDate).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
