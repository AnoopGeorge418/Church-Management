import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Css/baptismCertificate.css";
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";
import {
  Snackbar,
  Alert
} from '@mui/material';

import { useNavigate} from 'react-router-dom'
const BaptismCertificatePage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [data, setData] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const componentRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [issuedBy, setIssuedBy] = useState("");
  const [issuedTo, setIssuedTo] = useState("");

  const[ certificateName,setcertificateName]= useState('')

  const history=useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      // Use the ID to send a request to the backend and get the data
      try {
        const response = await axios.get(
          `http://localhost:8000/api/certificaterequest/id/${id}`
        );
        setData(response.data);
       
        
        // console.log(certificateName, "requst111111111111111"); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const [verificationStatus, setVerificationStatus] = useState(false);
  const [showlodaing, setShowLoading] = useState(true);
  useEffect(() => {
    // Use the data to send another request to the backend and get additional data
    if (
      data &&
      data.name &&
      data.baptismName &&
      data.dob &&
      data.fatherName &&
      data.motherName
    ) {
      const fetchAdditionalData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/baptism/autofill/certificate/${data.name}/${data.baptismName}/${data.dob}/${data.fatherName}/${data.motherName}`
          );
          setAdditionalData(response.data[0]); // Assuming the response from the backend contains additional data
          console.log(response.data);
          console.log("Additional Data:", additionalData);
          setShowLoading(false);
          setVerificationStatus(true);
        } catch (error) {
          console.error("Error fetching additional data:", error);
          setShowLoading(false);
          setVerificationStatus(false);
        }
      };

      fetchAdditionalData();
    }
  }, [data]);
  const handleInputChange = (e) => {};

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [signImage, setSignImage] = useState(null);
  const [sealImage, setSealImage] = useState(null);

  const getSignAndSealImages = () => {
    const token = Cookies.get("admin_token");

    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("http://localhost:5000/api/getSignAndSealImages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer", // To receive binary data (image) as arraybuffer
      })
      .then((response) => {
        console.log(response.data, 766866,"seal");
        // Convert the binary data to a Blob
        const imageArrayBuffer = response.data;
        
        // Create a Blob from the ArrayBuffer
        const imageBlob = new Blob([imageArrayBuffer], { type: "image/jpeg" });

        // Convert the Blob to a data URL
        const imageUrl = URL.createObjectURL(imageBlob);
        setSealImage(imageUrl);

        // Update the state with the image URLs
      })
      .catch((error) => {
        console.error("Error fetching sign and seal images:", error);
      });
  };
  

  const getSealImages = () => {
    const token = Cookies.get("admin_token");

    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("http://localhost:5000/api/getSignAndSealImages/seal", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer", // To receive binary data (image) as arraybuffer
      })
      .then((response) => {
        console.log(response.data,);
        // Convert the binary data to a Blob
        const imageArrayBuffer = response.data;

        // Create a Blob from the ArrayBuffer
        const imageBlob = new Blob([imageArrayBuffer], { type: "image/jpeg" });

        // Convert the Blob to a data URL
        const imageUrl = URL.createObjectURL(imageBlob);
        setSignImage(imageUrl);

        // Update the state with the image URLs
      })
      .catch((error) => {
        console.error("Error fetching sign and seal images:", error);
      });
  };

  useEffect(() => {
    getSignAndSealImages();
    getSealImages();
  }, []);

  //save

  const handleSave = async () => {
    // Show the popup when the "Save" button is clicked
    setShowPopup(true);
  };
  // const[sealimages , setSealimage]=useState(null)
  // const[signimages,setsignimages]=useState(null)
  //   const handleSignUpload = (event) => {
  //     const file = event.target.files[0];
  //     console.log('Sign file object:', file);
  //     setsignimages(file);
  //   };

  //   const handleSealUpload = (event) => {
  //     const file = event.target.files[0];
  //     console.log('Seal file object:', file);
  //     setSealimage(file);
  //   };

  // Function to submit the popup form data
  // Function to submit the popup form data
  const handleSubmitPopup = async (e,email) => {
    e.preventDefault();

    try {
      const formData = {
        issuedBy,
        issuedTo,
        ...additionalData, // Spread additionalData to include all the form fields

        certificateName: data.certificateName,
        seal: sealImage,
        sign: signImage,
      };

      // Log the form data (Optional, for debugging purposes)
      console.log("Form Data:", formData);

      // Send the formData to the backend using Axios
      const response = await axios.post(
        "http://localhost:5000/api/certificateBaptism",
        formData,
        {
          // Set the headers based on the backend requirements
          headers: {
            "Content-Type": "application/json", // Use application/json if sending as JSON data
            // You might need to include an authentication token if required by your backend
            // 'Authorization': `Bearer ${YOUR_AUTH_TOKEN}`,
          },
        
        }
      );
     

      // Handle the response as needed (e.g., show a success message)
      console.log("Response from server:", response.data.otp);
      await axios.post("http://localhost:5000/api/certificateBaptism/sucess", {
        email:data.u_email,
        otp: response.data.otp,
        issuedBy,
        issuedTo,
      });
      setSnackbarMessage("Certificate saved successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
  
      // Hide the popup when the data is successfully saved
      setShowPopup(false);
      // Reset the input fields
      setIssuedBy("");
      setIssuedTo("")
    } catch (error) {
      console.error("Error saving data:", error);
      // Display an error message to the user, or any other action you want to take
    }
    try {
      // Delete the certificate request with the given ID
      await axios.delete("http://localhost:8000/api/certificaterequest/delete", {
        data: { id: data._id },
      });
      console.log("Certificate request deleted successfully");
      setSnackbarMessage("Certificate request deleted successfully");
      setSnackbarSeverity("success");
      // Set snackbarOpen to true to display the snackbar
      setSnackbarOpen(true);
      history("/GenerateCertificate")
    } catch (error) {
      console.error("Error deleting certificate request:", error);
      // Handle the error appropriately (e.g., display an error message)
      setSnackbarMessage("Error deleting certificate request");
      setSnackbarSeverity("error");
      // Set snackbarOpen to true to display the snackbar
      setSnackbarOpen(true);
    }

    
  };

  const handleCancelPopup = () => {
    // Hide the popup when the user cancels the dialog
    setShowPopup(false);
    // Reset the input fields
    setIssuedBy("");
    setIssuedTo("");
  };
  //save end
  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const dateObject = new Date(dateString);

    // Get the day, month, and year from the date object
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear();

    // Format the date as "dd-mm-yyyy"
    return `${day}-${month}-${year}`;
  };

  const sendVerificationEmail = async (email, id) => {
    try {
      // Send the verification email using Axios or any other suitable method
      // For example:
      await axios.post("http://localhost:5000/api/certificateBaptism/failed", {
        email,
      });
      console.log("Verification email sent successfully.");
      setSnackbarMessage("Verification email sent successfully");
      setSnackbarSeverity("success");
      // Set snackbarOpen to true to display the snackbar
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error sending verification email:", error);
      // Handle the error appropriately (e.g., display an error message)
      setSnackbarMessage("Error sending verification email");
      setSnackbarSeverity("error");
      // Set snackbarOpen to true to display the snackbar
      setSnackbarOpen(true);
    }
  
    try {
      // Delete the certificate request with the given ID
      await axios.delete("http://localhost:8000/api/certificaterequest/delete", {
        data: { id: data._id },
      });
      console.log("Certificate request deleted successfully");
      setSnackbarMessage("Certificate request deleted successfully");
      setSnackbarSeverity("success");
      // Set snackbarOpen to true to display the snackbar
      setSnackbarOpen(true);
      history("/GenerateCertificate")
    } catch (error) {
      console.error("Error deleting certificate request:", error);
      // Handle the error appropriately (e.g., display an error message)
      setSnackbarMessage("Error deleting certificate request");
      setSnackbarSeverity("error");
      // Set snackbarOpen to true to display the snackbar
      setSnackbarOpen(true);
    }
  };
  
  const handleSendVerificationRequest = () => {
    // Check if the data state contains a valid email address
    if (data?.u_email) {
      // Call the sendVerificationEmail function with the u_email from the data state
      sendVerificationEmail(data.u_email);
      handleSubmitPopup(data.u_email);
      console.log(data.u_email, "yyyyyyyyyyy");
    } else {
      // Handle the case where u_email is missing or invalid
      console.error("Invalid email address");
      // Display an error message or take any other appropriate action
    }
  };
  return (
    <>
     
      <document>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        style={{ whiteSpace: 'normal' }}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
        {showlodaing ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div>
            {verificationStatus ? (
              <div className="baptism_certificate_box">
                <div ref={componentRef} className="baptism_card">
                  <div className="baptismcertifiace_container">
                    <div className="baptism_box_to_move">
                      <h1 className="baptism_cert_heading">
                        DIOCESE OF BELTHANGADY
                      </h1>
                      <p className="baptism_cert_bapt">
                        CERTIFICATE OF BAPTISM
                      </p>
                      {/* {message && <div className={message.includes('successfully') ? 'message success' : 'message error'}>{message}</div>} */}
                      {/* <form> */}
                      <div>
                        <label className="baptism_certificate_details">
                          Name{" "}
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="name"
                          value={additionalData?.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Baptism Name
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="baptismName"
                          value={additionalData?.baptismName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="baptism_certificate_details">
                          Family Name
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="familyName"
                          value={additionalData?.familyName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Father Name
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="fatherName"
                          value={additionalData?.fatherName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Mother Name
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="motherName"
                          value={additionalData?.motherName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Date of Birth
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="dob"
                          value={formatDate(
                            additionalData?.dob
                              ? new Date(additionalData.dob)
                                  .toISOString()
                                  .substring(0, 10)
                              : ""
                          )}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Date of Baptism
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="dateofbaptism"
                          value={formatDate(
                            additionalData?.dateofbaptism
                              ? new Date(additionalData?.dateofbaptism)
                                  .toISOString()
                                  .substring(0, 10)
                              : ""
                          )}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Place of Birth
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="birthplace"
                          value={additionalData?.birthplace}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="baptism_certificate_details">
                          Date of Confirmation
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="confirmationdate"
                          value={formatDate(
                            additionalData?.confirmationdate
                              ? new Date(additionalData?.confirmationdate)
                                  .toISOString()
                                  .substring(0, 10)
                              : ""
                          )}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Name of GodFather
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="godfather"
                          value={additionalData?.godfather}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="baptism_certificate_details">
                          Name of GodMother
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="godmother"
                          value={additionalData?.godmother}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Parish of GodFather
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="godfatherparish"
                          value={additionalData?.godfatherparish}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Parish of GodMother
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="godmotherparish"
                          value={additionalData?.godmotherparish}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Name of Minister
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="ministername"
                          value={additionalData?.ministername}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="baptism_certificate_details">
                          Parish of Minister
                        </label>
                        <p className="detalis">:</p>
                        <input
                          className="baptism_certificate_data"
                          readOnly
                          type="text"
                          name="parishminister"
                          value={additionalData?.parishminister}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* <button onClick={Click}>next</button>  */}
                      <p className="baptism_overall">
                        Certified the above is a true extract from the Baptism
                        Register maintained in this church
                      </p>

                      <p className="baptism_seal">(seal)</p>

                      {signImage && (
                        <div className="Sign_and_Seal">
                          <img
                            className="signuploadforcertify"
                            src={signImage}
                            alt="Sign"
                          />
                        </div>
                      )}
                      {sealImage && (
                        <div>
                          <img
                            className="sealuploadforbapcertify"
                            src={sealImage}
                            alt="Seal"
                          />
                        </div>
                      )}

                      <p className="baptism_sign">
                        singature of the Parish Priest
                      </p>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
                <button onClick={handlePrint} className="print__button">
                  {" "}
                  Print{" "}
                </button>
                <button onClick={handleSave} className="print__button_savebap">
                  Save
                </button>
                {showPopup && (
                  <div className="modal">
                    <div className="modal-content">
                      <h2 className="modal-heading">
                        Enter Issued By and Issued From
                      </h2>
                      <input
                        type="text"
                        name="issuedBy"
                        value={issuedBy}
                        onChange={(e) => setIssuedBy(e.target.value)}
                        className="modal-input"
                        placeholder="Issued By"
                      />
                      <input
                        type="text"
                        name="issuedTo"
                        value={issuedTo}
                        onChange={(e) => setIssuedTo(e.target.value)}
                        className="modal-input"
                        placeholder="Issued To"
                      />
                      <div>
                        <button
                          onClick={handleSubmitPopup}
                          className="modal-button"
                        >
                          Submit
                        </button>
                        <button
                          onClick={handleCancelPopup}
                          className="modal-button cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="popup">
                <p className="popup_p">
                  Data not found. Please send a verification request.
                </p>
                <button
                  className="popup_btn"
                  onClick={handleSendVerificationRequest}
                >
                  Send Verification Request
                </button>
              </div>
            )}
          </div>
          
        )}
       
      </document>
     
    </>
  );
};

export default BaptismCertificatePage;
