import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
import '../Css/editDeath.css';
function DeathEdit() {
  const { id } = useParams();
  // let navigate = useNavigate()
 
  const [death, setDeath] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    housename: '',
    baptismname: '',
    age: '',
    confession: '',
    Viaticum:'',
    Anointing_of_sick:'',
    sickness:'',
    date_of_death:'',
    date_of_Burial:'',
    Parish_Priest:'',
    Parish_name:'',
  });
  const [message, setMessage] = useState(null);
  const [errorMessage , setErrorMessage]=useState('');
  useEffect(() => {
    const fetchDeathDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/death/${id}`);
        setDeath(response.data);
        setFormData({
          ...response.data,
          date_of_death: formatDate(response.data.date_of_death),
          date_of_Burial: formatDate(response.data.date_of_Burial) ,
        //   confirmationdate: formatDate(response.data.confirmationdate)// Format the date here
        });
      } catch (error) {
        console.error('Error fetching death details:', error);
        // Handle error
      }
    };
    fetchDeathDetails();
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
  const handleInputChangedeathdate= (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleUpdate = async () => {
     // Check if there are any validation errors before updating
    if (errorMessage) {
      return;
    }
    try {
    
      await axios.put(`http://localhost:5000/api/deathUpdate/${id}`, formData);
 
      alert('Death record updated successfully');
  //  navigate('/')
      // navigate('/death/64a2f1eaa61ebd03e3badaf3')
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    } catch (error) {
      console.error('Error updating death record:', error);
      setMessage('Error updating death record');
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

  if (!death) {
    return <div>Loading...</div>;
  }

  // const Click=()=>{
  //   nav('/')
  // }
  return (<>
    <div className="edit_death_container">
    <div className='edit_death_msg'>
      {message && <div className={message.includes('successfully') ? 'message success' : 'message error'}>{message}</div>}
      </div>
      <form>
      <div className='editdeathheading'>
      <h1 >Edit Death Record</h1>
      </div>
        <div className='edit_death_record'>
          <label className='edit_death_details'>Name</label>
          <input
          className='edit_death_set'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='edit_death_record'>
          <label  className='edit_death_details'>Baptism Name</label>
          <input
             className='edit_death_set'
            type="text"
            name="baptismname"
            value={formData.baptismname}
            onChange={handleInputChange}
          />
        </div>
       

        <div className='edit_death_record'>
        <label  className='edit_death_details'>Family Name</label>
          <input
             className='edit_death_set'
            type="text"
            name="housename"
            value={formData.housename}
            onChange={handleInputChange}
          />
</div>
<div className='edit_death_record'>
        <label  className='edit_death_details'>age</label>
          <input
             className='edit_death_set'
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChangedeathdate}
          />
</div>

<div className='edit_death_record'>
        <label  className='edit_death_details'>Confession</label>
        <select
 
 className='edit_death_set'
  name='confession'
  value={formData.confession}
  onChange={handleInputChange}
>
  <option value=''>Select</option>
  <option value='Recieved'>Recieved</option>
  <option value='Not Recieved'>Not Recieved</option>
</select>
</div>

<div className='edit_death_record'>
        <label  className='edit_death_details'>Viaticum</label>
        <select
 
 className='edit_death_set'
  name='Viaticum'
  value={formData.Viaticum}
  onChange={handleInputChange}
>
  <option value=''>Select</option>
  <option value='Recieved'>Recieved</option>
  <option value='Not Recieved'>Not Recieved</option>
</select>
</div>

<div className='edit_death_record'>
        <label  className='edit_death_details'>Anointing of sick</label>
        <select
 
 className='edit_death_set'
  name='Anointing_of_sick'
  value={formData.Anointing_of_sick}
  onChange={handleInputChange}
>
  <option value=''>Select</option>
  <option value='Recieved'>Recieved</option>
  <option value='Not Recieved'>Not Recieved</option>
</select>
</div>

<div className='edit_death_record'>
        <label  className='edit_death_details'>Sickness</label>
          <input
             className='edit_death_set'
            type="text"
            name="sickness"
            value={formData.sickness}
            onChange={handleInputChange}
          />
</div>
<div className='edit_death_record'>
        <label  className='edit_death_details'>Date of death</label>
          <input
             className='edit_death_set'
            type="date"
            name="date_of_death"
            value={formData.date_of_death}
            onChange={handleInputChangedeathdate}
          />
</div>
<div className='edit_death_record'>
        <label  className='edit_death_details'>Date of burial</label>
          <input
             className='edit_death_set'
            type="date"
            name="date_of_Burial"
            value={formData.date_of_Burial}
            onChange={handleInputChangedeathdate}
          />
</div>
<div className='edit_death_record'>
        <label  className='edit_death_details'>parish priest</label>
          <input
             className='edit_death_set'
            type="text"
            name="Parish_Priest"
            value={formData.Parish_Priest}
            onChange={handleInputChange}
          />
</div>
<div className='edit_death_record'>
        <label  className='edit_death_details'>parish Name</label>
          <input
             className='edit_death_set'
            type="text"
            name="Parish_name"
            value={formData.Parish_name}
            onChange={handleInputChange}
          />
</div>

        {/* Include other form fields as needed */}
        <button  className="edit_death_update" type="button" onClick={handleUpdate}>Update</button>

{/* <button onClick={Click}>next</button> */}

      </form>
    </div>
  
    
    </>
  );
}

export default DeathEdit;