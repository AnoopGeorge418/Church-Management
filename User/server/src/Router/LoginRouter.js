const express = require('express');
const { getLogin}  = require('../Model/loginController');

const LoginRouter = express.Router();   

LoginRouter.post("/api/login", getLogin);

// Error handling middleware function
const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: 'Internal server error' });
};

// Add error handling middleware function to the LoginRouter
LoginRouter.use(errorHandler);

module.exports = LoginRouter;
