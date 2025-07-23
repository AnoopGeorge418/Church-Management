import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/announcementList.css';

const AnnouncementListPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch all announcements from the API
    fetch('http://localhost:5000/api/announcementList')
      .then((response) => response.json())
      .then((data) => setAnnouncements(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteAnnouncement = (id) => {
    // Send a delete request to the API
    fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted announcement from the state
          setAnnouncements((prevAnnouncements) =>
            prevAnnouncements.filter((announcement) => announcement._id !== id)
          );
        } else {
          throw new Error('Failed to delete announcement');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="announcement-list-container">
      <h1>All Announcements</h1>
      <div className="announcement-list">
        {/* Render each announcement */}
        {announcements.map((announcement) => (
          <div key={announcement._id} className="announcement-item">
            <p>{announcement.text}</p>
            <div className="announcement-buttons">
              <Link to={`/Annoncement/edit/${announcement._id}`} className="Annoncement_edit-button">
                Edit
              </Link>
              <button
                onClick={() => handleDeleteAnnouncement(announcement._id)}
                className="announceme_delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementListPage;
