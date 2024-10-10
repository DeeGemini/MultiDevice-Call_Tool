const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate user using JWT and device
const authenticateUserAndDevice = async (req, res, next) => {
    // Extract token from the headers
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify JWT token and extract userId
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const userId = decoded.userId;

        // Extract deviceId from the request body
        const { deviceId } = req.body;

        if (!deviceId) {
            return res.status(401).json({ message: 'Device ID is missing' });
        }

        // Fetch user and check if the device is linked
        const user = await User.findById(userId).populate('devices');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const device = user.devices.find(d => d.deviceId === deviceId);
        if (!device) {
            return res.status(401).json({ message: 'Device not linked to user' });
        }

        // Set req.user and req.device for the next middleware or route
        req.user = user;
        req.device = device;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is not valid or server error' });
    }
};

module.exports = authenticateUserAndDevice;
