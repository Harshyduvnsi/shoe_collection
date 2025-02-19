import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For linking to other pages
import '../css/cart.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div key={product._id} className="cart-item">
              <img src={product.imageUrl} alt={product.name} />
              <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button onClick={() => removeFromCart(product._id)}>
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <p>Total Price: ${totalPrice}</p>
        <button className="clear-cart" onClick={clearCart}>
          Clear Cart
        </button>
        <Link to="/payment">
          <button className="checkout">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
