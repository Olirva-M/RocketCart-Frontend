import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import '../css/Order.css';
import { useNavigate, useParams } from "react-router-dom";

const Order = ({ logged, setLogged, id, setId }) => {
    const [orderItems, setOrderItems] = useState(null);
    const navigate = useNavigate();
    const { oid } = useParams();
    
    const fetchOrderItems = async () => {
        try {
            console.log("fetching order", oid);
            const response = await axiosInstance.get(`http://localhost:8080/api/customers/${id}/orderhistory/${oid}`);
            setOrderItems(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching order items:', error);
        }
    };

    useEffect(() => {
        if (!logged) {
            navigate('/login');
            return;
        }

        fetchOrderItems(); 
    }, [logged, navigate]);

    const handleProductClick = (pid) => {
        console.log('handleProductClick', pid);
        navigate(`/product/${pid}`);
    };

    return (
        <>
            <h2>Your order</h2>

            {orderItems && (
                <>
                    <table className="singleorder-items">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map(item => (
                                <tr key={item.orderItemId} className="singleorder-item">
                                    <td onClick={() => handleProductClick(item.product.productId)} className="singleorder-item-detail">
                                        {item.product.productName}
                                    </td>
                                    <td className="singleorder-item-detail">
                                        {item.product.price}
                                    </td>
                                    <td className="singleorder-item-detail">
                                        {item.quantity}
                                    </td>
                                    <td className="singleorder-item-detail">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="singleorder-footer-item">
                        ${orderItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
                    </div>
                </>
            )}
            <br></br>
            <button style={{border:"red 1px solid",color:"red"}} onClick={()=>{navigate('/history')}}>Back</button>
        </>
    );
};

export default Order;
