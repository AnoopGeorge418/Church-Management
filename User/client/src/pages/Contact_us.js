import React from 'react';
import '../Css/Contact_us.css';

function Contact() {
  const handleCallClick = () => {
    window.location.href = 'tel:your-phone-number'; // Replace 'your-phone-number' with the actual phone number
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:your-email@example.com'; // Replace 'your-email@example.com' with the actual email address
  };

  return (
    <div className='Contact_Us-Container'>
      <div className='Contact_Us_Image'></div>
      <div className='Contact_Us-Heading'>Contact Us</div>
      <div className='Contact-intro'>
        Our contact us page serves as a direct line of communication between
        <br />
        the church and its members. Feel free to reach out to us for any
        <br />
        inquiries, prayer requests, or assistance you may need. <br />
        We are here to support you on your spiritual journey <br />
        and provide guidance in accordance with our church's values.
      </div>
      <div className='Contact-Follow'>
        Follow us on
        <a href='https://www.facebook.com/p/StAntonys-Forane-Church-Thotathady-100080464489370/' >
          <div className='Contact-FB'></div>
        </a>
        <a href='https://youtube.com/@stantonysforanechurchthota4004' >
          <div className='Contact-YT'></div>
        </a>
      </div>
      <div className='Conatct-images'>
        <a href='tel:9481842740' >
        <div className='Contact-Call' onClick={handleCallClick}></div>
      </a>
      <a href='mailto:thotathadyChurchforena@gmail.com' >
        <div className='Contact-Email' onClick={handleEmailClick}></div>
      </a>
        <a href='https://www.google.com/maps/place/St.+Antonys+Syro+Malabar+Forane+Church+Thotathady/@13.0247059,75.4114122,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba4c95dacf895f5:0x14e069e2f0528e7f!8m2!3d13.0247059!4d75.4139871!16s%2Fg%2F1pwfd7k70?entry=ttu' >
        <div className='Contact-Map'></div>
        </a>
      </div>
    </div>
  );
}

export default Contact;
