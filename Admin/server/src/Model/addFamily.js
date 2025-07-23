const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const Family = require('../Database/addFamily');
const multer = require('multer');
// Controller function to handle saving family data
const  saveFamily= async (req, res) => {
  try {
    const { father, mother, children, houseName, address, housepincode } = req.body;

    // Create a new Family instance
    const family = new Family({
      father,
      mother,
      children,
      houseName,
      address,
      housepincode,
    });

    // Save the family data to the database
    await family.save();

    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during saving' });
  }
};



// Controller for handling family search
const searchFamily = async (req, res) => {
  try {
    const { q } = req.query;
    const regexQuery = new RegExp(q, 'i');
    let searchResult ;

    if(mongoose.Types.ObjectId.isValid(q)) {
      searchResult=await Family.find({_id:q});

    }else{
    searchResult = await Family.find({
      $or: [
        { 'father.name': regexQuery },
        { 'mother.name': regexQuery },
        { 'children.name': regexQuery },
        { 'children.wife.name': regexQuery},
      ],
    });
  }
    res.status(200).json(searchResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during the search' });
  }
};


const EditsearchFamily = async (req, res) => {
  try {
    const { name, familyId } = req.query;
    const query = {
      _id: familyId,
      $or: [
        { 'father.name': name },
        { 'mother.name': name },
        { 'children.name': name },
        { 'children.wife.name': name },
      ],
    };

    const family = await Family.findOne(query);

    if (!family) {
      return res.status(404).json({ error: 'Family not found' });
    }

    res.status(200).json(family);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


//update family





const updatePerson = async (req, res) => {
  try {
    const { name, familyId } = req.query;
    const formData = req.body;

    const query = {
      _id: familyId,
      $or: [
        { 'father.name': name },
        { 'mother.name': name },
        { 'children.name': name },
        { 'children.wife.name': name },
       
      ],
    };

    const updatedPerson = await Family.findOne(query);

    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Update the address, pincode, and house name
    updatedPerson.address = formData.address || updatedPerson.address;
    updatedPerson.housepincode = formData.housepincode || updatedPerson.housepincode;
    updatedPerson.houseName = formData.houseName || updatedPerson.houseName;

    // Update the father if the name matches
    if (updatedPerson.father.name === name) {
      updatedPerson.father = { ...updatedPerson.father, ...formData };
    }

    // Update the mother if the name matches
    if (updatedPerson.mother.name === name) {
      updatedPerson.mother = { ...updatedPerson.mother, ...formData };
    }

    // Update the children if the name matches
    updatedPerson.children.forEach((child) => {
      if (child.name === name) {
        child.name = formData.name || child.name;
        child.baptism_name = formData.baptism_name || child.baptism_name;
        child.dob = formData.dob || child.dob;
        child.age = formData.age || child.age;
        child.phoneNumber = formData.phoneNumber || child.phoneNumber;
        child.email = formData.email || child.email;
        child.status = formData.status || child.status;
        child.situation = formData.situation || child.situation;
      }
      
      // Update the child's wife if the name matches
      if (child.wife && child.wife.name === name) {
        child.wife.name = formData.name || child.wife.name;
        child.wife.baptism_name = formData.baptism_name || child.wife.baptism_name;
        child.wife.dob = formData.dob || child.wife.dob;
        child.wife.age = formData.age || child.wife.age;
        child.wife.phoneNumber = formData.phoneNumber || child.wife.phoneNumber;
        child.wife.email = formData.email || child.wife.email;
        child.wife.situation = formData.situation || child.wife.situation;
      }
    });
    
   
    const savedPerson = await updatedPerson.save();

    res.status(200).json(savedPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//adding new children


const addChild = async (req, res) => {
 
  try {
    const id = req.query.q; // Extract the id from the query parameters
    const { name, baptism_name, dob, age, phoneNumber, email, status, situation, gender } = req.body;

    // Find the family document by id
    const family = await Family.findById(id);

    if (!family) {
      return res.status(404).json({ error: 'Family not found' });
    }

    // Create a new child object
    const child = {
      name,
      baptism_name,
      dob,
      age,
      phoneNumber,
      email,
      status,
      situation,
      gender,
    };

    // Add the child to the family's children array
    family.children.push(child);

    // Save the updated family document
    await family.save();

    res.status(200).json({ message: 'Child added successfully' });
  } catch (error) {
    console.error('Error adding child:', error);
    res.status(500).json({ error: 'Error adding child' });
  }
};

// Update wife details for a child
const updatenewife = async (req, res) => {
  const { name, familyId, childId } = req.query;

  try {
    // Check if familyId and childId are valid ObjectId values
    if (!mongoose.Types.ObjectId.isValid(familyId) || !mongoose.Types.ObjectId.isValid(childId)) {
      return res.status(400).json({ error: 'Invalid familyId or childId' });
    }

    // Find the family by ID and update the child's wife details
    const updatedFamily = await Family.findOneAndUpdate(
      { _id: familyId, 'children._id': childId },
      { $set: { 'children.$.wife': req.body } },
      { new: true }
    );

    if (!updatedFamily) {
      return res.status(404).json({ error: 'Family or child not found' });
    }

    res.json(updatedFamily);
    console.log(updatedFamily);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//family data sending to front

const getFamilyData = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized: Missing authorization headers' });
      return;
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      res.status(401).json({ message: 'Unauthorized: Missing access token' });
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, 'accessSecretKey');
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const userEmail = decodedToken.email;

    const user = await Family.findOne({
      $or: [
        { 'father.email': userEmail },
        { 'mother.email': userEmail },
        { 'children.email': userEmail },
        { 'children.wife.name': userEmail }
      ]
    }).populate('children');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // console.log(user);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Family DATA SENDING TO FRONT ENd

// toggle button update
const toggleFamilyActiveStatus = async (req, res) => {
  try {
    const { active } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: Missing authorization headers' });
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized: Missing access token' });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, 'accessSecretKey');
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userEmail = decodedToken.email;

    const user = await Family.findOne({
      $or: [
        { 'father.email': userEmail },
        { 'mother.email': userEmail },
        { 'children.email': userEmail },
        { 'children.wife.name': userEmail
       }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.active = active;
    await user.save();

    return res.status(200).json({ message: 'Family active status updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
// toggle button update endpoint


//user family to search
const userFamilySearch = async (req, res) => {
  try {
    const { searchQuery } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: Missing authorization headers' });
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized: Missing access token' });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, 'accessSecretKey');
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userEmail = decodedToken.email;

    const user = await Family.findOne({
      $or: [
        { 'father.email': userEmail },
        { 'mother.email': userEmail },
        { 'children.email': userEmail },
        { 'children.wife.name': searchQuery }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let searchResult;
    if (user) {
      searchResult = await Family.findOne({
        $or: [
          { houseName: searchQuery },
          { 'father.name': searchQuery },
          { 'mother.name': searchQuery },
          { 'children.name': searchQuery },
          { 'children.wife.name': searchQuery } // Include wife's name in the search
        ]
      });
    }

    if (!searchResult) {
      return res.status(404).json({ message: 'Search result not found' });
    }

    if (!searchResult.active) {
      return res.status(200).json({ message: 'Family found but not active', searchResult: null });
    }

    return res.status(200).json({ message: 'Search result found', searchResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
//use family ends


// user dashbord
const getFamilyStatistics = async (req, res) => {
  try {
    // Fetch current statistics
    const totalFamilies = await Family.countDocuments();
    const totalActiveFamilies = await Family.countDocuments({ active: true });
    const totalInactiveFamilies = await Family.countDocuments({ active: false });
    const totalChildren = await Family.aggregate([
      { $unwind: "$children" },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);
    const totalMarriages = await Family.aggregate([
      { $match: { "children.wife": { $exists: true } } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    const currentStatistics = {
      totalFamilies,
      totalActiveFamilies,
      totalInactiveFamilies,
      totalChildren: totalChildren[0]?.count || 0,
      totalMarriages: totalMarriages[0]?.count || 0,
    };

    // Fetch previous statistics from the database or from another source
    const previousStatistics = {
      totalFamilies: 8, // Replace with the previous total families count
      totalActiveFamilies: 7, // Replace with the previous active families count
      totalInactiveFamilies: 0, // Replace with the previous inactive families count
      totalChildren: 0, // Replace with the previous total children count
      totalMarriages: 0, // Replace with the previous total marriages count
    };

    // Calculate the increase in the number of families
    const increase = currentStatistics.totalFamilies - previousStatistics.totalFamilies;

    // Calculate the increase percentage
    const increasePercentage = Math.round((increase / previousStatistics.totalFamilies) * 100);

    // console.log('Current Statistics:', currentStatistics);
    // console.log('Previous Statistics:', previousStatistics);
    // console.log('Increase:', increase);
    // console.log('Increase Percentage:', increasePercentage);

    res.status(200).json({ currentStatistics, previousStatistics, increasePercentage });
  } catch (error) {
    // console.error('Error fetching family statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// user dashbord endpoint

//pie cahrt


const getFamilyPieChartData = async (req, res) => {
  try {
    const data = await Family.aggregate([
      {
        $project: {
          allAges: {
            $concatArrays: [
              { $cond: [{ $lte: ["$father.age", 18] }, ["age 0-19"], []] },
              {
                $cond: [
                  { $and: [{ $gte: ["$father.age", 19] }, { $lte: ["$father.age", 39] }] },
                  ["19-39"],
                  [],
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$father.age", 40] }, { $lte: ["$father.age", 50] }] },
                  ["40-50"],
                  [],
                ],
              },
              {
                $cond: [{ $gte: ["$father.age", 51] }, ["50-60"], []],
              },
              {
                $cond: [{ $gte: ["$father.age", 61] }, ["60-above"], []],
              },
              {
                $cond: [{ $lte: ["$mother.age", 18] }, ["age 0-19"], []],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$mother.age", 19] }, { $lte: ["$mother.age", 39] }] },
                  ["19-39"],
                  [],
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$mother.age", 40] }, { $lte: ["$mother.age", 50] }] },
                  ["40-50"],
                  [],
                ],
              },
              {
                $cond: [{ $gte: ["$mother.age", 51] }, ["50-60"], []],
              },
              {
                $cond: [{ $gte: ["$mother.age", 61] }, ["60-above"], []],
              },
              {
                $reduce: {
                  input: "$children",
                  initialValue: [],
                  in: {
                    $concatArrays: [
                      "$$value",
                      { $cond: [{ $lte: ["$$this.age", 18] }, ["age 0-19"], []] },
                      {
                        $cond: [{ $and: [{ $gte: ["$$this.age", 19] }, { $lte: ["$$this.age", 39] }] },
                          ["19-39"],
                          [],
                        ],
                      },
                      {
                        $cond: [{ $and: [{ $gte: ["$$this.age", 40] }, { $lte: ["$$this.age", 50] }] },
                          ["40-50"],
                          [],
                        ],
                      },
                      {
                        $cond: [{ $gte: ["$$this.age", 51] }, ["50-60"], []],
                      },
                      {
                        $cond: [{ $gte: ["$$this.age", 61] }, ["60-above"], []],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
      {
        $unwind: "$allAges",
      },
      {
        $group: {
          _id: "$allAges",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          label: "$_id",
          value: "$count",
        },
      },
    ]);

    // Return the data to the client
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching family pie chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


 
//pie ends

module.exports = { saveFamily,searchFamily,EditsearchFamily, updatePerson,addChild,updatenewife,getFamilyData,toggleFamilyActiveStatus,userFamilySearch,getFamilyStatistics,getFamilyPieChartData};