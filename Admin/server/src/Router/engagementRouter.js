const express = require('express');
const {  createEngagement,searchengagement,getEngagementById,updateEngagement} = require('../Model/engagementController');

const engagementRouter = express.Router();



engagementRouter.post('/api/addEngagement',createEngagement);
engagementRouter.get('/api/searchengagement',searchengagement);
engagementRouter.get('/api/engagement/:id', getEngagementById);
engagementRouter.put('/api/engagementUpdate/:id',updateEngagement);
module.exports = engagementRouter;