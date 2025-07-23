import React, { useState, useEffect } from 'react';
import '../Css/AnnouncementListPage.css';

const AnnouncementListPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_ADMIN_API_URL}/api/announcementList`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        return response.json();
      })
      .then(data => {
        setAnnouncements(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  

  return (
    <div className="announcement-list-container">
      <h1>All Announcements</h1>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="announcement-list animate-fade-in-up">
          {Array.isArray(announcements) && announcements.length > 0 ? (
            announcements.map(announcement => (
              <div key={announcement._id} className="announcement-item animate-fade-in">
                <p className='annoncementText'>{announcement.text}</p>
              </div>
            ))
          ) : (
            <p className="no-announcements">No announcements found.</p>
          )}
        </div>
      )}
    </div>
  );
          }  
export default AnnouncementListPage;
