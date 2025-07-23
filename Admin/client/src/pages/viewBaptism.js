import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Css/viewBpatism.css'
function BaptismDetails() {
  const { id } = useParams();
  const [baptism, setBaptism] = useState(null);

  useEffect(() => {
    const fetchBaptismDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/baptism/${id}`);
        setBaptism(response.data);
      } catch (error) {
        console.error('Error fetching baptism details:', error);
        // Handle error
      }
    };

    fetchBaptismDetails();
  }, [id]);

  if (!baptism) {
    return <div>Loading...</div>;
  }

  return (
    <div className='view_baptism_box'>
      <div  className='view_name_baptism'>
      <h3>{baptism.name}</h3>
      </div>
      <div className='view_all_detalis'>
      <p>  Name    : -  {baptism.baptismName}</p>
      
      <p>Family Name  : -  {baptism.familyName}</p>
      <p>Father Name  : - {baptism.fatherName}</p>
      <p>Mother Name   : -  {baptism.motherName}</p>
      <p>Date-Of-Birth  : -   {baptism.dob}</p>
      <p>Date-Of-Baptism  : -   {baptism.dateofbaptism}</p>
      <p>Birthplace  : -  {baptism.birthplace}</p>
      <p>Palace-of-baptism : -  {baptism.palaceofbaptism}</p>
      <p>Confirmation-date : -  {baptism.confirmationdate}</p>
      <p>GodFather  : - {baptism.godfather}</p>
      <p>GodMother  : - {baptism.godmother}</p>
      <p>Parish of GodFather  : -{baptism.godfatherparish}</p>
      <p>Parish of GodMother  : -{baptism.godmotherparish}</p>
      <p>Parish priest : -{baptism.ministername}</p>
      <p>Parish of priest : -{baptism.parishminister}</p>
      </div>
      {/* Render other */}
    </div>
  );
}

export default BaptismDetails;