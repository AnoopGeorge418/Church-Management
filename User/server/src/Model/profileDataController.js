const jwt = require('jsonwebtoken');
const User = require('../Database/Register');

async function getProfileData(req ,res){   
    try{
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
  
    const userEmail = decodedToken.email;    
    // console.log( userEmail)

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    res.send({ email: user.email, phone: user.phone ,name: user.name });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {getProfileData };   