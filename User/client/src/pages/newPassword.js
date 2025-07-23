import React, { useState } from 'react';
import '../Css/newPassword.css';
import Resetpasswordimage from '../Img/Reset_password.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

function NewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const values = queryString.parse(location.search);
  const emailorPhoneNumber = values.emailorPhoneNumber;

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      const data = {
        newPassword,
        emailorPhoneNumber,
      };

      // Make the POST request to reset the password
      axios.post('http://localhost:8000/api/resetpassword', data)
        .then(response => {
          // Handle the response data here
          console.log(response.data);

          // Show success toast notification
          toast.success('Password reset successful!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Navigate to the homepage after successful password reset
          navigate('/');
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });
    } else {
      // Passwords don't match, show an error message
      setPasswordMatchError(true);
    }
  };

  return (
    <div className='newPassword-Container'>
      <div>
        <h1 className='newPassword-heading'>Reset Your Password</h1>
      </div>

      <div className='newPassword-txtbox1'>
        <input
          type={showPassword ? 'text' : 'password'}
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <span>Enter New Password</span>
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="eye-ico"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      <div className='newPassword-txtbox1'>
        <input
          type={showPassword ? 'text' : 'password'}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span>Confirm Password</span>
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      {passwordMatchError && (
        <div className='newPassword-error-msg'>
          Passwords do not match. Please try again.
        </div>
      )}

      <div className='newPassword_btn_div'>
        <button className="newPassword-btn" onClick={handleSubmit}>
          Proceed
        </button>
      </div>

      <div className='newpass-resetimage'>
        <img src={Resetpasswordimage} className="image" alt="" />
      </div>

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
}

export default NewPassword;
