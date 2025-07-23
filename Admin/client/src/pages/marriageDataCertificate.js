import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";
import { Snackbar, Alert } from "@mui/material";
import "../Css/MarriageCertificateData.css";
import { useNavigate } from "react-router-dom";

function MarriageDataCertificate() {
  const { id } = useParams(); // Get the ID from the URL
  const [data, setData] = useState(null);
  const componentRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [issuedBy, setIssuedBy] = useState("");
  const [issuedTo, setIssuedTo] = useState("");
  const [certificateName, setCertificateName] = useState("");

  const history = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const [verificationStatus, setVerificationStatus] = useState(false);
  const [showlodaing, setShowLoading] = useState(true);


  const [signImage, setSignImage] = useState(null);
  const [sealImage, setSealImage] = useState(null);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const [additionalData, setAdditionalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/certificaterequest/id/${id}`
        );
        setData(response.data);
        setLoading(false);
        console.log(response.data.deathDate, "555555555555");
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Make the second API call based on the fetched data
  useEffect(() => {
    if (!loading && data) {
      const fetchAdditionalData = async () => {
        try {
          const formattedDate = new Date(data.marriageDate).toISOString().split('T')[0];
          const response = await axios.get(
            `http://localhost:5000/api/marriage/autofill/certificate/${data.name}/${data.baptismName}`
          );
          setAdditionalData(response.data[0]);
          console.log(response.data, "marriage");
          console.log("Marriage Data:", response.data);
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
  }, [data, loading]);
  

  //   const handleSave = async () => {
  //     // Show the popup when the "Save" button is clicked
  //     setShowPopup(true);
  //   };

  const handleInputChange = (e) => {};

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
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
      await axios.delete(
        "http://localhost:8000/api/certificaterequest/delete",
        {
          data: { id: data._id },
        }
      );
      console.log("Certificate request deleted successfully");
      setSnackbarMessage("Certificate request deleted successfully");
      setSnackbarSeverity("success");
      // Set snackbarOpen to true to display the snackbar
      setSnackbarOpen(true);
      history("/GenerateCertificate");
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
  const handleSubmitPopup = async (e, email) => {
    e.preventDefault();

    try {
      const formData = {
        issuedBy,
        issuedTo,
        ...additionalData.marriage_other_data,
        ...additionalData.bridegroom_Marriagedata, // Spread additionalData to include all the form fields
        ...additionalData.bride_Marriagedata,
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
        email: data.u_email,
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
      setIssuedTo("");
    } catch (error) {
      console.error("Error saving data:", error);
      // Display an error message to the user, or any other action you want to take
    }
    try {
      // Delete the certificate request with the given ID
      await axios.delete(
        "http://localhost:8000/api/certificaterequest/delete",
        {
          data: { id: data._id },
        }
      );
      console.log("Certificate request deleted successfully");
      setSnackbarMessage("Certificate request deleted successfully");
      setSnackbarSeverity("success");
      // Set snackbarOpen to true to display the snackbar
      setSnackbarOpen(true);
      history("/GenerateCertificate");
    } catch (error) {
      console.error("Error deleting certificate request:", error);
      // Handle the error appropriately (e.g., display an error message)
      setSnackbarMessage("Error deleting certificate request");
      setSnackbarSeverity("error");
      // Set snackbarOpen to true to display the snackbar
      setSnackbarOpen(true);
    }
  };

  const handleSave = async () => {
    // Show the popup when the "Save" button is clicked
    setShowPopup(true);
  };

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
        console.log(response.data, 766866, "seal");
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
        console.log(response.data);
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

 
  return (
   <>

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
      /* Code to display when verificationStatus is true */
      <div>

      <div className='marriage-Container'>
      <div className='marriage-box'>
      <div ref={componentRef} >
      <div className='marriage-InnerBorder'>
        <div className='marriage-heading'>
           Marriage Certificate
        </div>
        <div className='marriage-image'></div>
        <div className='marriage-sub'>
            Church of
        </div>
        <input className='marriage-input1' 
        type='text'
         readOnly
         name="marriage_church"
         value={additionalData?.marriage_other_data.marriage_church}>

         </input>
        {/* <br/>
        <input className='marriage-input1' type='text' required></input> */}
        <div className='marriage-2nd_heading'>
            This is to Certify
        </div>
        <div className='marriage-labels_and_inputs'>
          <div className='marriage-labels_and_inputs'>
              <label className='marriage-label'>That</label>
              <input 
                className='marriage-input2' 
                type='text' 
                readOnly
                name="bridegroom_name"
            value={additionalData?.bridegroom_Marriagedata.bridegroom_name}
          >
               </input>
               <label className='marriage-label'>and</label>
               <input 
                className='marriage-input3' 
                type='text' 
                readOnly
                name="bride_Name"
                value={additionalData?.bride_Marriagedata.bride_Name}
                >
               </input>
          </div>
          <div className='marriage-labels_and_inputs'>
             <label className='marriage-label7'>were lawfully</label>
             <label className='marriage-label8'>Married</label>
          </div>
            <div lassName='marriage-labels_and_inputs1'>
               <label className='marriage-label1'>on the</label>
              <input 
                className='marriage-input5'
                required
                type='date'
                readOnly
                name="marriage_date"
                value={additionalData?.marriage_other_data.marriage_date}
              
                >
              </input>
                {/* <label className='marriage-label2'>day of</label>
              <input 
                className='marriage-input6'
                required
                type='text'
                ></input> */}
            </div>
            <h3 className='marriage-para'>
                According to the Rite of the Roman Cathlic Church
            </h3>
            <h3 className='marriage-h3'>
                and the confirmity with the laws of the State of Karnataka
            </h3>
             <div className='marriage-labels_and_inputs'>
            {/* <label className='marriage-label6'>the State of</label>
              <input 
                className='marriage-input10'
                required
                type='text'
                ></input> */}
                 <label className='marriage-label'>Rev,</label>
              <input 
                className='marriage-input14'
                required
                type='text'
                readOnly
                name="marriage_Celebrant"
            value={additionalData?.marriage_other_data.marriage_Celebrant}
         


                ></input>
                <label className='marriage-label9'>officiating,</label>
                <label className='marriage-label'>in the presence of</label>
              <input 
                className='marriage-input15'
                required
                type='text'
                readOnly
                name="marriage_witness"
                value={additionalData?.marriage_other_data.marriage_witness}
               
                ></input>
                <label className='marriage-label'>and</label>
              <input 
                className='marriage-input16'
               required
                type='text'
                readOnly
                name="marriage_witness2"
                value={additionalData?.marriage_other_data.marriage_witness2}
                
                ></input>
                <label className='marriage-label10'>witnesses.</label>
                <p className='marriage-para2'>
                    as appears from the Marriage Register of this Church.
                </p>
            </div>
            {/* <div className='marriage-rev'>
                 <label className='revDetail'>Dated</label>
                 <input
                   className='marriage-input12'
                   type='text'
                   required
                   ></input>
            </div> */}
            <div className='marriage-labels_and_inputs'>
                <label className='revDetail2'>Signature of the Priest</label>
                {/* <input
                   className='marriage-input13'
                   type='text'
                  readOnly
                  name="marriage_priest"
                  value={formData.marriage_other_data.marriage_priest}
                  onChange={handleInputChangeotherdetails}

                   ></input> */}
            </div>
            <div className='marriage-labels_and_inputs'>
                <label className='revDetail3'>Seal</label>
                {/* <input
                   className='marriage-input13'
                   type='text'
                  readOnly
                  name="marriage_priest"
                  value={formData.marriage_other_data.marriage_priest}
                  onChange={handleInputChangeotherdetails}

                   ></input> */}
            </div>
        </div> 
        </div>
        {signImage && (
                      <div className="Sign_and_Sealdeathmarriage">
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
                          className="sealuploadforcertify"
                          src={sealImage}
                          alt="Seal"
                        />
                      </div>
                    )}
      </div>
    </div>
    <button onClick={handlePrint} className='oooo00'>  Print </button>
    </div>


    <button onClick={handleSave} className="print__button_savemarraa">
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
        <div>
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
            </div>
    )}
  </div>
)}




   </>
  )
}
export default MarriageDataCertificate