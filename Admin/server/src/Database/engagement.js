const mongoose = require('mongoose');

const engagementSchema = new mongoose.Schema({
  
    bridegroom_Data: { 
      bridegroom_name: {
    type: String,
    required: true
  },
  bridegroom_baptism_name: {
    type: String,
    required: true
  },
  bridegroom_familyName: {
    type: String,
    required: true
  },
  bridegroom_fatherName: {
    type: String,
    required: true
  },
  bridegroom_motherName: {
    type: String,
    required: true
  },
  bridegroom_dob: {
    type: String,
    required: true
  },
  bridegroom_dateofbaptism: {
    type: String,
    required: true
  },
  bridegroom_birthplace: {
    type: String,
    required: true
  },
 
},

bride_Data: { 
  bride_Name: {
    type: String,
    required: true
  },
  bride_baptismName: {
    type: String,
    required: true
  },
  bride_familyName: {
    type: String,
    required: true
  },
  bride_fatherName: {
    type: String,
    required: true
  },
  bride_motherName: {
    type: String,
    required: true
  },
  bride_dob: {
    type: String,
    required: true
  },
  bride_dateofbaptism: {
    type: String,
    required: true
  },
  bride_Birth_place: {
    type: String,
    required: true
  },
 
},

engagement_other_data: { 
  engagement_date: {
 type: String,
 required: true
},
engagement_Celebrant: {
 type: String,
 required: true
},
engagement_priest: {
 type: String,
 required: true
},
},
  
});

const Engagement = mongoose.model('Engagement',engagementSchema);

module.exports = Engagement;