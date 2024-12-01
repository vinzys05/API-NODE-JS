const express = require('express');
const router = express.Router();
const OrderController = require('./controller/OrderController');
const OrderPay = require('./controller/OrderPay');

// Order routes
router.post('/post', OrderController.createOrder);  // Create order
router.get('/getall', OrderController.getAllOrders);  // Get all orders
router.get('/get/:order_id', OrderController.getOrderById);  // Get order by ID
router.put('/cancel/:order_id', OrderController.cancelOrder);  // Update order status

// OrderPay routes
router.put('/pay/:order_id', OrderPay.completeOrderIfPaid);

module.exports = router;


