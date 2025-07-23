const mongoose = require('mongoose');

const certificateRequestSchema = new mongoose.Schema({
  u_name: {
    type: String,
    required: true,
  },
   
  u_email: {
    type: String,
    required: true,
  },
  certificateName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
  },
 
  baptismName: {
    type: String,
  },
  dob: {
    type: Date,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  godFatherName: {
    type: String,
  },
  godMotherName: {
    type: String,
  },
  marriageSpouseName: {
    type: String,
  },
  marriageDate: {
    type: Date,
  },
  deceasedName: {
    type: String,
  },
  deathDate: {
    type: Date,
  },
  placeOfDeath: {
    type: String,
  },
  causeOfDeath: {
    type: String,
  },
  parish: {
    type: String,
  },
});

const CertificateRequest = mongoose.model('CertificateRequest', certificateRequestSchema);

module.exports = CertificateRequest;
