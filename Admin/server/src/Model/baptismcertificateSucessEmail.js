const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const BaptismVerificationSucess = async (req, res) => {
  try {
    const { email,otp,  issuedBy,issuedTo, } = req.body;

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
      subject: 'Certificate Verification Successful',
  html: `
 
  <h2 style="font-size: 24px; color: green;">Certificate Verification Successful</h2>
  <p>Your certificate verification has been successful.</p>
  <p>OTP: ${otp}</p>
  <p>Issued By: ${issuedBy}</p>
  <p>Issued To: ${issuedTo}</p>
  <p>Do not share your OTP, Issued By, or Issued To information.</p>
  <p>If you have any further questions or need assistance, please don't hesitate to contact our support team.</p>
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

module.exports = { BaptismVerificationSucess };
