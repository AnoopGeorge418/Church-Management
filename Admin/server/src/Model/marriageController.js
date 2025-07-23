const Marriage = require('../Database/marriage');
const moment = require('moment'); 
// Create a new marriage record
const createMarriage = async (req, res) => {
    try {
      const bridegroom_Marriagedata = req.body.bridegroom_Marriagedata;
      const bride_Marriagedata = req.body.bride_Marriagedata;
      const marriage_other_data =req.body.marriage_other_data;
      // console.log(bridegroom_Marriagedata,111111)
      // console.log(bride_Marriagedata,222222)
      // console.log(marriage_other_data,33333)
      
      const marriage = new Marriage({bridegroom_Marriagedata,bride_Marriagedata,marriage_other_data});
     
      console.log(marriage,4444);
      const savedMarriage = await marriage.save();
      res.status(201).json({success:true,savedMarriage});
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving the marriage record' });
    }
  };
  const searchMarriage = async (req, res) => {
    try {
      const searchTerm = req.query.searchTerm;
  
      // Perform the search query
      const searchResults = await Marriage.find({
        $or: [
          { 'bridegroom_Marriagedata.bridegroom_name':{ $regex: searchTerm, $options: 'i' } },
          {  'bridegroom_Marriagedata.bridegroom_baptism_name': { $regex: searchTerm, $options: 'i' } },
          // Add more fields to search as needed
        ],
      });
  
      res.json({ results: searchResults });
    } catch (error) {
      console.error('Error searching  marriage records:', error);
      res.status(500).json({ error: 'An error occurred while searching  marriage records' });
    }
  };
  //view records
  const getMarriageById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const marriage = await Marriage .findById(id);
      
      if (!marriage) {
        return res.status(404).json({ message: 'Marriage record not found' });
      }
  
      return res.status(200).json(marriage);
    } catch (error) {
      console.error('Error retrieving marriage record:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  const updateMarriage = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const marriage = await Marriage.findByIdAndUpdate(id,updatedData, { new: true });
  
      if (!marriage) {
        return res.status(404).json({ message: 'Marriage record not found' });
      }
  
      return res.status(200).json(marriage);
    } catch (error) {
      console.error('Error updating Marriage record:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  //dash


  const getMarriageStatistics = async (req, res) => {
    try {
      // Fetch current statistics
      const totalMarriages = await Marriage.countDocuments();
      const totalActiveMarriages = await Marriage.countDocuments({ active: true });
      const totalInactiveMarriages = await Marriage.countDocuments({ active: false });
  
      const currentStatistics = {
        totalMarriages,
        totalActiveMarriages,
        totalInactiveMarriages,
      };
  
      // Fetch previous statistics from the database or from another source
      const previousStatistics = {
        totalMarriages: 8, // Replace with the previous total marriages count
        totalActiveMarriages: 7, // Replace with the previous active marriages count
        totalInactiveMarriages: 0, // Replace with the previous inactive marriages count
      };
  
      // Calculate the increase in the number of marriages
      const increase = currentStatistics.totalMarriages - previousStatistics.totalMarriages;
  
      // Calculate the increase percentage
      const increasePercentage = Math.round((increase / previousStatistics.totalMarriages) * 100);
  
      // Return the current statistics, previous statistics, increase, and increase percentage in the response
      res.status(200).json({
        currentStatistics,
        previousStatistics,
        increasePercentage,
      });
    } catch (error) {
      console.error('Error fetching marriage statistics:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  //dash

  //ceri

  const retrieveMatchingMarriageData = async (req, res) => {
    try {
      const { name,baptismName } = req.params;
    
      // Perform the search query based on the extracted data
      const additionalData = await Marriage.find({
        
          'bridegroom_Marriagedata.bridegroom_name':  name, 
           'bridegroom_Marriagedata.bridegroom_baptism_name': baptismName,
      });
      
    if (additionalData.length === 0) {
      return res.status(404).json({ message: 'No matching death records found' });
    }

  
      res.status(200).json(additionalData);
      console.log(additionalData);
    } catch (error) {
      console.error('Error retrieving matching marriage data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  //ceri
  module.exports = {
    createMarriage,
    searchMarriage,
    getMarriageById,
    updateMarriage,
    getMarriageStatistics,
    retrieveMatchingMarriageData
  };