const express = require('express');
const { verifyOtp } = require('../Model/emailOrSmsOtpVerificationController');
const  verifyOtpRouter = express.Router();


// Define route for sending email with OTP

verifyOtpRouter.post('/api/verify-otp',verifyOtp);


module.exports=verifyOtpRouter;
