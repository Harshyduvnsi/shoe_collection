import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateCartQuantity } from '../api';
import '../css/cart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartItems(data);
        calculateTotal(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, [cartItems]);

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  const handleQuantityChange = async (productId, quantity) => {
    await updateCartQuantity(productId, quantity);
    setCartItems(cartItems.map(item => item._id === productId ? { ...item, quantity } : item));
    calculateTotal(cartItems);
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(totalAmount);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} />
            <div>{item.name}</div>
            <div>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                min="1"
              />
            </div>
            <div>${item.price}</div>
            <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="checkout">
        <h3>Total: ${total}</h3>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
