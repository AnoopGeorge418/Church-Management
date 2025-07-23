const User = require('../Database/adminRegisterandLogin');

const verifyOtp = async (req, res) => {
  const {emailorPhoneNumber, otp} = req.body;
  try {

    const user = await User.findOne({
      $or: [{ email:emailorPhoneNumber }, { phone:emailorPhoneNumber }]
    });

    if (!user) {
    res.status(404).send('User not found');
    return;
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    
    const currentTime = new Date().getTime();
    if (currentTime > user.otpExpiryTime) {
      return res.status(400).json({ message: 'OTP has expired' });
    }
    

    // Update user document to mark the OTP as verified
    user.isOtpVerified = true;
    user.otp = null;
    user.otpExpiryTime = null;
    await user.save();

    // Set the loggedIn cookie
    res.cookie('AdminloggedIn', true,{
      maxAge: 86400000, // one day,
      secure: true, 
      sameSite: 'strict',
      path: '/'
    });  

    // Send the response
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

module.exports = { verifyOtp };
