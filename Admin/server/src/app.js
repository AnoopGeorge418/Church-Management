
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const familyRouter = require('./Router/addFamilyRouter');
const announcementRouter = require('./Router/announcementRouter');
const baptismRouter =require('./Router/baptismRouter');
const Registerrouter =require('./Router/registerLoginRouter');
const engagementRouter = require('./Router/engagementRouter');
const marriageRouter = require('./Router/marriageRouter');
const deathRouter = require('./Router/deathRouter');
const Jwtrouter = require('./Router/jwtVerfiyRouter');
const emailRouter = require('./Router/emailRouter');
const verifyOtpRouter = require('./Router/emailOrSmsOtpVerificationRouter');
const resetPasswordRouter = require('./Router/resetPasswordRouter');
const aboutrouter = require('./Router/aboutRouter');
const certificateBaptismRouter = require('./Router/issueCertificateRouter')

const logOutRouter = require('./Router/logoutRouter');
const app = express();
// Allow CORS from localhost:3000
const allowedOrigins = ['http://localhost:3000','http://localhost:3001'];
app.use(cors({
  origin:   allowedOrigins ,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].join(','),
}));

// const db = require('./db');
// Parse JSON request bodies
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
// API routes
app.use( familyRouter);
app.use(announcementRouter);
app.use(baptismRouter);
app.use(Registerrouter);
app.use(engagementRouter);
app.use(marriageRouter);
app.use(deathRouter);
app.use(Jwtrouter);
app.use(emailRouter)
app.use(verifyOtpRouter);
app.use(resetPasswordRouter);
app.use(aboutrouter);
app.use(certificateBaptismRouter);
app.use(logOutRouter);
module.exports=app;
