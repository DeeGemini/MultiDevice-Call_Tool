const express = require('express');
const { register, login, addDevice, removeDevice, sendMessage, linkDevice, unlinkDevice, handleIncomingCall, getAccessibleDevices, makeCallAccessible, switchDevice, syncDataAcrossDevices } = require('../controllers/userController');
const authenticateUserAndDevice = require('../middleware/auth');
const router = express.Router();
const User = require('../models/User');
const Device = require('../models/Device');

// Register route
router.post('/register', register);
