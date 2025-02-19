import React, { useState, useEffect } from 'react';
import { getProducts } from '../api';
import { Link } from 'react-router-dom'; // For linking to the cart page
import '../css/home.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        const featured = response.data.filter(product => product.featured);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
    
    // Retrieve cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="home-page">
      <h1>Explore Our Shoes Collection</h1>

      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p id="product-price">Price: ${product.price}</p>
                <p className="discounted-price">
                  Discounted Price: ${Math.round(product.price * 0.9)}
                </p>
                <button className="add-to-cart" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2>All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display Cart Count in Navbar */}
      <div className="cart-link">
        <Link to="/cart">Go to Cart ({cart.length})</Link>
      </div>
    </div>
  );
};

export default HomePage;
