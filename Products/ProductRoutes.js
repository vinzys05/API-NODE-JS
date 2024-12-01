const express = require('express');
const ProductController = require('./controller/ProductController');
const multer = require('multer');

const router = express.Router();

// Konfigurasi Multer untuk upload gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Routes
router.get('/getall', ProductController.getAllProducts);
router.get('/get/:id', ProductController.getProductById); 
router.post('/post', upload.single('image'), ProductController.createProduct);
router.put('/update/:id', upload.single('image'), ProductController.updateProduct); 
router.delete('/delete/:id', ProductController.deleteProduct); 

module.exports = router;
