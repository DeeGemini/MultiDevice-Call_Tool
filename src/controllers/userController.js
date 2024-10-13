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

// Sending messages across linked devices
const sendMessage = async (req, res) => {
  const { message, senderId, receiverId } = req.body;
  // Fetch the sender's linked device
  const sender = await User.findById(senderId).populate('devices');
  if (!sender) {
    return res.status(404).json({ message: 'Sender not found' });
  }
  // Fetch the receiver's linked device
  const receiver = await User.findById(receiverId).populate('devices');
  if (!receiver) {
    return res.status(404).json({ message: 'Receiver not found' });
  }
  // Send message to receiver and sync it across sender's devices
  const sendMessageToDevie = async (device) => {
    // Simulating sending message to device via API
    console.log(`Message sent to device ${device.deviceId}: ${message}`);
  }
  // Sync message across sender's linked devices
  await Promise.all(sender.devices.map(sendMessageToDevie));
  res.status(200).json({ message: 'Message sent successfully' });
  };

  // Sync call logs across devices
const syncCallLogs = async (userId, callLog) => {
  const user = await User.findById(userId).populate('devices');

  const syncToDevice = async (device) => {
      // Simulating syncing call log via some API or service
      console.log(`Call log synced to device ${device.deviceName}: ${callLog}`);
  };

  await Promise.all(user.devices.map(syncToDevice));
};

// Incoming call log handler
const handleIncomingCall = async (req, res) => {
  const { userId, caller, callee, timestamp } = req.body;

  const callLog = { caller, callee, timestamp };
  // Sync call log across user's devices
  await syncCallLogs(userId, callLog);

  res.status(200).json({ message: 'Call log synced across devices' });
};

// Fetch user's linked devices for accessibility
const getAccessibleDevices = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate('devices');
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ devices: user.devices });
};

// Make a call accessible on multiple devices
const makeCallAccessible = async (req, res) => {
  const { userId, callDetails } = req.body;
  // Simulate making call accessible across devices
  const user = await User.findById(userId).populate('devices');
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }

  user.devices.forEach(device => {
      console.log(`Making call accessible on device: ${device.deviceName}`);
      // Simulate the actual logic to make the call accessible
  });

  res.status(200).json({ message: 'Call made accessible on all devices' });
};

// Switch Devices
const switchDevice = async (req, res) => {
  const { userId, currentDeviceId, newDeviceId } = req.body;

  const user = await User.findById(userId).populate('devices');
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }

  const newDevice = user.devices.find(device => device.deviceId === newDeviceId);
  if (!newDevice) {
      return res.status(400).json({ message: 'New device not linked to user' });
  }

  console.log(`Switched from device ${currentDeviceId} to ${newDeviceId}`);
  res.status(200).json({ message: `Switched to device: ${newDevice.deviceName}` });
};

module.exports = {
    register,
    login,
    addDevice,
    removeDevice,
    linkDevice,
    unlinkDevice,
    sendMessage,
    handleIncomingCall,
    getAccessibleDevices,
    makeCallAccessible,
    switchDevice
};