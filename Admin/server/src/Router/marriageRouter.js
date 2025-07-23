const express = require('express');
const {  createMarriage, searchMarriage,getMarriageById,updateMarriage,getMarriageStatistics,retrieveMatchingMarriageData} = require('../Model/marriageController');

const marriageRouter = express.Router();



marriageRouter.post('/api/addMarriage',createMarriage);
marriageRouter.get('/api/searchmarriage',  searchMarriage,);
marriageRouter.get('/api/marriage/:id', getMarriageById);
marriageRouter .put('/api/updateMarriage/:id',updateMarriage);
marriageRouter.get('/api/ma/statistics', getMarriageStatistics);
marriageRouter.get('/api/marriage/autofill/certificate/:name/:baptismName', retrieveMatchingMarriageData);


module.exports = marriageRouter;