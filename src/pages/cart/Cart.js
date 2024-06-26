import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { useNavigate } from "react-router-dom";

const Cart = ({ logged, setLogged, id, setId }) => {
    const [cartItems, setCartItems] = useState(null);
    const [placed, setPlaced] = useState(false);

    const navigate = useNavigate();

    // Function to fetch cart items from API
    const fetchCartItems = async () => {
        try {
            console.log("fetching cart");
            const response = await axios.get(`http://localhost:8080/api/customers/${id}/cart`);
            console.log('response after fetch', response.data); 
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        if (!logged) {
            navigate('/login');
            return;
        }

        fetchCartItems(); 
    }, [logged, navigate]);

    // Function to handle placing order
    const handleOrder = async () => {
        // Implement your order placement logic here
        console.log("Placing order...");
        await axios.post(`http://localhost:8080/api/customers/${id}/payment`, {paymentMethod:'card'});
        fetchCartItems();
        setPlaced(true);

    };

    // Function to decrease quantity
    const decQuantity = async(product) => {
        const prod_object = await axios.get(`http://localhost:8080/api/products/${product.product.productId}`);

        if (product.quantity>1){
            console.log("dec possible")
            await axios.patch(`http://localhost:8080/api/customers/${id}/cart/${product.cartItemId}`, { "quantity":product.quantity-1});
        }
        fetchCartItems();

    };

    // Function to increase quantity
    const incQuantity = async(product) => {
        const prod_object = await axios.get(`http://localhost:8080/api/products/${product.product.productId}`);
        
        if (prod_object.data.stock >= product.quantity+1){
            console.log("inc possible")
            await axios.patch(`http://localhost:8080/api/customers/${id}/cart/${product.cartItemId}`, { "quantity":product.quantity+1});
        }
        fetchCartItems();
    };

    const handleProductClick = (pid) => {
        console.log('handleProductClick', pid);
        navigate(`/product/${pid}`);
    };

    return (
        <>
            {cartItems && cartItems.length===0 && <p>Kindly Add product to Cart!</p>}
            {!placed && cartItems && cartItems.length!==0 &&
                <div className="cart-container">
                    <h2>Your Cart</h2>

                    <div className="cart-items" style={{ fontWeight: "bold" }}>
                        <div className="cart-item">
                            <div className="cart-item-detail">Name</div>
                            <div className="cart-item-detail">Price</div>
                            <div className="cart-item-detail">Quantity</div>
                            <div className="cart-item-detail">Total</div>
                        </div>
                    </div>
                    <div className="cart-items">
                        {cartItems && cartItems.length!==0 && (cartItems.map(item => (
                            <div className="cart-item" key={item.cartItemId}>
                                <div className="cart-item-detail">
                                    <div onClick={() => handleProductClick(item.product.productId)}>{item.product.productName}</div>
                                </div>
                                <div className="cart-item-detail">${item.product.price}</div>
                                <div className="cart-item-detail-quantity">
                                    <button onClick={() => decQuantity(item)} style={{ backgroundColor: "#6da0ff" }}>-</button>
                                    &nbsp;&nbsp;
                                    {item.quantity}
                                    &nbsp;&nbsp;
                                    <button onClick={() => incQuantity(item)} style={{ backgroundColor: "#6da0ff" }}>+</button>
                                </div>
                                <div className="cart-item-detail">${(item.product.price * item.quantity).toFixed(2)}</div>
                            </div>
                        )))}
                    </div>
                    <div className="cart-footer-item" style={{ margin: '10px', backgroundColor: '#0f62fe', color: '#ffffff', height: "30px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        Total: ${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
                    </div>
                    <button onClick={handleOrder} style={{ backgroundColor: "#0f62fe", fontSize: "15px", padding: "12px 24px", display: "block", margin: "0 auto" }}>
                Place Order
            </button>
                </div>}
                {cartItems && cartItems.length===0 && (<button onClick={()=>{navigate('/')}} style={{ backgroundColor: "#0f62fe", fontSize: "15px", padding: "12px 24px", display: "block", margin: "0 auto" }}>
                Go to Home
            </button>)}
        </>
    );
};

export default Cart;
