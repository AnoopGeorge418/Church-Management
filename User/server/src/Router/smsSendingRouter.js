const express = require('express');
const { sendSMS}= require('../Model/smsSendingController');

const sendSMSRouter = express.Router();

sendSMSRouter.post('/api/send-sms',sendSMS);

module.exports=sendSMSRouter;