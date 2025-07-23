const express = require('express');
const { createPrayerRequest, getPrayerRequests, deletePrayerRequest } = require('../Model/prayerRequestController');

const prayerRequestRouter = express.Router();

prayerRequestRouter.post('/api/prayer-request', createPrayerRequest);
prayerRequestRouter.get('/api/prayer-requests/all', getPrayerRequests);
prayerRequestRouter.delete('/api/prayer-requests/delete/:id', deletePrayerRequest);

module.exports = prayerRequestRouter;
