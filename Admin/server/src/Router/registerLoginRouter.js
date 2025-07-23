// routes/userRoutes.js
const express = require('express');
const Registerrouter = express.Router();
const UserController = require('../Model/registerLoginController');

// Route for creating a new user
Registerrouter.post('/api/admimregister', UserController.createUser);
Registerrouter.post('/api/admimlogin', UserController.login);
Registerrouter.get('/api/admimregister/admindata', UserController. getUsers);
Registerrouter.post('/api/deleteAdmindata', UserController.deleteAdmin);
Registerrouter.get('/api/getAdmindata', UserController.Username);
Registerrouter.post('/api/uploadSignAndSeal', UserController.uploadSignAndSeal); 
Registerrouter.get('/api/getUserData', UserController.getUserData);
Registerrouter.get('/api/getSignAndSealImages', UserController.getSignAndSealImages);
Registerrouter.get('/api/getSignAndSealImages/seal', UserController.getSealImages);
module.exports = Registerrouter;
