const Engagement = require('../Database/engagement');

// Create a new engagement record
const createEngagement = async (req, res) => {
    try {
      const bridegroom_Data = req.body.bridegroom_Data;
      const bride_Data = req.body.bride_Data;
      const engagement_other_data =req.body.engagement_other_data;
      console.log(bridegroom_Data,1111)
      console.log(bride_Data,2222)
      console.log(engagement_other_data,333)
      
      const engagement = new Engagement({bridegroom_Data,bride_Data,engagement_other_data});
     
      console.log(engagement,4444);
      const savedEngagement = await engagement.save();
      res.status(201).json({success:true,savedEngagement});
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while saving the engagement record' });
    }
  };
  const searchengagement = async (req, res) => {
    try {
      const searchTerm = req.query.searchTerm;
  
      // Perform the search query
      const searchResults = await Engagement.find({
        $or: [
          { 'bridegroom_Data.bridegroom_name': { $regex: searchTerm, $options: 'i' } },
          { 'bridegroom_Data.bridegroom_baptism_name': { $regex: searchTerm, $options: 'i' } },
          // Add more fields to search as needed
        ],
      });
  
      res.json({ results: searchResults });
    } catch (error) {
      console.error('Error searching  engagement records:', error);
      res.status(500).json({ error: 'An error occurred while searching  engagement records' });
    }
  };
  //view records
  const getEngagementById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const engagement = await Engagement .findById(id);
      
      if (!engagement) {
        return res.status(404).json({ message: 'Engagement record not found' });
      }
  
      return res.status(200).json(engagement);
    } catch (error) {
      console.error('Error retrieving engagement record:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

//update records
const updateEngagement = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const engagement = await Engagement.findByIdAndUpdate(id,updatedData, { new: true });

    if (!engagement) {
      return res.status(404).json({ message: 'engagement record not found' });
    }

    return res.status(200).json(engagement);
  } catch (error) {
    console.error('Error updating engagement record:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


  module.exports = {
    createEngagement,
    searchengagement,
    updateEngagement,
    getEngagementById,
  };