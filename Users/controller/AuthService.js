const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const SECRET_KEY = process.env.SECRET_KEY;

class AuthService {
    // Login user
    static async loginUser(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            const user = await User.findOne({ where: { username } });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { user_id: user.user_id, username: user.username, email: user.email, role: user.role },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            // Set token in cookies (for automatic handling)
            res.cookie('token', token, {
                httpOnly: true, // Prevent access via JavaScript
                secure: process.env.NODE_ENV === 'production', // Secure cookies in production
                maxAge: 60 * 60 * 1000 // 1 hour
            });

            res.status(200).json({
                message: 'Login successful',
                user: {
                    user_id: user.user_id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error during login', error: error.message });
        }
    }
}

module.exports = AuthService;
