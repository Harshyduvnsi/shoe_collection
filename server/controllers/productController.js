const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, imageUrl, featured } = req.body;
  try {
    const newProduct = new Product({ name, price, imageUrl, featured });
    await newProduct.save();
    console.log('product saved');
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
