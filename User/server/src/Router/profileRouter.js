const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const Profile = require('../Database/profile');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}.jpg`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter
}).single('profileImage');

const handleError = (err, req, res, next) => {
  res.status(500).json({ message: 'Internal server error' });
};

router.post('/', async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError || err) {
          return res.status(400).json({ 
            message: err ? err.message : 'Error uploading file'
          });
        }

        if (!req.file) {
          return res.status(400).json({ message: 'No profile image provided' });
        }

        const profile = await Profile.findOne({ userId: token });
        const profileImagePath = path.resolve('uploads', req.file.filename);

        if (profile) {
          if (fs.existsSync(profileImagePath)) {
            fs.unlinkSync(profile.profileImagePath);
          }

          profile.profileImagePath = profileImagePath;
          await profile.save();
        } else {
          const newProfile = new Profile({
            userId: token,
            profileImagePath
          });
          await newProfile.save();
        }

        res.status(200).json({ message: 'Profile picture uploaded successfully' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
