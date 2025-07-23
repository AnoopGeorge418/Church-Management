import React, { useState, useEffect, useRef } from 'react';
import '../Css/Gallery.css';

const Gallery = () => {
  // State variables
  const [activeTab, setActiveTab] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');
  const [uploadMsg, setUploadMsg] = useState('');
  const [isSaved, setIsSaved] = useState(false); // Track the save status
  const [isEditing, setIsEditing] = useState(false); // Track the editing state

  // Refs for file input and file name display
  const fileInputRef = useRef(null);
  const fileNameElementRef = useRef(null);

  useEffect(() => {
    // Handle file upload and update file name display
    const fileInput = fileInputRef.current;
    const fileNameElement = fileNameElementRef.current;

    const handleFileUpload = (event) => {
      const file = event.target.files[0];

      // Update the file name element with the uploaded file name
      fileNameElement.textContent = file.name;
    };

    if (fileInput) {
      fileInput.addEventListener('change', handleFileUpload);
    }

    return () => {
      if (fileInput) {
        fileInput.removeEventListener('change', handleFileUpload);
      }
    };
  }, []);

  const handleTabClick = (tab) => {
    // Set the active tab when clicked
    setActiveTab(tab);
  };

  const handleUpload = (event) => {
    // Handle image upload
    const files = event.target.files;
    const imagesArray = Array.from(files);

    // Loop through each file and handle the upload
    imagesArray.forEach((file) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImage = {
            src: reader.result,
            label: 'New Image',
          };
          // Add the new image to the beginning of the images array
          setImages((prevImages) => [newImage, ...prevImages]);
        };
        reader.readAsDataURL(file);
      }
    });

    setUploading(true);
    setUploadMsg('Images uploaded successfully');
    setTimeout(() => {
      setUploading(false);
      setUploadMsg('');
    }, 5000);
  };

  const handleDelete = (index) => {
    // Handle image deletion
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setDeleteMsg('Image deleted successfully');
    setTimeout(() => {
      setDeleteMsg('');
    }, 5000);
  };

  const [images, setImages] = useState(() => {
    // Load images from localStorage or use initial images
    const savedImages = localStorage.getItem('galleryImages');
    return savedImages ? JSON.parse(savedImages) : [];
  });

  useEffect(() => {
    // Save images to localStorage whenever it changes
    localStorage.setItem('galleryImages', JSON.stringify(images));
  }, [images]);

  const handleLabelChange = (event, index) => {
    // Handle label change for an image
    const { value } = event.target;
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].label = value;
      return updatedImages;
    });
  };
 

  const handleSave = () => {
    // Save the labels to localStorage
    localStorage.setItem('galleryImages', JSON.stringify(images));
    setIsSaved(true); // Set the save status to true
  };

  const handleToggleEdit = () => {
    setIsEditing((prevState) => !prevState); // Toggle the editing state
  };

  const filterImages = (name) => {
    // Filter images based on the given name
    const filteredImages = images.filter((image) =>
      image.label.toLowerCase().includes(name.toLowerCase())
    );
    return filteredImages;
  };

  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

  const filteredImages = filterImages(filter);

  return (
    <div className="Gallery-container">
      <div className="Gallery-background"></div>
      <div className="Gallery-Content">
        {/* Gallery heading */}
        <h1 className="Gallery-Heading">Church Gallery</h1>
        {/* Navigation tabs */}
        <nav className="Gallery-navbar">
          <button
            className={`Gallery-button-link ${
              activeTab === 'photos' ? 'active' : ''
            }`}
            onClick={() => handleTabClick('photos')}
          >
            Photos And Videos
          </button>
        </nav>
        <hr className="gall-line"></hr>
        {activeTab === 'photos' && (
          <div className="Gallery-photos-content">
            {/* Filter section */}
            <div className="filter-section">
              <h3>Filter By Names</h3>
              <div className="filter-input">
                <label htmlFor="filter-name">Name:</label>
                <input
                  id="filter-name"
                  type="text"
                  name="name"
                  value={filter}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            {/* Photos Content */}
            <div className="gallery">
              {/* Display filtered images */}
              {filteredImages.map((image, index) => (
                <div key={index} className="gallery-image-container">
                  <div className="gallery-image-wrapper">
                    <img
                      src={image.src}
                      alt={image.label}
                      className="gallery-image"
                    />
                  </div>
                  <div className="gallery-image-label">
                    {isSaved && !isEditing ? (
                      image.label // Display label as text when saved and not editing
                    ) : (
                      <input
                        type="text"
                        id={`label-input-${index}`}
                        value={image.label}
                        onChange={(e) => handleLabelChange(e, index)}
                        className="label-input"
                        disabled={!isEditing}
                      />
                    )}
                  </div>
                  {/* Delete image button */}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {uploading && (
                <div className="gallery-image-container">
                  <div className="uploading-text">Uploading...</div>
                </div>
              )}
            </div>
            {/* Image upload section */}
            <div className="upload-section">
              <label htmlFor="upload-input" className="upload-label">
                Upload Image
              </label>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="upload-input"
                ref={fileInputRef}
                multiple
              />
              {/* Save and Edit buttons */}
              <div className="button-container">
                {!isSaved && (
                  <button className="save-button" onClick={handleSave}>
                    Save
                  </button>
                )}
                <button className="edit-button" onClick={handleToggleEdit}>
                  {isEditing ? 'Finish Editing' : 'Edit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Delete and upload messages */}
      {(deleteMsg || uploadMsg) && (
        <div className="message-container">
          {deleteMsg && <div className="delete-message">{deleteMsg}</div>}
          {uploadMsg && <div className="upload-message">{uploadMsg}</div>}
        </div>
      )}
    </div>
  );
};

export default Gallery;