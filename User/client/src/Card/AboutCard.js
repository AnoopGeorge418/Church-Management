import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Card/AboutCard.css';

function AboutCard ()  {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Aboutus');
  };
  
  return (
    <div className="About-card" onClick={handleClick}>
      <h3 className='About-card_h3'>About Us</h3>
      <div className='About-Background_Image '></div>
    </div>
  );
};

export default AboutCard;