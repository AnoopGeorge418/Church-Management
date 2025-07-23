import React from 'react';
import '../Css/About_us.css'
// import SmoothScroll from 'smooth-scroll';
import  { useEffect } from 'react';

function AboutUs ()  {

  return (
    <div className='About_Us-Container'>
      <div className='AboutUsContent'>
        <div className='About_Us-Image'></div>
        <div className='About_Us-Heading'>
          About Us
        </div>
        <div className='About_Us-info'>
          St. Antony's church was established in 1905  in Dakshina Kannada <br/> 
          district of Karnataka. This is one the popular names on the list<br/>  
          of churches in Mangalore. Processing devine Gridle of Mother Mary <br/>  
          and sacred remnants. This church attracts admires and devotes from all over India <br/>       
          St Antony’s Forane Church, Thotathady is a Catholic Church located in<br/>  
          Karnataka, India.It is one of the many churches in the region that<br/>  
          are dedicated to St Antony, the patron saint of lost things and miracles.<br/> 
        </div>
        <div className='About-image'>
        <div className='About_Us-Church_Image' loading='lazy'></div>
        </div>
        <div className='About_Us-Head-priest_info'>
            The head priest of the church holds a significant role in overseeing and guiding the <br/>
            religious affairs of the parish. As a spiritual leader, they provide guidance,<br/>
            perform sacred rituals, and deliver sermons to inspire and uplift the congregation.<br/>
            With their deep understanding of religious doctrine and a compassionate approach, <br/>
            the head priest fosters a sense of community, encourages spiritual growth, and promotes <br/>
            the values of love, faith, and service among parishioners.<br/>
            Through their leadership, the head priest plays a vital role in nurturing<br/>
            the spiritual well-being of the church and its members.<br/>
        </div>
        <div className='About-image'>
        <div className='About_Us-Head-priest_image' loading='lazy'></div>
        </div>
        <div className='Head-priest-basic_info'>
            <label>Name:</label>
             <p className='role-priest'>Role:</p>
             <p className='Edu-priest'>Education:</p>
        </div>
        <div className='Head-priest-name_label'>
            <label className='Head-label'>Name of Head Priest</label>
            <p className='role-name_priest'>Head priest</p>
            <label className='Edu-name_priest'>MD</label> 
        </div>
        <div className='About_Us-Assist-priest_info'>
            The assistant priest of the church serves as a valuable support to the head priest <br/>
            in fulfilling the spiritual needs of the parish. With dedication and devotion, <br/>
            they assist in performing religious ceremonies, providing pastoral care,<br/>
            and offering guidance to parishioners.Alongside the head priest, <br/>
            the assistant priest plays a vital role in fostering a strong sense of community, <br/>
            promoting spiritual growth, and upholding the values of the church.<br/> 
            Through their commitment to service and their compassionate nature,<br/> 
            the assistant priest contributes to the overall spiritual well-being of<br/>
            the church and helps create a nurturing environment for its members.<br/>
        </div>
        <div className='About-image'>
        <div className='About_Us-Assist-priest_image' loading='lazy'></div>
        </div>
        <div className='Assist-priest-basic_info'>
            <label>Name:</label>
             <p className='role-assist'>Role:</p>
             <p className='Edu-assist'>Education:</p>
        </div>
        <div className='Assist-priest-name_label'>
            <label className='Assit-label'>Name of Assist Priest</label>
            <p className='role-name_assist'>Assist priest</p>
            <label className='Edu-name_assist'>MD</label>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;