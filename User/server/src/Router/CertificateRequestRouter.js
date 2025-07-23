const express = require('express');
const CertificateRequestrouter = express.Router();
const certificateController = require('../Model/CertificateRequestController');

// POST /certificaterequest  getAllCertificateRequests
CertificateRequestrouter.post('/api/user/CertificateRequest', certificateController.createCertificateRequest);
CertificateRequestrouter.get('/api/user/getAllCertificateRequests', certificateController.getAllCertificateRequests);
CertificateRequestrouter.get('/api/certificaterequest/id/:id', certificateController.getCertificateRequestById);
CertificateRequestrouter.delete('/api/certificaterequest/delete', certificateController.deleteCertificateRequest);
module.exports = CertificateRequestrouter;
