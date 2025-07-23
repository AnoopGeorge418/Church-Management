const express = require('express');
const { createBaptism, searchbaptism, getBaptismBy,updateBaptism,getBaptismStatistics, getAdditionalData} = require('../Model/baptismController');

const baptismRouter = express.Router();



baptismRouter.post('/api/addBaptism', createBaptism);
baptismRouter.get('/api/searchBaptism', searchbaptism );
baptismRouter.get('/api/baptism/:id', getBaptismBy);
baptismRouter.put('/api/baptismUpdate/:id', updateBaptism)
baptismRouter.get('/api/Statistics',getBaptismStatistics);
baptismRouter.get('/api/baptism/autofill/certificate/:name/:baptismName/:dob/:fatherName/:motherName', getAdditionalData);

module.exports = baptismRouter;
