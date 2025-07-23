const mongoose = require('mongoose');

const marriageSchema = new mongoose.Schema({
  
  bridegroom_Marriagedata: { 
      bridegroom_name: {
    type: String

  },
  bridegroom_baptism_name: {
    type: String
  },
  bridegroom_familyName: {
    type: String
  },
  bridegroom_fatherName: {
    type: String
  },
  bridegroom_motherName: {
    type: String
  },
  bridegroom_age: {
    type: Number
  },

 
},

bride_Marriagedata: { 
  bride_Name: {
    type: String
  },
  bride_baptismName: {
    type: String
  },
  bride_familyName: {
    type: String
  },
  bride_fatherName: {
    type: String
  },
  bride_motherName: {
    type: String
  },
  bride_age: {
    type: Number
  },
 
 
},

marriage_other_data: { 
  marriage_date: {
    type: String
},
marriage_Celebrant: {
 type: String
},
marriage_witness: {
    type: String
   },
   marriage_witness2: {
    type: String
   },
   marriage_church: {
    type: String
   },
   marriage_priest: {
 type: String
},
},
  
});

const Marriage = mongoose.model('Marriage', marriageSchema);

module.exports = Marriage;