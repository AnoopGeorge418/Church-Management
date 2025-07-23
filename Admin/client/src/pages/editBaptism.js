import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
import '../Css/editBaptism.css';
function BaptismEdit() {
  const { id } = useParams();
  // let nav = useNavigate()
 
  const [baptism, setBaptism] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    baptismName: '',
    familyName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    dateofbaptism: '',
    birthplace: '',
    palaceofbaptism: '',
    confirmationdate: '',
    godfather: '',
    godmother: '',
    godfatherparish:'',
    godmotherparish:'',
    ministername:'',
    parishminister: '',
    // Include other fields here
  });
  const [message, setMessage] = useState(null);
  const [errorMessage , setErrorMessage]=useState('');

  useEffect(() => {
    const fetchBaptismDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/baptism/${id}`);
        setBaptism(response.data);
        setFormData({
          ...response.data,
          dateofbaptism: formatDate(response.data.dateofbaptism),
          dob: formatDate(response.data.dob) ,
          confirmationdate: formatDate(response.data.confirmationdate)// Format the date here
        });
      } catch (error) {
        console.error('Error fetching baptism details:', error);
        // Handle error
      }
    };
    fetchBaptismDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Regular expression to check if the value contains numbers or symbols
    const containsNumbersOrSymbols = /[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(value);
  
    // If the value contains numbers or symbols, don't update the state
    if (containsNumbersOrSymbols) {
      alert('Text fields should not contain numbers or symbols.');
      return;
    }
  
    // If the value is valid, update the state
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
  };
  const handleInputChangebaptismdate= (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    // Check if there are any validation errors before updating
    if (errorMessage) {
      return;
    }
  
    try {
      await axios.put(`http://localhost:5000/api/baptismUpdate/${id}`, formData);
      alert('Baptism record updated successfully');
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    } catch (error) {
      console.error('Error updating baptism record:', error);
      setMessage('Error updating baptism record');
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    }
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

 
  if (!baptism) {
    return <div>Loading...</div>;
  }
 
  
  // const Click=()=>{
  //   nav('/')
  // }
  return (<>
    <div className="edit_baptism_container">
    <div className='edit_msg'>
  {errorMessage && <div className="message error">{errorMessage}</div>}
</div>
      <form>
      <div className='editheading'>
      <h1 >Edit Baptism Record</h1>
      </div>
        <div className='edit_record'>
          <label className='edit_details'>Name</label>
          <input
          className='edit_data_set'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='edit_record'>
          <label  className='edit_details'>Baptism Name</label>
          <input
             className='edit_data_set'
            type="text"
            name="baptismName"
            value={formData.baptismName}
            onChange={handleInputChange}
          />
        </div>
       

        <div className='edit_record'>
        <label  className='edit_details'>Family Name</label>
          <input
             className='edit_data_set'
            type="text"
            name="familyName"
            value={formData.familyName}
            onChange={handleInputChange}
          />
</div>
<div className='edit_record'>
          <label  className='edit_details'>Father Name</label>
          <input
             className='edit_data_set'
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
          />
</div>
<div className='edit_record'>
          <label  className='edit_details'>Mother Name</label>
          <input
             className='edit_data_set'
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
          />
</div>
<div className='edit_record'>
          <label  className='edit_details'>Date of Birth</label>
          <input
             className='edit_data_set'
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChangebaptismdate}
          />
</div>
<div className='edit_record'>
          <label  className='edit_details'>Date of Baptism</label>
          <input
             className='edit_data_set'
            type="date"
            name="dateofbaptism"
            value={formData.dateofbaptism}
            onChange={handleInputChangebaptismdate}
          />
</div>
<div className='edit_record'>
          <label  className='edit_details'>Place of Birth</label>
          <input
            className='edit_data_set'
            type="text"
            name="birthplace"
            value={formData.birthplace}
            onChange={handleInputChange}
          />
</div>

<div className='edit_record'>
          <label  className='edit_details'>Date of Confirmation</label>
          <input
             className='edit_data_set'
            type="date"
            name="confirmationdate"
            value={formData.confirmationdate}
            onChange={handleInputChangebaptismdate}
          />
</div>
<div className='edit_record'>
          <label  className='edit_details'>Name of GodFather</label>
          <input
             className='edit_data_set'
            type="text"
            name="godfather"
            value={formData.godfather}
            onChange={handleInputChange}
          />
</div>

<div className='edit_record'>
          <label  className='edit_details'>Name of GodMother</label>
          <input
             className='edit_data_set'
            type="text"
            name="godmother"
            value={formData.godmother}
            onChange={handleInputChange}
          />
</div>
<div className='edit_record'>
          <label  className='edit_details'>Parish of GodFather</label>
          <input
             className='edit_data_set'
            type="text"
            name="godfatherparish"
            value={formData.godfatherparish}
            onChange={handleInputChange}
          />
</div>
<div className='edit_record'>
          <label  className='edit_details'>Parish of GodMother</label>
          <input
             className='edit_data_set'
            type="text"
            name="godmotherparish"
            value={formData.godmotherparish}
            onChange={handleInputChange}
          />
</div>
<div className='edit_record'>
          <label  className='edit_details'>Name of Minister</label>
          <input
             className='edit_data_set'
            type="text"
            name="ministername"
            value={formData.ministername}
            onChange={handleInputChange}
          />
</div>
<div className='edit_record'>
          <label  className='edit_details'>Parish of Minister</label>
          <input
             className='edit_data_set'
            type="text"
            name="parishminister"
            value={formData.parishminister}
            onChange={handleInputChange}
          />
</div>
        {/* Include other form fields as needed */}
        <button  className="edit_update" type="button" onClick={handleUpdate}>Update</button>

{/* <button onClick={Click}>next</button> */}

      </form>
    </div>
  
    
    </>
  );
}

export default BaptismEdit;