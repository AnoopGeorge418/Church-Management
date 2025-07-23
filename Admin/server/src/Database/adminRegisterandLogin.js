// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },  role:{
    type: String,
  required: true
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpiryTime: {
    type: Date,
    default: null,
  },
  sign: {
    type: Buffer, 
    default: null
  },
  seal: {
    type: Buffer, 
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('Admin_Register', userSchema);

module.exports = User;
