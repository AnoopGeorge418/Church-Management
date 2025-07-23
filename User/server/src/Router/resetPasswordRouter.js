const express = require('express');
const {resetPassword}=require('../Model/resetPasswordController');
const resetPasswordRouter=express.Router();

resetPasswordRouter.post('/api/resetpassword',resetPassword);

module.exports=resetPasswordRouter;