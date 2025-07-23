const mongoose = require("mongoose");

// Define the BaptismCertificate schema
const BaptismCertificateSchema = new mongoose.Schema({
  issuedBy: { 
    type: String 
  },
  issuedTo: { type: String },
  name: { type: String },
  certificateName:{ type: String },
  baptismName: { type: String },
  familyName: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  dob: { type: Date },
  dateofbaptism: { type: Date },
  birthplace: { type: String },
  confirmationdate: { type: Date },
  godfather: { type: String },
  godmother: { type: String },
  godfatherparish: { type: String },
  godmotherparish: { type: String },
  ministername: { type: String },
  parishminister: { type: String },
  housename: { type: String },
  age: { type: String },
  confession : { type: String },
  Viaticum:{ type: String },
  Anoiniting_of_sick: { type: String },
  sickness:{ type: String},
  date_of_death:{ type: Date },
  date_of_Burial:{ type: Date },
  Parish_Priest:{ type: String },
   Parish_name:{ type:String},
   
baptismname:{type:String},

marriage_other_data: {
    marriage_church: { type: String },
    marriage_date: { type:  String },
    marriage_Celebrant: { type: String },
    marriage_witness: { type: String },
    marriage_witness2: { type: String },
  },
  bridegroom_Marriagedata: {
    bridegroom_name: { type: String },
  },
  bride_Marriagedata: {
    bride_Name: { type: String },
  },


  seal: { type: String
  }, // Assuming the seal image path is a string
  sign: { type: String 
   
  },
  otp: {
    type: String
   
  },
});

// Create the BaptismCertificate model
const BaptismCertificate = mongoose.model(
  "BaptismCertificate",
  BaptismCertificateSchema
);

// Export the model
module.exports = BaptismCertificate;
