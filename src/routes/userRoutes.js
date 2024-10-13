const express = require('express');
const { register, login, addDevice, removeDevice, sendMessage, linkDevice, unlinkDevice, handleIncomingCall, getAccessibleDevices, makeCallAccessible, switchDevice, syncDataAcrossDevices } = require('../controllers/userController');
const authenticateUserAndDevice = require('../middleware/auth');
const router = express.Router();
const User = require('../models/User');
const Device = require('../models/Device');

// Register route
router.post('/register', register);
// Login route
router.post('/login', login);
// Device management routes
router.post('/add-device', authenticateUserAndDevice, addDevice);
router.post('/remove-device', authenticateUserAndDevice, removeDevice);
router.post('/unlink-device', authenticateUserAndDevice, unlinkDevice);
router.post('/link-device', authenticateUserAndDevice, linkDevice);
// Message management routes
router.post('/sendMessage', authenticateUserAndDevice, sendMessage);
// Call management routes
router.post('/handle-incoming-call', authenticateUserAndDevice, handleIncomingCall);
// Accessibility routes
router.get('/get-accessible-devices/:userId', authenticateUserAndDevice, getAccessibleDevices);
router.post('/make-call-accessible', authenticateUserAndDevice, makeCallAccessible);
// Using the middleware in a secure route
router.use('/secure-route', authenticateUserAndDevice, (req, res) => {
    res.status(200).json({ message: 'Access granted', user: req.user, device: req.device });
});
// Switch device route
router.post('/switch-device', authenticateUserAndDevice, switchDevice);
