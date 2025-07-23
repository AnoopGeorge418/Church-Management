import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Profile.css';
import Cookies from 'js-cookie';
import { Snackbar, Alert, CircularProgress } from '@mui/material';

const Profile = () => {
  const [sign, setSign] = useState(null);
  const [seal, setSeal] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState(null);
 
  const [loading, setLoading] = useState(true);
  const handleSignUpload = (event) => {
    const file = event.target.files[0];
    console.log('Sign file object:', file);
    setSign(file);
  };

  const handleSealUpload = (event) => {
    const file = event.target.files[0];
    console.log('Seal file object:', file);
    setSeal(file);
  };

  const handleSave = () => {
    if (sign && seal) {
      const formData = new FormData();
      formData.append('sign', sign);
      formData.append('seal', seal);

      setUploading(true);

      axios
        .post('http://localhost:5000/api/uploadSignAndSeal', formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get('admin_token')}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            console.log('Upload progress:', progress, '%');
          },
        })
        .then((response) => {
          // Handle success response
          console.log('Images uploaded and saved successfully');
          setOpenSnackbar(true);
          setSnackbarMessage('Images uploaded and saved successfully');
          setSnackbarSeverity('success');
          setUploading(false);
        })
        .catch((error) => {
          // Handle error
          console.error('Error uploading images:', error);
          setOpenSnackbar(true);
          setSnackbarMessage('Error uploading images');
          setSnackbarSeverity('error');
          setUploading(false);
        });
    }
  };

  const getUserData = () => {
    const token = Cookies.get('admin_token');

    if (!token) {
      console.error('No token found');
      return;
    }

    axios
      .get('http://localhost:5000/api/getUserData', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const user = response.data?.user; // Use optional chaining to prevent null errors
        setUserData(user);

        
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const [signImage, setSignImage] = useState(null);
  const [sealImage, setSealImage] = useState(null);

  const getSignAndSealImages = () => {
    const token = Cookies.get('admin_token');

    if (!token) {
      console.error('No token found');
      return;
    }

    axios
      .get('http://localhost:5000/api/getSignAndSealImages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer', // To receive binary data (image) as arraybuffer
      })
      .then((response) => {
        console.log(response.data,766866);
        // Convert the binary data to a Blob
        const imageArrayBuffer = response.data;

        // Create a Blob from the ArrayBuffer
        const imageBlob = new Blob([imageArrayBuffer], { type: 'image/jpeg' });
        
        // Convert the Blob to a data URL
        const imageUrl = URL.createObjectURL(imageBlob);
        setSealImage(imageUrl)

        

        // Update the state with the image URLs
        
      })
      .catch((error) => {
        console.error('Error fetching sign and seal images:', error);
      });
  };

  const getSealImages = () => {
    const token = Cookies.get('admin_token');

    if (!token) {
      console.error('No token found');
      return;
    }

    axios
      .get('http://localhost:5000/api/getSignAndSealImages/seal', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer', // To receive binary data (image) as arraybuffer
      })
      .then((response) => {
        console.log(response.data,766866);
        // Convert the binary data to a Blob
        const imageArrayBuffer = response.data;

        // Create a Blob from the ArrayBuffer
        const imageBlob = new Blob([imageArrayBuffer], { type: 'image/jpeg' });
        
        // Convert the Blob to a data URL
        const imageUrl = URL.createObjectURL(imageBlob);
        setSignImage(imageUrl)

        

        // Update the state with the image URLs
        
      })
      .catch((error) => {
        console.error('Error fetching sign and seal images:', error);
      });
  };


  useEffect(() => {
    getSignAndSealImages();
    getSealImages();
  }, []);
  
  useEffect(() => {
    getUserData();
   
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="PROFILE-container">
      <div className="profile-info">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <label id="name" className="form-control">
            {userData?.name} {/* Use optional chaining to prevent null errors */}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <label type="email" id="email" className="form-control">
            {userData?.email} {/* Use optional chaining to prevent null errors */}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="roll">Role:</label>
          <label type="text" id="roll" className="form-control2">
            {userData?.role} {/* Use optional chaining to prevent null errors */}
          </label>
        </div>
      </div>
      <div className="profile-info">
        <div className="form-group">
          <label htmlFor="sign">Sign uploader:</label>
          <input type="file" id="sign" className="Sign_uploader" onChange={handleSignUpload} />
        </div>
        <div className="form-group">
          <label htmlFor="seal">Seal uploader:</label>
          <input type="file" id="seal" className="Seal_uploader" onChange={handleSealUpload} />
        </div>
      </div>
      <div className="profile-info">
    
          {signImage && (
            <div className="photo-item">
              <img className="photo-item" src={signImage} alt="Sign" />
            </div>
          )}
          {sealImage && (
            <div className="photo-item">
              <img className="photo-item1" src={sealImage} alt="Seal" />
            </div>
          )}
        {uploading ? (
          <div className="progress-indicator">
            <CircularProgress size={24} />
            <span>Uploading...</span>
          </div>
        ) : (
          <button className="prof-save-btn" onClick={handleSave}>
            Save
          </button>
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    
    </div>
  );
};

export default Profile;
