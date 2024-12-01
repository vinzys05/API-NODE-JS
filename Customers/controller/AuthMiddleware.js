// middleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; // Secret key for JWT

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Get the token from cookies or Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Attach the user info to the request object for use in controllers
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateToken;
