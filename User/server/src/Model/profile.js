const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const User = require('../Database/Register');

async function getImage(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized: Missing authorization header' });
      return;
    }
    
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      res.status(401).json({ message: 'Unauthorized: Missing access token' });
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, 'accessSecretKey');
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    userEmail = decodedToken.email;
    // console.log( userEmail)

    const user = await User.findOne({ email: userEmail });
    if (!user || !user.profileImage) {
      res.status(404).json({ message: 'Image not found' });
      return;
    }
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(user.profileImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = { getImage };
