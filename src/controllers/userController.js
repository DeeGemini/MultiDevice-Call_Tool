const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Device = require('../models/Device');

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

module.exports = {
    register
}