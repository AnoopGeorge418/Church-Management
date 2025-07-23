const express = require('express');
const aboutrouter = express.Router();
const { saveContainers,getContainers  } = require('../Model/aboutController');

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 500 * 1024 * 1024, // Increase the limit to 500MB
  },
});

// Middleware to handle file upload
aboutrouter.post('/api/about/save', upload.array('containers'), saveContainers);
aboutrouter.get('/api/about', getContainers);

module.exports = aboutrouter;
