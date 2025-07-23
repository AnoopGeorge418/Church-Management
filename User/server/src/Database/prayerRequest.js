const mongoose = require('mongoose');

const prayerRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prayerFor: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  prayer: {
    type: String,
    required: true,
  },
});

const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema);

module.exports = PrayerRequest;
