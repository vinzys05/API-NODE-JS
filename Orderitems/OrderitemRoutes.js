// orderItemRoutes.js
const express = require('express');
const router = express.Router();
const OrderItemController = require('./controller/OrderItemController');

// Route untuk menambahkan order items
router.post('/post', OrderItemController.addOrderItems);

// Route untuk mendapatkan semua order items
router.get('/getall', OrderItemController.getAllOrderItems);

// Route untuk mendapatkan order items berdasarkan order ID
router.get('/get/:order_id', OrderItemController.getOrderItemsByOrder);

module.exports = router;
