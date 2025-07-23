import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Css/editAnnouncement.css';

const EditAnnouncementPage = () => {
  const { id } = useParams(); // Get the announcement ID from the URL parameter

  const [announcement, setAnnouncement] = useState(null);
  const [announcementText, setAnnouncementText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch the specific announcement based on the ID
    fetch(`http://localhost:5000/api/announcements/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAnnouncement(data);
        setAnnouncementText(data.text);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleAnnouncementTextChange = (event) => {
    setAnnouncementText(event.target.value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleUpdateAnnouncement = (event) => {
    event.preventDefault();

    if (!announcementText.trim()) {
      setErrorMessage('Announcement text cannot be empty');
      return;
    }

   
    const updatedAnnouncement = {
      text: announcementText,
    };

    // updated data to the API using fetch
    fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAnnouncement),
    })
      .then((response) => {
        if (response.ok) {
        
          setSuccessMessage('Announcement updated successfully');
          setErrorMessage('');
          
        } else {
          throw new Error('Failed to update announcement');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Failed to update announcement');
        setSuccessMessage('');
      });
  };

  return (
    <div className="edit-announcement-container">
      <h1>Edit Announcement</h1>
      {announcement ? (
        <form onSubmit={handleUpdateAnnouncement}>
          <div className="form-group">
            <label className='Annoncment_Edit_Label' htmlFor="announcementText">Announcement Text:</label>
            <textarea
              id="announcementText"
              className='Annoncment_Edit_textarea'
              value={announcementText}
              onChange={handleAnnouncementTextChange}
              required
            />
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <button className='Annoncement_Edit_submit' type="submit">Update Announcement</button>
        </form>
      ) : (
        <p>Loading announcement........</p>
      )}
    </div>
  );
};

export default EditAnnouncementPage;
