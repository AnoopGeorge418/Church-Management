const PrayerRequest = require('../Database/prayerRequest');

const createPrayerRequest = async (req, res) => {
  try {
    const { name, prayerFor, email, phoneNumber, prayer } = req.body;

    const newPrayerRequest = new PrayerRequest({
      name,
      prayerFor,
      email,
      phoneNumber,
      prayer,
    });

    await newPrayerRequest.save();

    res.status(201).json({ message: 'Prayer request submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getPrayerRequests = async (req, res) => {
    try {
      const prayerRequests = await PrayerRequest.find();
      res.status(200).json(prayerRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



  const deletePrayerRequest = async (req, res) => {
    try {
      const { id } = req.params;
      await PrayerRequest.findByIdAndRemove(id);
  
      res.status(200).json({ message: 'Prayer request deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = { createPrayerRequest,  getPrayerRequests ,deletePrayerRequest };
