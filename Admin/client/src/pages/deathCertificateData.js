import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Css/baptismCertificate.css";
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";
import { Snackbar, Alert } from "@mui/material";
import "../Css/DeathCertificateData.css";
import { useNavigate } from "react-router-dom";

function DeathCertificateData() {
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
          const response = await axios.get(
            `http://localhost:5000/api/death/autofill/certificate/${data.name}/${data.deathDate}`
          );
          setAdditionalData(response.data[0]);
          console.log(response.data);
          console.log("Death Data:", additionalData);
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
        ...additionalData, 

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
    <div>
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
            <div>
              <div className="death-Container">
                <div className="death_co_position">
                  <div ref={componentRef}>
                    <div className="death-box">
                      <div className="death-heading">DEATH CERTIFICATE</div>
                      <div className="death-image"></div>
                      <div className="death-sub">
                        This is certiy that the following information has been
                        taken from
                      </div>
                      <div className="death-sub2">
                        The original record of death is register in the Name of
                      </div>
                      <input
                        className="death_input1"
                        type="text"
                        readOnly
                        name="name"
                        value={additionalData?.name}
                        onChange={handleInputChange}
                      />
                      <div className="death-sub3">Baptism Name</div>
                      <input
                        className="death_baptismname"
                        type="text"
                        readOnly
                        name="baptismname"
                        value={additionalData?.baptismname}
                        onChange={handleInputChange}
                      />
                      <div className="death-sub4">House Name</div>
                      <input
                        className="death_housename"
                        type="text"
                        readOnly
                        name="housename"
                        value={additionalData?.housename}
                        onChange={handleInputChange}
                      />

                      <div className="death_sub5">
                        The above certifited Person died on
                      </div>
                      <input
                        className="death_date"
                        type="date"
                        readOnly
                        name="date_of_death"
                        value={formatDate(
                          additionalData?.date_of_death
                            ? new Date(additionalData?.date_of_death)
                                .toISOString()
                                .substring(0, 10)
                            : ""
                        )}
                        onChange={handleInputChange}
                      />
                      <div className="death_sub6">Cause of death</div>
                      <input
                        className="death_reason"
                        type="text"
                        readOnly
                        name="sickness"
                        value={additionalData?.sickness}
                        onChange={handleInputChange}
                      />

                      <div className="death_sub7">The person belongs to</div>
                      <input
                        className="death_church"
                        type="text"
                        readOnly
                        name="Parish_name"
                        value={additionalData?.Parish_name}
                        onChange={handleInputChange}
                      />
                      <div className="death_sub8">And</div>
                      <div className="death_sub9">Burial on</div>
                      <input
                        className="death_burial"
                        type="text"
                        readOnly
                        name="date_of_Burial"
                        value={formatDate(
                          additionalData?.date_of_Burial
                            ? new Date(additionalData?.date_of_Burial)
                                .toISOString()
                                .substring(0, 10)
                            : ""
                        )}
                        onChange={handleInputChange}
                      />
                      <div className="death_seal">Seal</div>
                      <div className="death_sign">Signature</div>
                    </div>

                    {signImage && (
                      <div className="Sign_and_Sealdeath">
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
                <button onClick={handlePrint} className="oooo">
                  {" "}
                  Print{" "}
                </button>
              </div>
              
                <button onClick={handleSave} className="print__button_save">
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

      <div>{/* Additional JSX content goes here */}</div>
    </div>
  );
}
export default DeathCertificateData;
