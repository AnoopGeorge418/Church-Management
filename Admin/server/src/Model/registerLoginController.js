// controllers/UserController.js
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../Database/adminRegisterandLogin');
const multer = require('multer');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({ name, email, password: hashedPassword , role});
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

   
    const token = jwt.sign({ email: user.email }, 'ad3f9c06580e326d418b207f869ae36d02c3c7127f177a5f7d4838d8e4df63a1');

 
    res.cookie('admin_token', token, {
      secure: true,
      sameSite: 'strict',
      maxAge: 86400000, // one day
      path: '/'
    });
    

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error });
  }
};


// moupdata of admin

const getUsers = async (req, res) => {
  try {
    const users = await User.find(); 
// console.log(users);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', error });
    console.log(error);
  }
};
// moupdata of adminm ends here
// delete admin
const deleteAdmin = async (req, res) => {
  const { transactionId, password } = req.body;

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized: Missing authorization header' });
      return;
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      res.status(401).json({ message: 'Unauthorized: Missing access token' });
      return;
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, 'ad3f9c06580e326d418b207f869ae36d02c3c7127f177a5f7d4838d8e4df63a1');
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const userEmail = decodedToken.email;
    
    // Retrieve the admin based on the provided email
    const admin = await User.findOne({ email: userEmail,role: 'admin' });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email. Admin not found." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password. Admin not deleted." });
    }
  
    // Delete the admin
    try {
      const deletedAdmin = await User.findByIdAndDelete(transactionId);
      if (!deletedAdmin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      console.error('Error deleting admin:', error);
      res.status(500).json({ message: 'Failed to delete admin', error });
    }
    
  } catch (error) {
    res.status(500).json({ message: "Failed to delete admin", error });
  }
};

// delete admin end


// user find for dashbord




const Username = async (req, res) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'ad3f9c06580e326d418b207f869ae36d02c3c7127f177a5f7d4838d8e4df63a1');

    // Token is valid
    const userEmail = decoded.email;

    // Fetch user data using awaitresponse.data
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Data found, return it to the client along with the token validation response
    return res.status(200).json({ message: 'Token is valid', user });
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ message: 'Invalid token' });
  }
};
// dashboard end 


const uploadSignAndSeal = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    let userEmail;

    const accessToken = req.headers.authorization.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, 'ad3f9c06580e326d418b207f869ae36d02c3c7127f177a5f7d4838d8e4df63a1');
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
    const upload = multer({ storage: storage }).fields([{ name: 'sign', maxCount: 1 }, { name: 'seal', maxCount: 1 }]);

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

      if (!req.files || !req.files.sign || !req.files.seal) {
        res.status(400).json({ message: 'Sign and seal images are required' });
        return;
      }

      user.sign = req.files.sign[0].buffer;
      user.seal = req.files.seal[0].buffer;
      await user.save();

      res.json({ message: 'Sign and seal images uploaded successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getUserData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'ad3f9c06580e326d418b207f869ae36d02c3c7127f177a5f7d4838d8e4df63a1');
    const userEmail = decoded.email;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User data retrieved successfully', user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const getSignAndSealImages = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    let userEmail;

    const accessToken = req.headers.authorization.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, 'ad3f9c06580e326d418b207f869ae36d02c3c7127f177a5f7d4838d8e4df63a1');
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

    // Check if the user has both sign and seal images
    if (!user.sign || !user.sign) {
      res.status(404).json({ message: 'Sign and seal images not found' });
      return;
    }

    // Set the appropriate content type for the response
    res.set('Content-Type', 'image/jpeg');

    // Send the binary image data as the response
     res.send(user.sign);
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




//seal


const getSealImages = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    let userEmail;

    const accessToken = req.headers.authorization.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, 'ad3f9c06580e326d418b207f869ae36d02c3c7127f177a5f7d4838d8e4df63a1');
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

    // Check if the user has both sign and seal images
    if (!user.sign || !user.seal) {
      res.status(404).json({ message: 'Sign and seal images not found' });
      return;
    }

    // Set the appropriate content type for the response
    res.set('Content-Type', 'image/jpeg');

    // Send the binary image data as the response
     res.send(user.seal);
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { createUser,login,getUsers,deleteAdmin,Username,uploadSignAndSeal,getUserData, getSignAndSealImages,getSealImages };
