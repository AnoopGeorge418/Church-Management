const jwt = require('jsonwebtoken');
const User = require('../Database/Register');
const multer = require('multer');

async function uploadImage(req, res) {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }else{

    let userEmail;

    const accessToken = req.headers.authorization.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, 'accessSecretKey');
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    userEmail = decodedToken.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const storage = multer.memoryStorage();

    const upload = multer({ storage: storage }).single('profilePicture');

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error(err);
        res.status(400).json({ message: 'Image upload failed' });
        return;
      } else if (err) {
        console.error(err);
        res.status(400).json({ message: 'Image upload failed' });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: 'No file received' });
        return;
      }

      user.profileImage = req.file.buffer;
      await user.save();

      res.json({ message: 'Image uploaded successfully' });
    });
  }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  
}

module.exports = { uploadImage };

// const jwt = require('jsonwebtoken');
// const User = require('../Database/Register');
// const multer = require('multer');

// // Create multer storage
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
// }).single('profilePicture');

// async function uploadImage(req, res) {
//   try {
//     if (!req.headers.authorization) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     let userEmail;

//     const accessToken = req.headers.authorization.split(' ')[1];
//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(accessToken, 'accessSecretKey');
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
  
//     userEmail = decodedToken.email;

//     const user = await User.findOne({ email: userEmail });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     upload(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         console.error(err);
//         return res.status(400).json({ message: 'Image upload failed' });
//       } else if (err) {
//         console.error(err);
//         return res.status(400).json({ message: 'Image upload failed' });
//       }

//       if (!req.file) {
//         return res.status(400).json({ message: 'No file received' });
//       }

//       user.profileImage = req.file.buffer;
//       await user.save();

//       return res.json({ message: 'Image uploaded successfully' });
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// }

// module.exports = { uploadImage };
