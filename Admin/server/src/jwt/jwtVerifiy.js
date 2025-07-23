const jwt = require('jsonwebtoken');

const validateToken = (req, res) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'ad3f9c06580e326d418b207f869ae36d02c3c7127f177a5f7d4838d8e4df63a1');

    // Token is valid
    return res.status(200).json({ message: 'Token is valid', decoded });
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  validateToken,
};
