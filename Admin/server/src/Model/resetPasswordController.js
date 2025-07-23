const bcrypt = require('bcrypt');
const User = require('../Database/adminRegisterandLogin');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const resetPassword = async (req, res) => {
  try {
    const { emailorPhoneNumber, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: emailorPhoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

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
      to: user.email,
      subject: 'Password Reset Successful',
  html: `
    <h2 style="font-size: 24px;">Your password has been successfully reset.</h2>
    <p>Thank you for resetting your password. If you did not initiate this change, please contact our support team immediately.</p>
    <p>If you have any further questions or need assistance, feel free to reach out to us.</p>
    <p>Best regards,</p>
    <p>Holiday Industry</p>
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

module.exports = { resetPassword };
