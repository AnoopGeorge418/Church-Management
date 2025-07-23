const mongoose = require('mongoose');

// Create a schema for the about us container
const containerSchema = new mongoose.Schema({
  image: Buffer,
  info: String,
});

// Create a model based on the container schema
const About = mongoose.model('About', containerSchema);

module.exports = About;
