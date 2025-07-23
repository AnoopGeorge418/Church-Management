import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./verifycertificate.css";
import verification_img from "../Img/verification_img.png";
import { useNavigate} from 'react-router-dom'
function VerifyCertificate() {
  const [issuedTo, setIssuedTo] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [otp, setOtp] = useState("");
const history=useNavigate()
  const handleInputChange = (event, field) => {
    const value = event.target.value;
    if (field === "issuedTo") {
      setIssuedTo(value);
    } else if (field === "issuedBy") {
      setIssuedBy(value);
    } else if (field === "otp") {
      setOtp(value);
    }
  };

  const handleSubmit = async () => {
    const alphanumericRegex =  /[^A-Za-z\s]/;
    const numericRegex = /^[0-9]*$/;

    try {
      if (issuedTo === "") {
        toast.error('Please enter "issued to" information.');
        return;
      } else if (alphanumericRegex.test(issuedTo)) {
        toast.error('"Issued to" field cannot contain special characters.');
        return;
      } else if (issuedBy === "") {
        toast.error('Please enter "issued by" information.');
        return;
      } else if (alphanumericRegex.test(issuedBy)) {
        toast.error('"Issued by" field cannot contain special characters.');
        return;
      } else if (otp === "") {
        toast.error("Please enter the OTP.");
        return;
      } else if (!numericRegex.test(otp)) {
        toast.error("OTP must contain only numbers.");
        return;
      } else if (otp.length !== 6) {
        toast.error('OTP must be exactly 6 digits.');
        return;
      }

      // Make your Axios request here (if needed)
      // Example:
      const response = await axios.post('http://localhost:5000/api/certificateBaptism/to/user/verification', { issuedTo, issuedBy, otp });
      // history(`/CertificateDownlode?otp=${otp}&issuedBy=${issuedBy}&issuedTo=${issuedTo}`);
      if (response.status === 200) {
        // Verification successful
        history(`/CertificateDownlode?otp=${otp}&issuedBy=${issuedBy}&issuedTo=${issuedTo}`);
        toast.success("Verification successful!");
      } else if (response.status === 400) {
        // Handle bad request (status code 400) - display an error message to the user
        toast.error("Bad Request. Please check the data and try again.");
      } else {
        // Handle other status codes if needed
        toast.error("An error occurred. Please try again later.");
      }// Show success toast notification
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while verifying the certificate."); // Show error toast notification
    }
  };

  return (
    <div className="verify_certificate">
      <div className="verify_head">
      <div className="verifyBox">
        <input
          type="text"
          required="required"
          value={issuedTo}
          onChange={(e) => handleInputChange(e, "issuedTo")}
        />
        <span>issued to</span>
      </div>

      <div className="verifyBox">
        <input
          type="text"
          required="required"
          value={issuedBy}
          onChange={(e) => handleInputChange(e, "issuedBy")}
        />
        <span>issued by</span>
      </div>

      <div className="verifyBox">
        <input
          type="text"
          required="required"
          value={otp}
          onChange={(e) => handleInputChange(e, "otp")}
        />
        <span>verify otp</span>
      </div>

      <div className="verify_btn_div">
        <button className="verify_btn" onClick={handleSubmit}>
          Proceed
        </button>
      </div>

      <div className="verification_img">
        <img
          src={verification_img}
          className="image"
          alt="verification_img"
          height={620}
          width={380}
        />
      </div>

      {/* Toast container to display the notifications */}
      <ToastContainer />
      </div>
    </div>
  );
}

export default VerifyCertificate;
