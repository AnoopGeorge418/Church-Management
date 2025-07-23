import React, { useState } from 'react';
import axios from 'axios';
import '../Css/adminAboutUs.css';

function AdminAboutUs() {
  const [containers, setContainers] = useState([{ image: null, info: '' }]);
  const [viewedContainer, setViewedContainer] = useState([]);

  const handleImageUpload = (event, containerIndex) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageData = e.target.result;
      setContainers((prevContainers) => {
        const updatedContainers = [...prevContainers];
        updatedContainers[containerIndex].image = imageData;
        return updatedContainers;
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddContainer = () => {
    setContainers((prevContainers) => [
      ...prevContainers,
      { image: null, info: '' },
    ]);
  };

  const handleTextAreaChange = (event, containerIndex) => {
    const { value } = event.target;
    setContainers((prevContainers) => {
      const updatedContainers = [...prevContainers];
      updatedContainers[containerIndex].info = value;
      return updatedContainers;
    });
  };

  const handleSave = () => {
    console.log(containers);

    const formData = new FormData();
    containers.forEach((container, index) => {
      formData.append(`containers[${index}][image]`, container.image);
      formData.append(`containers[${index}][info]`, container.info);
    });

    axios
      .post('http://localhost:5000/api/about/save', formData)
      .then((response) => {
        console.log('Save successful:', response.data);
      })
      .catch((error) => {
        console.error('Save failed:', error);
      });
  };
  const handleView = () => {
    axios
      .get('http://localhost:5000/api/about')
      .then((response) => {
              console.log('Container data:', response.data);
        const updatedContainers = response.data.map((container) => {
          const imageData = container.image && container.image.buffer ? container.image.buffer.toString('base64') : null;
          const imageUrl = imageData ? `data:image/jpeg;base64,${imageData}` : null;
          return {
            _id: container._id,
            info: container.info,
            image: imageUrl,
          };
        });
  
        setViewedContainer(updatedContainers);
      })
      .catch((error) => {
        console.error('Failed to fetch container data:', error);
      });
  };

  return (
    <div className="admin-about-us-container">
      {containers.map((container, index) => (
        <div key={index} className="container">
          <div className="image-container">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event, index)}
              className="image-input"
            />
            {container.image && (
              <img src={container.image} alt="Chosen" className="chosen-image" />
            )}
          </div>
          <div className="info-container">
            <textarea
              value={container.info}
              onChange={(event) => handleTextAreaChange(event, index)}
              className="info-textarea"
              placeholder="Enter text..."
            ></textarea>
          </div>
        </div>
      ))}

      <div className="button-container">
        <button onClick={handleAddContainer} className="add-button">
          Add Container
        </button>
        <button onClick={handleSave} className="save-button">
          Save
        </button>
        <button onClick={handleView} className="view-button">
          View
        </button>
      </div>
      {viewedContainer.length > 0 && (
  <div className="viewed-container">
    {viewedContainer.map((container) => (
      <div key={container._id}>
        <h2>{container.info}</h2>
        {container.image && container.image.data ? (
          <img src={`data:image/jpeg;base64,${container.image.data}`} alt="" />

        ) : (
          <p>No image available</p>
        )}
      </div>
    ))}
  </div>
)}

 

    </div>
  );
}

export default AdminAboutUs;
