const express = require('express');
const CategoryController = require('../Categories/controller/CategoryController'); 
const router = express.Router();

router.get('/getall', CategoryController.getAllCategories);
router.post('/post', CategoryController.createCategory);
router.get('/get/:id', CategoryController.getCategoryById);
router.put('/update/:id', CategoryController.updateCategory);
router.delete('/delete/:id', CategoryController.deleteCategory);

module.exports = router;
