import React, {useInsertionEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Css/addBaptism.css';
import baptismImage from '../Images/baptism.png';

function AddBaptism() {
  const [baptismData, setBaptismData] = useState({
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
  });

 
  const [message, setMessage] = useState('');
  const [errorMessage , setErrorMessage]=useState('');
  const regex = /^[a-zA-Z\s]*$/;
  // let navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBaptismData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
  
if(baptismData.name === ''){
  alert("please Enter a Name")
  setMessage('');
}

 else if(!regex.test(baptismData.name)){
  alert("The Name input contains numbers or special characters")
 
}
else if(baptismData.baptismName === ''){
  alert("please Enter a Baptism Name ")
  setMessage('');
  
}
else if(!regex.test(baptismData.baptismName)){
  alert("The Baptism name input contains numbers or special characters")
 
}
else if(baptismData.familyName=== ''){
  alert("please Enter a Family Name ")
  setMessage('');
  
}
else if(!regex.test(baptismData.familyName)){
  alert("The Family Name input contains numbers or special characters")
 
}
else if(baptismData.fatherName=== ''){
  alert("please Enter a Father Name ")
  setMessage('');
 
}
else if(!regex.test(baptismData.fatherName)){
  alert("The Father Name input contains numbers or special characters")
 
}
else if(baptismData.motherName=== ''){
  alert("please Enter a Mother Name ")
  setMessage('');
 
}
else if(!regex.test(baptismData.motherName)){
  alert("The Mother Name input contains numbers or special characters")
 
}
else if(baptismData.dob=== ''){
  alert("please Enter a Date of Birth ")
  setMessage('');

}
else if(baptismData.dateofbaptism=== ''){
  alert("please Enter a Date of Baptism ")
  setMessage('');
  
}
else if (new Date(baptismData.dateofbaptism) <= new Date(baptismData.dob)) {
  alert('Date of Baptism should be greater than Date of Birth');
}
else if(baptismData.birthplace=== ''){
  alert("please Enter a Birth Place ")
  setMessage('');
  
}
else if(!regex.test(baptismData.birthplace)){
  alert("The Birth place input contains numbers or special characters")
 
}
else if(baptismData.palaceofbaptism=== ''){
  alert("please Enter a Place of Baptism ")
  setMessage('');
 
}
else if(!regex.test(baptismData.palaceofbaptism)){
  alert("The place of Baptism input contains numbers or special characters")
 
}
else if(baptismData.confirmationdate=== ''){
  alert("please Enter a Confirmation Date ")
  setMessage('');
  
}
else if (baptismData.dateofbaptism !== baptismData.confirmationdate) {
  alert('Date of Baptism and Date of Confirmation should be the same');
}
else if(baptismData.godfather=== ''){
  alert("please Enter a God Father ")
  setMessage('');
  
}
else if(!regex.test(baptismData.godfather)){
  alert("The God Father input contains numbers or special characters")
 
}
else if(baptismData.godmother=== ''){
  alert("please Enter a God Mother ")
  setMessage('');

}
else if(!regex.test(baptismData.godmother)){
  alert("The God mother input contains numbers or special characters")
 
}
else if(baptismData.godfatherparish=== ''){
  alert("please Enter a parish of GodFather ")
  setMessage('');
  
}
else if(!regex.test(baptismData.godfatherparish)){
  alert("The God Father parish input contains numbers or special characters")
 
}
else if(baptismData.godmotherparish=== ''){
  alert("please Enter a parish of GodMother ")
  setMessage('');
 
}
else if(!regex.test(baptismData.godmotherparish)){
  alert("The God mother parish input contains numbers or special characters")
 
}
else if(baptismData.ministername=== ''){
  alert("please Enter a Name of  Minister ")
  setMessage('');
 
}
else if(!regex.test(baptismData.ministername)){
  alert("The Minister name input contains numbers or special characters")
 
}
else if(baptismData.parishminister=== ''){
  alert("please Enter a parish Minister ")
  setMessage('');

}
else if(!regex.test(baptismData.parishminister)){
  alert("The Parish of minister input contains numbers or special characters")
 }
 else {
  setErrorMessage("");
  axios
    .post('http://localhost:5000/api/addBaptism', baptismData)
    .then(response => {
      if (response.data.success) {
        // Clear the form after successful save
        setBaptismData({
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
          godfatherparish: '',
          godmotherparish: '',
          ministername: '',
          parishminister: '',
        });
        // Show success message
        alert('Saved successfully!');
      }
    })
    .catch(error => {
      setMessage('Error occurred. Please try again.');
    });
}

  };

  return (
    <form>
      <div className='Baptism'>
        <div className='Baptism_heading'>
          <h1>Baptism Registry</h1>
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Name</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='name'
            value={baptismData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Baptism Name</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='baptismName'
            value={baptismData.baptismName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Family Name</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='familyName'
            value={baptismData.familyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Name of Father</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='fatherName'
            value={baptismData.fatherName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Name of Mother</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='motherName'
            value={baptismData.motherName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Date of Birth</label>
          <input
            className='baptism_record_entery'
            type='date'
            name='dob'
            value={baptismData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Date of Baptism</label>
          <input
            className='baptism_record_entery'
            type='date'
            name='dateofbaptism'
            value={baptismData.dateofbaptism}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Place of Birth</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='birthplace'
            value={baptismData.birthplace}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Place of Baptism</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='palaceofbaptism'
            value={baptismData.palaceofbaptism}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Date of Confirmation</label>
          <input
            className='baptism_record_entery'
            type='date'
            name='confirmationdate'
            value={baptismData.confirmationdate}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Name of GodFather</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='godfather'
            value={baptismData.godfather}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Name of GodMother</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='godmother'
            value={baptismData.godmother}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Parish of GodFather</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='godfatherparish'
            value={baptismData.godfatherparish}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Parish of GodMother</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='godmotherparish'
            value={baptismData.godmotherparish}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Name of Minister</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='ministername'
            value={baptismData.ministername}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Baptism_recorddata'>
          <label className='baptism_record'>Parish of Minister</label>
          <input
            className='baptism_record_entery'
            type='text'
            name='parishminister'
            value={baptismData.parishminister}
            onChange={handleChange}
            required
          />
        </div>
        <button type='button' className='Baptism_add' onClick={handleSave}>
          Save
        </button>
        <div className='baptism_photo'>
          {/* <img
            src={baptismImage}
            className='baptism_image'
            alt='baptism_image'
            height={400}
          
          /> */}
        </div>
        <div className='baptism_success_msg'>
        <p className='Baptism-success_msg'>{message}</p>
        </div>
        <p className='Baptism_error_msg'>{errorMessage}</p>
      </div>
    </form>
  );
}

export default AddBaptism;