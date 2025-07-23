const Death = require('../Database/death');

// Create a new baptism record
const createDeath = async (req, res) => {
  try {
    const deathData = req.body;
    const death = new Death(deathData);
   const savedDeath = await death.save();
    res.status(201).json({success:true,savedDeath});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the death record' });
  }
};
const searchdeath = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    // Perform the search query
    const searchResults = await Death.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { baptismName: { $regex: searchTerm, $options: 'i' } },
        // Add more fields to search as needed
      ],
    });

    res.json({ results: searchResults });
  } catch (error) {
    console.error('Error searching death records:', error);
    res.status(500).json({ error: 'An error occurred while searching death records' });
  }
};
//view records
const getDeathById = async (req, res) => {
  const { id } = req.params;

  try {
    const death = await Death.findById(id);
    
    if (!death) {
      return res.status(404).json({ message: 'death record not found' });
    }

    return res.status(200).json(death);
  } catch (error) {
    console.error('Error retrieving death record:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//update records
const updateDeath = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const death = await Death.findByIdAndUpdate(id, updatedData, { new: true });

    if (!death) {
      return res.status(404).json({ message: 'death record not found' });
    }

    return res.status(200).json(death);
  } catch (error) {
    console.error('Error updating death record:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
//dash
const getDeathStatistics = async (req, res) => {
  try {
    // Fetch current statistics
    const totalDeaths = await Death.countDocuments();
    const totalActiveDeaths = await Death.countDocuments({ active: true });
    const totalInactiveDeaths = await Death.countDocuments({ active: false });

    const currentStatistics = {
      totalDeaths,
      totalActiveDeaths,
      totalInactiveDeaths,
    };

    // Fetch previous statistics from the database or from another source
    const previousStatistics = {
      totalDeaths: 8, // Replace with the previous total deaths count
      totalActiveDeaths: 7, // Replace with the previous active deaths count
      totalInactiveDeaths: 0, // Replace with the previous inactive deaths count
    };

    // Calculate the increase in the number of deaths
    const increase = currentStatistics.totalDeaths - previousStatistics.totalDeaths;

    // Calculate the increase percentage
    const increasePercentage = Math.round((increase / previousStatistics.totalDeaths) * 100);

    // Return the current statistics, previous statistics, increase, and increase percentage in the response
    res.status(200).json({
      currentStatistics,
      previousStatistics,
      increasePercentage,
    });
  } catch (error) {
    console.error('Error fetching death statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//dash

// ceri

const retrieveMatchingDeathData = async (req, res) => {
  try {
    const { name, deathDate } = req.params; // Use req.params instead of req.body for URL parameters

    // Perform the search query based on the extracted data
    const additionalData = await Death.find({
      name,
      
date_of_death:deathDate
    });

    if (additionalData.length === 0) {
      return res.status(404).json({ message: 'No matching death records found' });
    }

    res.status(200).json( additionalData );
  } catch (error) {
    console.error('Error retrieving matching death data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//ceri

module.exports = {
  createDeath,
  searchdeath,
  getDeathById,
  updateDeath,
  getDeathStatistics,
  retrieveMatchingDeathData
  
};