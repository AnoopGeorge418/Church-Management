const mongoose = require('mongoose');

const baptismSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  baptismName: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  motherName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  dateofbaptism: {
    type: Date,
    required: true
  },
  birthplace: {
    type: String,
    required: true
  },
  palaceofbaptism: {
    type: String,
    required: true
  },
  confirmationdate: {
    type: Date,
    required: true
  },
  godfather: {
    type: String,
    required: true
  },
  godmother: {
    type: String,
    required: true
  },
  godfatherparish: {
    type: String,
    required: true
  },
  godmotherparish: {
    type: String,
    required: true
  },
  ministername: {
    type: String,
    required: true
  },
  parishminister: {
    type: String,
    required: true
  }
});

const Baptism = mongoose.model('Baptism', baptismSchema);

module.exports = Baptism;
