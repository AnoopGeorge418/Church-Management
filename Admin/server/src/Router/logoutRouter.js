const express=require('express');
const {logout}=require('../Model/logoutController');
const logOutRouter = express.Router();

logOutRouter.get('/api/logout/admim',logout);

module.exports=logOutRouter;