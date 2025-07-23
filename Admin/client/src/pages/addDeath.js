import React, {  useInsertionEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Css/addDeath.css'

function AddDeath() {
  const [deathData, setDeathData] = useState({
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

  const [message, setMessage] = useState('');
  const [errorMessage , setErrorMessage]=useState('');
  const regex = /^[a-zA-Z\s]*$/;
  // let navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeathData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSave = (e) => {
    e.preventDefault()
    if(deathData.name === ''){
      alert("please Enter a Name")
      setMessage('');
     }
     else if(!regex.test(deathData.name)){
      alert("The Name input contains numbers or special characters")
     
    }
    else if(deathData.housename === ''){
      alert("please Enter a House Name ")
      setMessage('');
      
    }
    else if(!regex.test(deathData.housename)){
      alert("The Family Name input contains numbers or special characters")
     
    }
    else if(deathData.baptismname === ''){
      alert("please Enter a Baptism Name ")
      setMessage('');
      
    }
    else if(!regex.test(deathData.baptismname)){
      alert("The Baptism name input contains numbers or special characters")
     
    }
    else if(deathData.age === ''){
      alert("please Enter the Age ")
      setMessage('');
      
    }
    else if(deathData.confession === ''){
      alert("please select the option from confession")
      setMessage('');
      
    }
    else if(deathData.Viaticum === ''){
      alert("please select the option from Viaticum")
      setMessage('');
      
    }
    else if(deathData.Anointing_of_sick === ''){
      alert("please select the option from Anointing of sick")
      setMessage('');
      
    }
    else if(deathData.sickness === ''){
      alert("please Enter a Sickness ")
      setMessage('');
      
    }
    else if(!regex.test(deathData.sickness)){
      alert("The sickness flied cannot allow numbers or special characters")
     
    }
    else if(deathData.date_of_death === ''){
      alert("please Enter a Date of Death ")
      setMessage('');
      
    }
    else if(deathData.date_of_Burial === ''){
      alert("please Enter a Date of Burial ")
      setMessage('');
      
    }
    // else if (new Date(deathData.date_of_Burial) <= new Date(deathData.date_of_death)) {
    //   alert('Date of burial should be greater than Date of death');
    // }
    else if(deathData.Parish_Priest === ''){
      alert("please Enter the Name of Priest ")
      setMessage('');
      
    }
    else if(!regex.test(deathData.Parish_Priest)){
      alert("The priest Name input contains numbers or special characters")
     
    }
    else if(deathData.Parish_name === ''){
      alert("please Enter the Name of church ")
      setMessage('');
      
    }
    else if(!regex.test(deathData.Parish_name)){
      alert("The Parish Name input contains numbers or special characters")
     
    }
 else{
    setErrorMessage("")
    axios
      .post(' http://localhost:5000/api/addDeath', deathData)
      .then(response => {
 if(response.data.success){
  setDeathData({
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
  })
 alert("inserted successfull")
          // navigate('/')

        }
        else{
          alert(" unsuccessfull")

        }
        // alert('Saved successfully!');
        // navigate('/')
      })
      .catch(error => {
        setMessage('Error occurred. Please try again.');
      });
  } 
};




  return (
    <form>
    <div className='addDeath-Container'>
      <h1 className='addDeath-Heading'>
        Death Registry
      </h1>
      <div className='addDeath-registry'>
       
        <div className='addDeath-labels_and_inputs'>
           <label className='addDeath-label'>Name</label>
           <input 
           type='text'
           name='name' 
           className='addDeath-input-field2'
             value={deathData.name}
            onChange={handleChange}
            required
        />
        </div>


        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label'>House Name</label>
          <input
           type='text'
           name='housename'
           className='addDeath-input-field3'
           value={deathData.housename}
           onChange={handleChange}
           required
           />
        </div>


        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label'>Baptisam Name</label>
          <input 
          type='text'
           className='addDeath-input-field4'
           name='baptismname'
           value={deathData.baptismname}
           onChange={handleChange}
           required
           />
        </div>
        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label'>Age</label>
          <input 
          type='number'
           className='addDeath-input-field5'
           name='age'
           value={deathData.age}
           required
           onChange={handleChange}
             />
        </div>
        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label'>Sarcasments Recieved</label>
        </div>
        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label2'>Confession</label>
          <select
 
 className='confession_select'
  name='confession'
  required
  value={deathData.confession}
  onChange={handleChange}
>
  <option value=''>Select</option>
  <option value='Recieved'>Recieved</option>
  <option value='Not Recieved'>Not Recieved</option>
</select>
        </div>
        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label2'>Viaticum</label>
          <select
 
 className='vitaticm_select'
 name='Viaticum'
 value={deathData.Viaticum}
 onChange={handleChange}
 required
>
 <option value=''>Select</option>
 <option value='Recieved'>Recieved</option>
 <option value='Not Recieved'>Not Recieved</option>
</select>
        </div>
        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label2'>Anointing of sick</label>
          <select
  className='Anointing_of_sick_select'
  required
 name='Anointing_of_sick'
 value={deathData.Anointing_of_sick}
 onChange={handleChange}
>
 <option value=''>Select</option>
 <option value='Recieved'>Recieved</option>
 <option value='Not Recieved'>Not Recieved</option>
</select>
        </div>

        <div className='addDeath-labels_and_inputs'>
           <label className='addDeath-label_1'>Sickness</label>
           <textarea 
            className='addDeath-input-field1'
            name='sickness'
            required
            value={deathData.sickness}
            onChange={handleChange}
            />
        </div>

        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label'>Date of Death</label>
          <input 
          type='date'
          required
           className='addDeath-input-field9'
           name='date_of_death'
           value={deathData.date_of_death}
           onChange={handleChange}
           />
        </div>
        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label'>Date of Burial</label>
          <input
           type='date'
           required
            className='addDeath-input-field10'
            name='date_of_Burial'
            value={deathData.date_of_Burial}
            onChange={handleChange}

           />
        </div>
        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label'>Parish Priest</label>
          <input 
          type='text'
          required
           className='addDeath-input-field11'
           name='Parish_Priest'
           value={deathData.Parish_Priest}
           onChange={handleChange}
          
           />
        </div>
        <div className='addDeath-labels_and_inputs'>
          <label className='addDeath-label'>Parish Name</label>
          <input 
          type='text'
          placeholder='Enter full Church Name'
           required
           className='addDeath-input-field12'
           name='Parish_name'
           value={deathData.Parish_name}
           onChange={handleChange}
           
           />
        </div>
        <div className='death__msg'>
        <p className='death_sa_msg'>{message}</p>
        </div>
        <div className='death__msg'>
        <p className='death_err_msg'>{errorMessage}</p>
        </div>
        <button className='addDeath-button'  onClick={handleSave} >Save</button>
     
        </div>
    
    </div>
  </form>
  );
}

export default AddDeath