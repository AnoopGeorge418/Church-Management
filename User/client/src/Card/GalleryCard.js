import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Card/GalleryCard.css';

function GalleryCard ()  {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Gallery');
  };
  
  return (
    <div className="Gallery-card" onClick={handleClick}>
      <h3 className='Gallery-card_h3'>Gallery</h3>
      <div className='Gallery-Background_Image '></div>
    </div>
  );
};

export default GalleryCard;