const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const registerRouter = require('./Router/registerRouter');
const LoginRouter =require('./Router/LoginRouter');
const profilePictureUploadImage = require('./Router/uplodeRouter');
const emailRouter =require("./Router/emailRouter");
const verifyOtpRouter = require('./Router/emailOrSmsOtpVerificationRouter');
const sendSMSRouter = require('./Router/smsSendingRouter');
// const verifySmsOtpRouter =require('./Router/smmOtpVerificationRouter');
const profileDataRouter =require('./Router/profileDataRouter')
const logOutRouter =require('./Router/logoutRouter');
const  PrayerRequsetRouter = require('./Router/prayerRequestRouter');
const CertificaterequestRouter = require('./Router/CertificateRequestRouter');
const resetPasswordRouter = require('./Router/resetPasswordRouter')
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const allowedOrigins = [process.env.CORS_URL, process.env.CORS_ADMIN_URL, process.env.CORS_URL_SUB , process.env.Cross_Domain_request, process.env.cross_Domain_request_sub]

// Allow CORS 
app.use(cors({
  origin:allowedOrigins ,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].join(','),
}));


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// })
// Enable CORS
// app.use(cors());
// app.options('*', cors());

// Add bodyParser middleware
app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));


// Parse cookies sent from the client
app.use(cookieParser());
// Routes
app.use(registerRouter);
app.use(LoginRouter);
app.use(profilePictureUploadImage);
app.use(emailRouter);
app.use(verifyOtpRouter);//email otp verifivation
app.use(sendSMSRouter);
// app.use(verifySmsOtpRouter);//pemding to connect  front end
app.use(profileDataRouter);
app.use(logOutRouter);
app.use( PrayerRequsetRouter); 
app.use(CertificaterequestRouter); 
app.use(resetPasswordRouter);



// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Catch-all route handler that sends index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
