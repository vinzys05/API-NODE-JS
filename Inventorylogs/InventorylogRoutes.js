const express = require('express');
const router = express.Router();
const InventoryLogController = require('./controller/InventorylogController');

// Get all inventory logs
router.get('/getall', InventoryLogController.getAllLogs);

// Get inventory logs by product ID
router.get('/get/:product_id', InventoryLogController.getLogsByProduct);


module.exports = router;
