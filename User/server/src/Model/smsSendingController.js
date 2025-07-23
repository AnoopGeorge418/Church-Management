const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../Database/Register');

const sendSMS = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const name = user.name;
    console.log(user.name);

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // Set OTP expiry time to 5 minutes from now

    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.messages
      .create({
        body: `Hi ${name}, your OTP for verification is ${otp}. This OTP is valid for 5 minutes. Please enter this OTP on the verification page to complete your registration.`,
        from: process.env.TWILIO_NUMBER,
        to: '+91' + phone
      })
      .then(async (message) => {
        console.log('OTP sent: ' + otp);

        // Save OTP and expiry time to database
        user.otp = otp;
        user.otpExpiryTime = otpExpiry;
        await user.save();

        res.status(200).json({ message: 'OTP sent successfully' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Failed to send OTP' });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

module.exports = { sendSMS };
