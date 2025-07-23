const express = require('express');
const {createDeath,searchdeath,getDeathById,updateDeath,getDeathStatistics,retrieveMatchingDeathData} = require('../Model/deathController');

const deathRouter = express.Router();



deathRouter.post('/api/addDeath', createDeath);
deathRouter.get('/api/searchdeath', searchdeath );
deathRouter.get('/api/death/:id', getDeathById);
deathRouter.put('/api/deathUpdate/:id', updateDeath);
deathRouter.get('/api/dth/statistics', getDeathStatistics);
deathRouter.get('/api/death/autofill/certificate/:name/:deathDate',retrieveMatchingDeathData);

module.exports = deathRouter;