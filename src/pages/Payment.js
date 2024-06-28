import React, { useState } from 'react';
import '../css/Payment.css'; 
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';

const Payment = ( {setShowPopup, setPopupMsg, role, logged, setLogged, id, setId}) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const navigate=useNavigate();

  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const handlePayment = async() => {
    if (!selectedMethod){
      setPopupMsg("Please select payment method!");
      setShowPopup(true);
      return
    }

    console.log(`Processing payment using ${selectedMethod} method...`);
    await axiosInstance.post(`http://localhost:8080/api/customers/${id}/make-payment`, {"paymentMethod": selectedMethod});
    setPopupMsg("Order Placed Successfully!");
    setShowPopup(true);
    navigate('/cart');

  };

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>
      <div className="payment-methods">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="credit_card"
            checked={selectedMethod === 'credit_card'}
            onChange={() => handlePaymentMethodChange('credit_card')}
          />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/320px-Visa_Inc._logo.svg.png" alt="Credit Card" className={`payment-icon ${selectedMethod === 'credit_card' ? 'selected' : ''}`} />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={selectedMethod === 'paypal'}
            onChange={() => handlePaymentMethodChange('paypal')}
          />
          <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" className={`payment-icon ${selectedMethod === 'paypal' ? 'selected' : ''}`} />
          PayPal
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="apple_pay"
            checked={selectedMethod === 'apple_pay'}
            onChange={() => handlePaymentMethodChange('apple_pay')}
          />
          <img src="https://developer.apple.com/assets/elements/icons/apple-pay/apple-pay.svg" alt="Apple Pay" className={`payment-icon ${selectedMethod === 'apple_pay' ? 'selected' : ''}`} />
          Apple Pay
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="google_pay"
            checked={selectedMethod === 'google_pay'}
            onChange={() => handlePaymentMethodChange('google_pay')}
          />
          <img src="https://pay.google.com/about/static_kcs/images/logos/footer-logo.svg" alt="Google Pay" className={`payment-icon ${selectedMethod === 'google_pay' ? 'selected' : ''}`} />
          Google Pay
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="bitcoin"
            checked={selectedMethod === 'bitcoin'}
            onChange={() => handlePaymentMethodChange('bitcoin')}
          />
          <img src="https://bitcoin.org/img/icons/opengraph.png" alt="Bitcoin" className={`payment-icon ${selectedMethod === 'bitcoin' ? 'selected' : ''}`} />
          Bitcoin
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={selectedMethod === 'upi'}
            onChange={() => handlePaymentMethodChange('upi')}
          />
          <img src="https://getlogo.net/wp-content/uploads/2020/10/unified-payments-interface-upi-logo-vector.png" alt="upi" className={`payment-icon ${selectedMethod === 'upi' ? 'selected' : ''}`} />
          UPI
        </label>
      </div>
      <button className="pay-now-button" onClick={handlePayment}>
        Pay Now
      </button>
      <div className="payment-info">
        <p>
          Secure payment powered by trusted providers. All transactions are encrypted and your information is safe.
        </p>
      </div>
    </div>
  );
};

export default Payment;
