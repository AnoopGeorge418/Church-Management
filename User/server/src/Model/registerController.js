const User = require('../Database/Register');
const bcrypt = require('bcrypt');

async function PostRegister(req, res) {
    const { name, phone, email, password } = req.body;

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object with hashed password
    const Registeruser = {
        name: name,
        phone:phone,
        email: email,
        password: hashedPassword
    };

    // Check if user already exists in database
    // const existingUser = await User.findOne({ email: email });

// Check if user already exists in database
const existingUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
if (existingUser) {
  res.json('User already exists with this email or phone number');
  return;
}



    if (existingUser) {
       
        res.json('User already exists');
        return;
    }

    try {
        await User.insertMany([Registeruser]);
        res.json('User created successfully');
    } catch (error) {
        res.json(`Error: ${error}`);
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
        console.log(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {
    PostRegister,
    getAllUsers
};
