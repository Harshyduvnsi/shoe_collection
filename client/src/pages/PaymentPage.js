import React, { useState } from 'react';
import { placeOrder } from '../api';
import '../css/payment.css';

const PaymentPage = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePayment = async () => {
    try {
      await placeOrder();
      setOrderPlaced(true);
      alert('Payment Successful! Your order is placed.');
      window.location.href = '/';
    } catch (error) {
      alert('Payment failed, please try again.');
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment</h2>
      {orderPlaced ? (
        <div>Your order has been placed successfully!</div>
      ) : (
        <button onClick={handlePayment}>Pay Now</button>
      )}
    </div>
  );
};

export default PaymentPage;
