import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/PrayerRequestList.css';

function PrayerRequestList() {
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchPrayerRequests();
  }, []);

  const fetchPrayerRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/prayer-requests/all`);
      setPrayerRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/prayer-requests/delete/${deleteId}`);
      setShowDeletedMessage(true);
      fetchPrayerRequests();

      setTimeout(() => {
        setShowDeletedMessage(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="prayer-request-list-container">
      <h1 className="prayer-request-list-heading">Prayer Requests</h1>
      {showDeletedMessage && (
        <div className="deleted-message">
          <p>Prayer request deleted successfully!</p>
        </div>
      )}
      <ul className="prayer-request-list">
        {prayerRequests.map((request) => (
          <li key={request._id} className="prayer-request-item">
            <div className="prayer-request-item-header">
              <h2 className="prayer-request-item-name">Name: {request.name}</h2>
              <p className="prayer-request-item-for">Prayer For: {request.prayerFor}</p>
            </div>
            <div className="prayer-request-item-body">
              <p className="prayer-request-item-email">Email: {request.email}</p>
              <p className="prayer-request-item-phone">Phone Number: {request.phoneNumber}</p>
              <p className="prayer-request-item-prayer">Prayer: {request.prayer}</p>
            </div>
            <button
              className="prayer-request-item-delete-button"
              onClick={() => handleDelete(request._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {showConfirmation && (
        <div className="prayer-request-confirmation-popup">
          <p>Are you sure you want to delete this prayer request?</p>
          <div className="prayer-request-confirmation-buttons">
            <button className="prayer-request-confirm-button" onClick={confirmDelete}>
              Yes
            </button>
            <button className="prayer-request-cancel-button" onClick={cancelDelete}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrayerRequestList;
