const express = require('express');
const { uploadImage } = require('../Model/uplodeController');
const {getImage} =require('../Model/profile')
const profilePictureUploadImage = express.Router();
// Route to upload an image
profilePictureUploadImage.post('/api/upload-image', uploadImage);

// Endpoint for retrieving a profile picture
profilePictureUploadImage.get('/profile-picture', getImage);

module.exports = profilePictureUploadImage;
