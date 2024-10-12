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
