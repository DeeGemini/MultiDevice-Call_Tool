const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://nicsadyngwenya:zA5qJpVfLRgQX5XH@cluster0.nvzsxh8.mongodb.net/?w=majority&appName=Cluster0");
// Define User Schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, unique: true },
  lastname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
  phonenumber: { type: String, required: true }
});

// Find all users
userSchema.statics.findAll = async function () {
  return await this.find({});
};

const User = mongoose.model('User', userSchema);

module.exports = User;