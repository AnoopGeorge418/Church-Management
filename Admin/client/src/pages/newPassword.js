import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import '../Css/newPassword.css';

function NewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [formError, setFormError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const location = useLocation();
  const values = queryString.parse(location.search);
  const emailorPhoneNumber = values.emailorPhoneNumber;
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (newPassword === '' || confirmPassword === '') {
      setFormError('Please fill in all fields.');
      return;
    }

    if (newPassword === confirmPassword) {
      setPasswordMatch(true);
      setFormError('');

      // Send data to the backend
      fetch('http://localhost:5000/api/admim/passwordreset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailorPhoneNumber, newPassword }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Password reset successful!');
            setShowSuccessMessage(true);
            // Hide the success message after 3 seconds
            setTimeout(() => {
              setShowSuccessMessage(false);
            }, 3000);
          } else {
            console.log('Password reset failed.');
            // Handle error cases
          }
        })
        .catch((error) => {
          console.log('An error occurred while resetting the password.', error);
          // Handle error cases
        });
    } else {
      setPasswordMatch(false);
      setFormError('');
      console.log('Passwords do not match');
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className='newPassword-Container'>
      <div className='newPassword-card'>
        <div>
          <h1 className='newPassword-heading'>Reset Your Password</h1>
        </div>

        <div className='newPassword-txtbox1'>
          <input
            type='password'
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
          <p className='newPassword_input-label1'>Enter New Password</p>
        </div>

        <div className='newPassword-txtbox1'>
          <input
            type='password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <p className='newPassword_input-label2'>Confirm Password</p>
        </div>

        <div className='newPassword_btn_div'>
          <button className='newPassword-btn' onClick={handleSubmit}>
            Proceed
          </button>
        </div>

        {formError && (
          <div className='newPassword_form-error'>
            <p>{formError}</p>
          </div>
        )}

        {passwordMatch !== null && (
          <div className='newPassword_password-match'>
            {passwordMatch ? (
              <p>Passwords match!</p>
            ) : (
              <p>Passwords do not match.</p>
            )}
          </div>
        )}

        {showSuccessMessage && (
          <div className='newPassword_success-popup'>
            <div className='newPassword_success-message'>
              <p>Your password has been successfully changed.</p>
            </div>
          </div>
        )}

        <div className='newPassword_back-to-login'>
          <button className='newPassword_back-to-login-btn' onClick={handleBackToLogin}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
