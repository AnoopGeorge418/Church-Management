const Announcement = require('../Database/announcement');

async function createAnnouncement(req, res) {
  try {
    const randomId = Math.random().toString(36).substring(7);
    // Extract announcement data from the request body
    const { publishDateTime, expireDateTime, text } = req.body;

    // Create a new announcement document
    const announcement = new Announcement({
      publishDateTime,
      expireDateTime,
      text,
    });

    // Save the announcement document to the database
    const result = await announcement.save();

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create announcement' });
  }
}

async function getAllAnnouncements(req, res) {
  try {
    // Retrieve all announcements from the database
    const announcements = await Announcement.find();

    res.json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get announcements' });
  }
}

// async function getAnnouncementById(req, res) {
//   try {
//     const announcementId = req.params.id;

//     // Retrieve the specific announcement by ID from the database
//     const announcement = await Announcement.findById(announcementId);

//     if (!announcement) {
//       return res.status(404).json({ error: 'Announcement not found' });
//     }

//     res.json(announcement);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to get announcement' });
//   }
// }

async function getAnnouncementById(req, res) {
  try {
    const announcementId = req.params.id;

//     // Check if the ID is "current" and retrieve the announcement with the current date and time
    if (announcementId === "current") {
      const currentDateTime = new Date();
      const announcement = await Announcement.findOne({
        publishDateTime: { $lte: currentDateTime }
      });

      res.json(announcement);
    } else {
      // Retrieve the announcement by its ID
      const announcement = await Announcement.findById(announcementId);
      res.json(announcement);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get announcement by ID' });
  }
}



//update
async function updateAnnouncement(req, res) {
  try {
    const announcementId = req.params.id;
    const { text } = req.body;

    // Find the announcement by ID and update the text
    const announcement = await Announcement.findByIdAndUpdate(
      announcementId,
      { $set: { text } },
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update announcement' });
  }
}



const deleteExpiredAnnouncements = async () => {
  try {
    const currentDateTime = new Date();
    
    const expiredAnnouncements = await Announcement.find({
      expireDateTime: { $lte: currentDateTime },
    });

    if (expiredAnnouncements.length > 0) {
      await Announcement.deleteMany({
        expireDateTime: { $lte: currentDateTime },
      });
      console.log('Expired announcements deleted:', expiredAnnouncements);
    }
  } catch (error) {
    console.error(error);
  }
};

setInterval(deleteExpiredAnnouncements, 60000); // Run the deletion check every minute



async function getAnnouncementsByCurrentDateTime(req, res) {
  try {
    const currentDateTime = new Date(); // Get the current date and time

    // Retrieve announcements that have the current date and time or earlier
    const announcements = await Announcement.find({
      publishDateTime: { $lte: currentDateTime }
    });

    res.json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get announcements by current date and time' });
  }
}



async function deleteAnnouncement(req, res) {
  try {
    const announcementId = req.params.id;

    // Find the announcement by ID and remove it
    const deletedAnnouncement = await Announcement.findByIdAndRemove(announcementId);

    if (!deletedAnnouncement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
}


module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  getAnnouncementsByCurrentDateTime,

};
