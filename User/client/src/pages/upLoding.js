import { useState } from 'react';
import Cookies from 'js-cookie';
import profil from "../Img/user_Img.png";
function UploadImage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('profilePicture', image);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload-image`, {
        method: 'POST',
        headers: {  Authorization: `Bearer ${Cookies.get('token')}`,
        
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setError('Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <h2>Upload Image</h2>
    <div style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '50%' }}>
   <img src={image ? URL.createObjectURL(image) : null} alt="ProfilePicture" style={{ width: '100%', height: 'auto' }} />
    </div>
    <input type="file" accept="image/*" onChange={handleFileChange} alt="Profile picture" />
    {error && <div style={{ color: 'red' }}>{error}</div>}
    {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    <button onClick={handleUpload} disabled={!image || loading}>
      {loading ? 'Uploading...' : 'Upload'}
    </button>
  </div>
  
  );
}

export default UploadImage;
