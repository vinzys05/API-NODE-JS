// userController.js
const User = require('../model/User');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize'); // Import Op for query operations

class UserController {

    // Register User
    static async registerUser(req, res) {
        try {
            const { username, password, email, role } = req.body;
        
            // Validate input
            if (!username || !password || !email || !role) {
                return res.status(400).json({ message: 'All fields are required' });
            }
        
            // Check for duplicate username
            const existingUser = await User.findOne({
                where: { username }
            });
        
            if (existingUser) {
                return res.status(400).json({
                    message: 'Username already exists. Please use a different one.'
                });
            }
        
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
        
            // Create new user
            const newUser = await User.create({
                username,
                password: hashedPassword,
                email,
                role
            });
        
            res.status(201).json({
                message: 'User registered successfully',
                data: {
                    user_id: newUser.user_id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error during registration',
                error: error.message
            });
        }
    }

    // Get all users
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({ data: users });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    }

    // Get user by ID
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (user) {
                res.status(200).json({ data: user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    }

    // Update user by ID
    static async updateUser(req, res) {
        try {
            const { username, password, ...otherData } = req.body;
        
            // Check for duplicate username only if username is updated
            if (username) {
                const existingUser = await User.findOne({
                    where: {
                        username,
                        user_id: { [Op.ne]: req.params.id } // Ensure username is not from the same user
                    }
                });
            
                if (existingUser) {
                    return res.status(400).json({
                        message: 'Username already in use by another account.'
                    });
                }
            }
        
            let updateData = { username, ...otherData };
        
            // Hash password if updated
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updateData.password = hashedPassword;
            }
        
            const updated = await User.update(updateData, { where: { user_id: req.params.id } });
        
            if (updated[0]) {
                res.status(200).json({ message: 'User updated successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    }
}

module.exports = UserController;
