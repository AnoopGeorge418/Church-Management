const express = require('express');
const { saveData,retrieveCertificateData,verifyCertificate} = require('../Model/issueCretificateController');
const { BaptismVerificationFailed}=require('../Model/sendVerificationEmail.BaptismIvalid');
const { BaptismVerificationSucess}=require('../Model/baptismcertificateSucessEmail');

const certificateBaptismRouter = express.Router();



certificateBaptismRouter.post('/api/certificateBaptism', saveData);
certificateBaptismRouter.post('/api/certificateBaptism/failed', BaptismVerificationFailed);
certificateBaptismRouter.post('/api/certificateBaptism/sucess', BaptismVerificationSucess); 
certificateBaptismRouter.post('/api/certificateBaptism/to/user/verification', retrieveCertificateData);
certificateBaptismRouter.get('/api/certificateBaptism/sign',  verifyCertificate)

module.exports =certificateBaptismRouter;