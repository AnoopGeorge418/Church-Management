const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const BaptismCertificate = require('../Database/issueCertificate');

// Function to generate a random 6-digit OTP
const generateOTP = () => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const saveData = async (req, res) => {
  try {
    // Extract the form data from the request body
    const {
      issuedBy,
      issuedTo,
      certificateName,
      name,
      baptismName,
      familyName,
      fatherName,
      motherName,
      dob,
      dateofbaptism,
      birthplace,
      confirmationdate,
      godfather,
      godmother,
      godfatherparish,
      godmotherparish,
      ministername,
      parishminister,
      seal,
      sign,
      housename,
      age,
  confession,
  Viaticum,
  Anoiniting_of_sick,
  sickness,
  date_of_death,
  date_of_Burial,
  Parish_Priest,
   Parish_name,
   marriage_church,
   bridegroom_name,
   bride_Name,
   marriage_date,
   marriage_Celebrant,
   marriage_witness,
   marriage_witness2,
   

    } = req.body;

    // Generate a random 6-digit OTP
    const otp = generateOTP();

    // Create a new instance of the BaptismCertificate model with the form data and OTP
    const baptism = new BaptismCertificate({
      issuedBy,
      issuedTo,
      certificateName,
      name,
      baptismName,
      familyName,
      fatherName,
      motherName,
      dob,
      dateofbaptism,
      birthplace,
      confirmationdate,
      godfather,
      godmother,
      godfatherparish,
      godmotherparish,
      ministername,
      parishminister,
      seal, // Store the seal image path in the BaptismCertificate model
      sign, // Store the sign image path in the BaptismCertificate model
      otp,
      housename,
      age,
  confession,
  Viaticum,
  Anoiniting_of_sick,
  sickness,
  date_of_death,
  date_of_Burial,
  Parish_Priest,
   Parish_name, 
   marriage_other_data: {
    marriage_church,
    marriage_date,
    marriage_Celebrant,
    marriage_witness,
    marriage_witness2,
  },
  bridegroom_Marriagedata: {
    bridegroom_name,
  },
  bride_Marriagedata: {
    bride_Name,
  }, 
    });

    // Log the data received (Optional, for debugging purposes)
    console.log('Received data:', baptism);

    // Save the baptism data to the database
    await baptism.save();

    // Respond with a success message and the generated OTP
    res.status(200).json({ message: 'Data and images saved successfully.', otp });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'An error occurred while saving data.' });
  }
};



const retrieveCertificateData = async (req, res) => {
  try {
    // Extract the OTP, Issued By, and Issued From from the request body
    const { otp, issuedBy, issuedTo } = req.body;

    // Find the BaptismCertificate that matches the provided OTP, Issued By, and Issued From
    const certificate = await BaptismCertificate.findOne({ otp, issuedBy, issuedTo });

    if (!certificate) {
      // If no matching record is found, return a 404 response
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Send the relevant certificate data back to the frontend as the response
    res.status(200).json(certificate);
  } catch (error) {
    console.error('Error retrieving certificate data:', error);
    res.status(500).json({ message: 'An error occurred while retrieving certificate data.' });
  }
};

// Assuming you have imported the necessary dependencies and the BaptismCertificate model

const verifyCertificate = async (req, res) => {
  try {
    // Extract the OTP and data name from the query parameters
    const { otp, name } = req.query;

    // Find the BaptismCertificate that matches the provided OTP and data name
    const certificate = await BaptismCertificate.findOne({ otp, name });

    if (!certificate) {
      // If no matching record is found, return a 404 response
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // If the certificate is found, send the relevant certificate data back to the frontend as the response
    res.status(200).json(certificate);
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({ message: 'An error occurred while verifying certificate' });
  }
};



module.exports = {
  saveData,
  retrieveCertificateData,
  verifyCertificate,
};
