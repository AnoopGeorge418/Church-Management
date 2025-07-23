import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Card/MinistryCard.css';

function MinistryCard ()  {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Ministry');
  };
  
  return (
    <div className="Ministry-card" onClick={handleClick}>
      <h3 className='Ministry-card_h3'>Ministry</h3>
      <div className='Ministry-Background_Image '></div>
    </div>
  );
};

export default MinistryCard;