const express = require('express');
const CustomerController = require('../Customers/controller/CustomerController');
const authenticateToken = require('../Customers/controller/AuthMiddleware');
const router = express.Router();


router.post('/post', authenticateToken,CustomerController.createCustomer);
router.get('/getall', CustomerController.getAllCustomers);
router.get('/get/:id', CustomerController.getCustomerById);
router.put('/update/:id',authenticateToken, CustomerController.updateCustomer);


module.exports = router;

