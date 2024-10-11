const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Device = require('../models/Device');

// Fetch all users
const findAll= async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Register user
const register = async (req, res) => {
    const { firstname, lastname, email, password, phonenumber } = req.body;
  
    try {
      // Check if user exists
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      if (!firstname || !lastname || !email || !password || !phonenumber) {
        return res.status(400).json({ message: 'Please enter all fields' });
      }
  
      // Create new user
      user = new User({ firstname, lastname, email, password, phonenumber });
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save user
      try {
        await user.save();
        console.log(user);
      } catch (error) {
        return res.status(500).json({ message: 'Server error' });
      }
  
      // Generate JWT
      const payload = { userId: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
  
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add device
// Add device to user's account
const addDevice = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { deviceName, deviceType} = req.body;

    // Chaeck if device already exists
    let device = await Device.findOne({ user: user._id });
    if (device) {
      return res.status(400).json({ message: 'Device already exists' });
    }

    // Create a new device
    device = new Device({ deviceName, deviceType, user: user._id });
    await device.save();

    // Add device to user's accoun
    user.devices.push(device._id);
    await user.save();
    res.status(201).json({ message: 'Device added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove device from user's account
const removeDevice = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: 'User ID is missing' });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { deviceId } = req.body;
    if (!deviceId) {
      return res.status(400).json({ message: 'Device ID is missing' });
    }

    // Find the device to remove
    const device = await Device.findOne({ deviceId, user: user._id });
    if (!device) {
      return res.status(400).json({ message: 'Device not found in user\'s account' });
    }

    // Remove device from the user's device list
    user.devices = user.devices.filter(deviceId => deviceId.toString() !== deviceId.toString());

    // Remove the device from the database
    await Device.findByIdAndDelete(device._id);

    await user.save();
    res.status(200).json({ message: 'Device removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Linking a device to a user's account
const linkDevice = async (req, res) => {
  const { userId, deviceId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Check if the device is already linked to the user
  const deviceExists = user.devices.some(device => device.deviceId === deviceId);
  if (deviceExists) {
    return res.status(400).json({ message: 'Device already linked to user' });
  }
  // Link the new device to the user
  const newDevice = new Device({ deviceId, deviceName, user: user._id });
  await newDevice.save();

  res.status(201).json({ message: 'Device linked successfully', device: newDevice });
};

// Unlinking a device from a user's account
const unlinkDevice = async (req, res) => {
  const { userId, deviceId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Find the device to unlink
  const device = user.devices.find(device => device.deviceId === deviceId);
  if (!device) {
    return res.status(400).json({ message: 'Device not found in user\'s account' });
  }
  // Unlink the device from the user
  user.devices = user.devices.filter(device => device.deviceId !== deviceId);
  await user.save();
  res.status(200).json({ message: 'Device unlinked successfully' });
};


module.exports = {
    register,
    login,
    addDevice,
    removeDevice,
    linkDevice,
    unlinkDevice
}