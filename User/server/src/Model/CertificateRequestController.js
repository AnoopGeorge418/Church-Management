const CertificateRequest = require('../Database/CertificateRequest');

// POST /certificaterequest
const createCertificateRequest = async (req, res) => {
  try {
    const {
      u_name,
      u_email,
      name,
      email,
      certificateName,
      baptismName,
      dob,
      fatherName,
      motherName,
      godFatherName,
      godMotherName,
      marriageSpouseName,
      marriageDate,
      deceasedName,
      deathDate,
      placeOfDeath,
      causeOfDeath,
      parish,
    } = req.body;

    // Create a new certificate request instance
    const certificateRequest = new CertificateRequest({
      u_name,
      u_email,
      name,
      email,
      certificateName,
      baptismName,
      dob,
      fatherName,
      motherName,
      godFatherName,
      godMotherName,
      marriageSpouseName,
      marriageDate,
      deceasedName,
      deathDate,
      placeOfDeath,
      causeOfDeath,
      parish,
    });

    // Save the certificate request to the database
    await certificateRequest.save();

    res.status(201).json({ message: 'Certificate request created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create certificate request' });
  }
};


const getAllCertificateRequests = async (req, res) => {
  try {
    // Retrieve all certificate requests from the database
    const allCertificateRequests = await CertificateRequest.find();

    res.status(200).json(allCertificateRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve certificate requests' });
  }
};

// Get a specific certificate request by ID
const getCertificateRequestById = async (req, res) => {
  try {
    const certificateRequestId = req.params.id;

    // Retrieve the certificate request from the database using the ID
    const certificateRequest = await CertificateRequest.findById(certificateRequestId);

    if (!certificateRequest) {
      // If no certificate request found for the given ID, return a 404 response
      return res.status(404).json({ message: 'Certificate request not found' });
    }

    res.status(200).json(certificateRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve certificate request' });
  }
};

// Delete a specific certificate request by ID

const deleteCertificateRequest = async (req, res) => {
  try {
    const certificateRequestId = req.body.id; // Use req.body instead of req.params to get the ID

    // Find the certificate request by ID and delete it
    const deletedCertificateRequest = await CertificateRequest.findByIdAndDelete(certificateRequestId);

    if (!deletedCertificateRequest) {
      // If no certificate request found for the given ID, return a 404 response
      return res.status(404).json({ message: 'Certificate request not found' });
    }

    res.status(200).json({ message: 'Certificate request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete certificate request' });
  }
};
module.exports = {
  createCertificateRequest,
  getAllCertificateRequests,
  getCertificateRequestById,
  deleteCertificateRequest
};
