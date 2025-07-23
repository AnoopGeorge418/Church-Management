const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: Buffer,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiryTime: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: '_v' }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
