import React, { useState } from 'react';
import '../Css/announcement.css';
import Announcement from '../Images/Annoncement.jpg';

const AnnouncementEntryPage = () => {
  const [publishDate, setPublishDate] = useState('');
  const [publishTime, setPublishTime] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [expireTime, setExpireTime] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handlePublishDateChange = (event) => {
    setPublishDate(event.target.value);
    setErrorMessage('');
  };

  const handlePublishTimeChange = (event) => {
    setPublishTime(event.target.value);
    setErrorMessage('');
  };

  const handleExpireDateChange = (event) => {
    setExpireDate(event.target.value);
    setErrorMessage('');
  };

  const handleExpireTimeChange = (event) => {
    setExpireTime(event.target.value);
    setErrorMessage('');
  };

  const handleAnnouncementTextChange = (event) => {
    setAnnouncementText(event.target.value);
    setErrorMessage('');
  };

  const handleConfirmation = (event) => {
    event.preventDefault();

    const today = new Date();
    const selectedPublishDate = new Date(publishDate);

    if (selectedPublishDate >= today || selectedPublishDate.toDateString() === today.toDateString()) {
      setShowConfirmationModal(true);
    } else {
      setErrorMessage('Publish Date must be today or a future date');
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmPublish = () => {
    setShowConfirmationModal(false);
  
    // Perform validation
    if (
      !publishDate.trim() ||
      !publishTime.trim() ||
      !expireDate.trim() ||
      !expireTime.trim() ||
      !announcementText.trim()
    ) {
      setErrorMessage('All fields are required');
      return;
    }
  
    const publishDateTime = new Date(`${publishDate} ${publishTime}`);
    const expireDateTime = new Date(`${expireDate} ${expireTime}`);
  
    if (publishDateTime >= expireDateTime) {
      setErrorMessage('Expiry Date must be greater than Publish Date');
      return;
    }
  
    if (publishTime === expireTime && publishDate === expireDate) {
      setErrorMessage('Expiry Time must be different from Publish Time');
      return;
    }
  
    // Prepare the announcement data
    const announcementData = {
      publishDateTime: publishDateTime.toISOString(),
      expireDateTime: expireDateTime.toISOString(),
      text: announcementText,
    };
  
    // Send the data to the API using fetch
    fetch('http://localhost:5000/api/announcement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcementData),
    })
      .then((response) => {
        if (response.ok) {
          // Clear form inputs
          setPublishDate('');
          setPublishTime('');
          setExpireDate('');
          setExpireTime('');
          setAnnouncementText('');
          setErrorMessage('');
          setSuccessMessage('Announcement published successfully');
  
          setTimeout(() => {
            setSuccessMessage('');
          }, 2000);
        } else {
          throw new Error('Failed to publish announcement');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Failed to publish announcement');
      });
  };

  const convertTo12HourFormat = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    let period = 'AM';
    let hour = parseInt(hours, 10);

    if (hour === 0) {
      hour = 12;
    } else if (hour === 12) {
      period = 'PM';
    } else if (hour > 12) {
      hour -= 12;
      period = 'PM';
    }

    return `${hour}:${minutes} ${period}`;
  };
  
  return (
    <div className="announcement-entry-container">
      <h1 className='Annoncement_Entry'>Announcement Entry</h1>
      <img src={Announcement} alt="Announcement" className="announcement-image" />
      <form onSubmit={handleConfirmation}>
        <div className="form-group">
          <label  className='Annoncement-label'  htmlFor="publishDate">Publish Date:</label>
          <input
            type="date"
            id="publishDate"
            value={publishDate}
            className='Annoncement-date'
            onChange={handlePublishDateChange}
            required
          />
        </div>

        <div className="form-group">
          <label  className='Annoncement-label' htmlFor="publishTime">Publish Time:</label>
          <input
            type="time"
            className='Annoncement-time'
            id="publishTime"
            value={publishTime}
            onChange={handlePublishTimeChange}
            required
          />
        </div>

        <div className="form-group">
          <label  className='Annoncement-label' htmlFor="expireDate">Expiry Date:</label>
          <input
            type="date"
            className='Annoncement-date'
            id="expireDate"
            value={expireDate}
            onChange={handleExpireDateChange}
            required
          />
        </div>

        <div className="form-group">
          <label  className='Annoncement-label' htmlFor="expireTime">Expiry Time:</label>
          <input
            type="time"
            className='Annoncement-time'
            id="expireTime"
            value={expireTime}
            onChange={handleExpireTimeChange}
            required
          />
        </div>

        <div className="form-group">
          <label  className='Annoncement-label' htmlFor="announcementText">Announcement Text:</label>
          <textarea
            id="announcementText"
            className='Annoncement-announcementText'
            value={announcementText}
            onChange={handleAnnouncementTextChange}
            required
          />
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button className='Annoncement-button' type="submit">Publish Announcement</button>
      </form>

      {showConfirmationModal && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h2>Confirm Publishing</h2>
            <p>Are you sure you want to publish the announcement?</p>
            <div className="confirmation-buttons">
              <button onClick={handleConfirmPublish}>Yes</button>
              <button onClick={handleCancelConfirmation}>No</button>
            </div>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="success-popup">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementEntryPage;
