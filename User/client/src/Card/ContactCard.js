import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Card/ContactCard.css';

function ContactCard ()  {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contact');
  };
  
  return (
    <div className="contact-card" onClick={handleClick}>
      <h3 className='Contact-card_h3'>Contact Us</h3>
      <div className='contact-Background_Image '></div>
    </div>
  );
};

export default ContactCard;
