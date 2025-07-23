const Baptism = require('../Database/baptism');

// Create a new baptism record
const createBaptism = async (req, res) => {
  try {
    const baptismData = req.body;
    const baptism = new Baptism(baptismData);
    const savedBaptism = await baptism.save();
    res.status(201).json({success:true,savedBaptism});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the baptism record' });
  }
};
const searchbaptism = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    // Perform the search query
    const searchResults = await Baptism.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { baptismName: { $regex: searchTerm, $options: 'i' } },
        // Add more fields to search as needed
      ],
    });

    res.json({ results: searchResults });
  } catch (error) {
    console.error('Error searching baptism records:', error);
    res.status(500).json({ error: 'An error occurred while searching baptism records' });
  }
};
//view records
const getBaptismBy = async (req, res) => {
  // const { id } = req.params;

  // try {
  //   const baptism = await Baptism.findById(id);
    
  //   if (!baptism) {
  //     return res.status(404).json({ message: 'Baptism record not found' });
  //   }

  //   return res.status(200).json(baptism);
  // } catch (error) {
  //   console.error('Error retrieving baptism record:', error);
  //   return res.status(500).json({ message: 'Internal server error' });
  // }

  const { id } = req.params;

  try {
    const baptism = await Baptism.findById(id);

    if (!baptism) {
      return res.status(404).json({ message: 'Baptism record not found' });
    }

    return res.status(200).json(baptism);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    console.error('Error retrieving baptism record:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



//update records
const updateBaptism = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const baptism = await Baptism.findByIdAndUpdate(id, updatedData, { new: true });

    if (!baptism) {
      return res.status(404).json({ message: 'Baptism record not found' });
    }

    return res.status(200).json(baptism);
  } catch (error) {
    console.error('Error updating baptism record:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
//dash



const getBaptismStatistics = async (req, res) => {
  try {
    // Fetch current statistics
    const totalBaptisms = await Baptism.countDocuments();
    const totalActiveBaptisms = await Baptism.countDocuments({ active: true });
    const totalInactiveBaptisms = await Baptism.countDocuments({ active: false });

    const currentStatistics = {
      totalBaptisms,
      totalActiveBaptisms,
      totalInactiveBaptisms,
    };

    // Fetch previous statistics from the database or from another source
    const previousStatistics = {
      totalBaptisms: 8, // Replace with the previous total baptisms count
      totalActiveBaptisms: 7, // Replace with the previous active baptisms count
      totalInactiveBaptisms: 0, // Replace with the previous inactive baptisms count
    };

    // Calculate the increase in the number of baptisms
    const increase = currentStatistics.totalBaptisms - previousStatistics.totalBaptisms;

    // Calculate the increase percentage
    const increasePercentage = Math.round((increase / previousStatistics.totalBaptisms) * 100);

    res.status(200).json({
      currentStatistics,
      previousStatistics,
      increasePercentage,
    });

    console.log(increase)
  } catch (error) {
    console.error('Error fetching baptism statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//dadd


// certificate
// In baptismController.js

const getAdditionalData = async (req, res) => {
  const { name, baptismName, dob, fatherName, motherName } = req.params;

  try {
    // Find all documents in the database where all the provided parameters match
    const additionalData = await Baptism.find({
      name,
      baptismName,
      dob,
      fatherName,
      motherName,
    });

    if (additionalData.length === 0) {
      // If no matching documents are found, return a 404 response
      return res.status(404).json({ message: 'Additional data not found' });
    }

    res.status(200).json(additionalData);
  } catch (error) {
    console.error('Error fetching additional data:', error);
    res.status(500).json({ error: 'An error occurred while fetching additional data' });
  }
};



// certificate end
module.exports = {
  createBaptism,
  searchbaptism,
  getBaptismBy,
  updateBaptism,
  getBaptismStatistics,
  getAdditionalData,
};
