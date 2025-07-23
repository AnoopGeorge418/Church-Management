const About = require('../Database/aboutModel');

// Controller function to handle saving the container data
const saveContainers = async (req, res) => {
  const { containers } = req.body;

  if (!containers || !Array.isArray(containers)) {
    console.error('Invalid request body:', req.body);
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    const containerPromises = containers.map(async (container) => {
      const { image, info } = container;

      const newContainer = new About({
        image: image ? image.toString('base64') : null,
        info: info,
      });

      await newContainer.save();
    });

    await Promise.all(containerPromises);

    res.status(200).json({ message: 'Containers saved successfully' });
  } catch (error) {
    console.error('Error saving containers:', error);
    res.status(500).json({ message: 'Error saving containers', error: error });
  }
};

// get image
const getContainers = async (req, res) => {
    try {
      const containers = await About.find();
      const updatedContainers = containers.map(container => ({
        _id: container._id,
        info: container.info,
        image: {
          data: container.image.toString('base64')
        }
      }));
      res.status(200).json(updatedContainers);
    } catch (error) {
      console.error('Error retrieving containers:', error);
      res.status(500).json({ message: 'Error retrieving containers', error: error });
    }
  };
  

//getImage end

module.exports = {
  saveContainers,
  getContainers 
  
};
