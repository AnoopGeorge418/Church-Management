const express=require('express');
const {logout}=require('../Model/logOutController');
const logOutRouter = express.Router();

logOutRouter.get('/api/logout',logout);

module.exports=logOutRouter;