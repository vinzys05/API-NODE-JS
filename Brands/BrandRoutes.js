const express = require('express');
const BrandController = require('../Brands/controller/BrandController');
const router = express.Router();

// Routes for brand
router.post('/post', BrandController.createBrand);
router.get('/getall', BrandController.getAllBrands);
router.get('/get/:id', BrandController.getBrandById);
router.put('/update/:id', BrandController.updateBrand);
router.delete('/delete/:id', BrandController.deleteBrand);

module.exports = router;
