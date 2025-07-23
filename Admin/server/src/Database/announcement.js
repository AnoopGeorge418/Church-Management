const mongoose = require('mongoose');

// Define the announcement schema
const announcementSchema = new mongoose.Schema({
 
  publishDateTime: {
    type: Date,
    required: true,
  },
  expireDateTime: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

// Create the Announcement model based on the schema
const Announcement = mongoose.model('Announcement', announcementSchema);

// Export the Announcement model
module.exports = Announcement;
