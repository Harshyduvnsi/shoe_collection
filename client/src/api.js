import axios from 'axios';

const API_URL = 'https://backend-71ux.onrender.com/api';

export const getProducts = async () => {
  return await axios.get(`${API_URL}/products`);
};

export const login = async (credentials) => {
  return await axios.post(`${API_URL}/auth/login`, credentials);
};

export const signup = async (userData) => {
  return await axios.post(`${API_URL}/auth/signup`, userData);
};

export const addProduct = async (product) => {
  return await axios.post(`${API_URL}/products/admin/products`, product);
};

export const deleteProduct = async (productId) => {
  return await axios.delete(`${API_URL}/products/admin/products/${productId}`);
};

export const getCart = async () => {
  return await axios.get(`${API_URL}/cart`);
};

export const removeFromCart = async (productId) => {
  return await axios.delete(`${API_URL}/cart/${productId}`);
};

export const updateCartQuantity = async (productId, quantity) => {
  return await axios.put(`${API_URL}/cart/${productId}`, { quantity });
};

export const placeOrder = async () => {
  return await axios.post(`${API_URL}/order`);
};
