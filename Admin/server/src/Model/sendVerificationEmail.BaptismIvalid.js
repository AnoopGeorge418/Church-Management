const bcrypt = require('bcrypt');
const User = require('../Database/adminRegisterandLogin');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const BaptismVerificationFailed = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
  

    // Hash the new password
   
    // Send password reset success email
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      // For example, using Gmail SMTP:
      service: 'gmail',
      auth: {
        user: process.env.USER_Gmail,
        pass: process.env.Gmail_PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER_Gmail,
      to: email,
      subject: 'Certificate Verification Failed',
  html: `
 
  <h2 style="font-size: 24px; color: red;">Certificate Verification Failed</h2>
  <p>We regret to inform you that your certificate Verification has failed.</p>
  <p>Please review the provided information and try again or contact our support team for further assistance.</p>
  <p>Best regards,</p>
  <p>HOILDAY Industry</p>
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Failed to send email:', error);
      } else {
        console.log('Email sent:');
      }
    });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error });
  }
};

module.exports = { BaptismVerificationFailed };
