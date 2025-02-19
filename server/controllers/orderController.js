const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.placeOrder = async (req, res) => {
  const { userId } = req.user;
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const totalAmount = cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0);

    const newOrder = new Order({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount,
    });

    await newOrder.save();
    await Cart.deleteOne({ userId });

    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};
