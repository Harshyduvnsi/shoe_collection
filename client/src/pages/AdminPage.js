import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct, addProduct } from '../api';
import '../css/admin.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '', featured: false });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.data);
      } catch (err) {
        setError('Error fetching products.');
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      setError('Error deleting product.');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      console.log('product aded');
      setProducts([...products, newProduct]);
      setNewProduct({ name: '', price: '', imageUrl: '', featured: false });
    } catch (err) {
      setError('Error adding product.');
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="url"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <label>
          Featured
          <input
            type="checkbox"
            checked={newProduct.featured}
            onChange={() => setNewProduct({ ...newProduct, featured: !newProduct.featured })}
          />
        </label>
        <button type="submit">Add Product</button>
      </form>

      <div className="product-list">
        {products.map((product,i) => (
          <div key={i} className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <div>{product.name}</div>
            <div>${product.price}</div>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
