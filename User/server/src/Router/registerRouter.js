const express = require('express');
const { PostRegister,getAllUsers } = require("../Model/registerController");
const registerRouter = express.Router();

registerRouter.post('/register', PostRegister);
registerRouter.get('/register/admin/getAllUsers', getAllUsers);

const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: 'Internal server error' });
};

// Add the error handling middleware function to the LoginRouter
registerRouter.use(errorHandler);
module.exports = registerRouter;

