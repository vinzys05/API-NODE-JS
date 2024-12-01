const express = require('express');
const PaymentController = require('./controller/PaymentController');

const router = express.Router();

// Mendapatkan semua pembayaran
router.get('/getall', PaymentController.getAllPayments);

// Mendapatkan pembayaran berdasarkan order ID
router.get('/get/:order_id', PaymentController.getPaymentByOrder);

// Membuat pembayaran baru
router.post('/post', PaymentController.createPayment);

// Menghapus pembayaran (opsional)
//router.delete('delete/:payment_id', PaymentController.deletePayment);

module.exports = router;
