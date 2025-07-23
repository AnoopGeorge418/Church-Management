const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../Database/adminRegisterandLogin');

const sendEmail = async (req, res) => {
  let name;
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    name = user.name;
 
// Generateing random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000); 
    // Set OTP expiry time to 5 minutes from now
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.USER_Gmail,
        pass: process.env.Gmail_PASS
      }
    });

    const mailOptions = {
      from: process.env.USER_Gmail,
      to: email,
      subject: 'OTP for verification',
      text: `Hi ${name},\n\nYour OTP for verification is ${otp}. This OTP is valid for 5 minutes. Please enter this OTP on the verification page to complete your registration.\n\nThanks,\nHoliday Production House`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to send OTP' });
      } else {
        // console.log('OTP sent: ' + otp);

        // Saveing OTP and expiry time to database
        user.otp = otp;
        user.otpExpiryTime = otpExpiry;
        await user.save();

        res.status(200).json({ message: 'OTP sent successfully' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

module.exports = { sendEmail };
