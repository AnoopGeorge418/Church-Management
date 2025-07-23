const express = require('express');
const resetPasswordRouter = express.Router();
const { resetPassword } = require('../Model/resetPasswordController');

// POST /reset-password
resetPasswordRouter.post('/api/admim/passwordreset', resetPassword);

module.exports = resetPasswordRouter;
