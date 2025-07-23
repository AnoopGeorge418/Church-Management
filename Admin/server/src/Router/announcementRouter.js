const express = require('express');
const announcementrouter = express.Router();
const announcementController = require('../Model/announcementController');

// Create a new announcement
announcementrouter.post('/api/announcement', announcementController.createAnnouncement);

// Get all announcements
announcementrouter.get('/api/announcementList', announcementController.getAllAnnouncements);

// Define other routes for getting, updating, and deleting announcements

// Edit announcement page
announcementrouter.get('/api/announcements/:id', announcementController.getAnnouncementById);

// Update announcement
announcementrouter.put('/api/announcements/:id', announcementController.updateAnnouncement);

announcementrouter.delete('/api/announcements/:id', announcementController.deleteAnnouncement);

// Get announcements by current date and time
announcementrouter.get('/api/announcements/current', announcementController.getAnnouncementsByCurrentDateTime);



module.exports = announcementrouter;

