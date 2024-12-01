const express = require('express');
const UserController = require('../Users/controller/UserController'); 
const AuthService = require('../Users/controller/AuthService');
const router = express.Router();


router.get('/getall', UserController.getAllUsers);
router.get('/get/:id', UserController.getUserById);

//  Validasi User
router.post('/register', UserController.registerUser);

router.put('/update/:id', UserController.updateUser);

// untuk test login
router.post('/login', AuthService.loginUser);


module.exports = router;
