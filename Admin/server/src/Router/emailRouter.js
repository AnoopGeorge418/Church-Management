const express =require('express');
const {sendEmail}= require('../Model/emailSendingController');
const emailRouter = express.Router();


// Define route for sending email with OTP
emailRouter.post('/api/admin/send-email', sendEmail);

module.exports =emailRouter; 