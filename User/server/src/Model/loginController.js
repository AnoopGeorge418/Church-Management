const bcrypt = require('bcrypt');
const User = require('../Database/Register');
const jwt = require('jsonwebtoken');

async function getLogin(req, res) {
    const { emailorPhoneNumber, password } = req.body;
    try {
      // Checking if the user exists in the database by email or phone number
      const user = await User.findOne({
        $or: [{ email:emailorPhoneNumber }, { phone:emailorPhoneNumber }]
      });

      if (user) {
        try {
          // Using promise for checking the password with encrypted password
          const isPasswordMatch = await bcrypt.compare(password, user.password);
  
          // If password is matched then generate access tokens
          if (isPasswordMatch) {
            let userIdentifier;

            if (user.email) {
              userIdentifier = { email: user.email };
            } else {
              userIdentifier = { email: await User.findOne({ phone: user.phone }, 'email') };
            }

            const accessToken = jwt.sign(userIdentifier, 'accessSecretKey', { expiresIn: '1d' });
            // Secure cookie by using 'https' and adding 'sameSite' attribute
            res.cookie('token', accessToken, {
              secure: true,
              sameSite: 'strict',
              maxAge: 86400000, // one day
              path: '/'
            });
            
            // res.cookie('loggedIn', true,{
            //   maxAge: 86400000, // one day,
            //   secure: true, 
            //   sameSite: 'strict',
            //   path: '/'
            // });  
            
            // Redirect to home page
            res.status(200).json({ message: "Login successful"});
          } else {
            res.status(401).json({ message: "Invalid email or password" });
          }
        } catch (error) {
          // Handle errors thrown by bcrypt.compare() 
          res.status(500).json({ message: error.message });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
  module.exports = { getLogin };