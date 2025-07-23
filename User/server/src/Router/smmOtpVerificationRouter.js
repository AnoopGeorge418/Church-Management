const express = require('express');
const { SmsOtpverify} = require('../Model/smsOtpVerificationController');
const  verifySmsOtpRouter = express.Router();
//optional code for verification , combined email and
//  sms verification in one code ... it is optional purpose {in case of error}

// Define route for sending email with OTP

verifySmsOtpRouter.post('/api/verify-smsotp', SmsOtpverify);


module.exports=verifySmsOtpRouter;
