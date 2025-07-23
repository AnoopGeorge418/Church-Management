import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Css/viewDeath.css'
function BaptismDetails() {
  const { id } = useParams();
  const [death, setDeath] = useState(null);

  useEffect(() => {
    const fetchDeathDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/death/${id}`);
        setDeath(response.data);
      } catch (error) {
        console.error('Error fetching Death details:', error);
        // Handle error
      }
    };

    fetchDeathDetails();
  }, [id]);

  if (!death) {
    return <div>Loading...</div>;
  }

  return (
    <div className='view_death_box'>
      <div  className='view_name_death'>
      <h3 className='deathpreson_name'>{death.name}</h3>
      </div>
      <div className='view_all_death'>
      <p>Baptism Name   -:---   {death.baptismname}</p>
      <p>Family Name   -:---   {death.housename}</p>
      
      <p>Age   -:---   {death.age}</p>
      <p>Confession  -:---  {death.confession}</p>
      <p>Viaticum  -:---   {death.Viaticum}</p>
      <p>Anointing of sick   -:---  {death.Anointing_of_sick}</p>
      <p>Sickness -:---  {death.sickness}</p>
      <p>Date of Death  -:---  {death.date_of_death}</p>
      <p>Date of Burial  -:---  {death.date_of_Burial}</p>
      <p>Parish priest  -:---  {death.Parish_Priest}</p>
      <p>Parish Name -:--- {death.Parish_name}</p>
    
      </div>
      {/* Render other */}
    </div>
  );
}

export default BaptismDetails;
