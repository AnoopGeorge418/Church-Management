import React, { useState } from 'react';
import '../Css/addMember.css';
import axios from 'axios';
// import wife from '../Images/wife.png';

import {
  Snackbar,
  Alert
} from '@mui/material';
function AddMember() {
 
  const [houseName, sethouseName] = useState('');
  const [address, setaddress] = useState('');
  const [housepincode, sethousepincode] = useState('');
  const [father, setFather] = useState({
    name: '',
    baptism_name: '',
    age: '',
    dob: '',
    phoneNumber: '',
    email: '',
    situation: '',
  });
  const [mother, setMother] = useState({
    name: '',
    age: '',
    dob: '',
    phoneNumber: '',
    email: '',
    situation: '',
    baptism_name: ''
  });
  const [children, setChildren] = useState([]);

  const handleAddChild = () => {
    setChildren((prevChildren) => [
      ...prevChildren,
      {
        name: '',
        age: '',
        phoneNumber: '',
        email: '',
        baptism_name: '',
        status: '',
        situation: '',
        gender: '',
        wife: {
          name: '', age: '',     baptism_name: '',
          dob: '', phoneNumber: '', email: '', situation: '', 
        },
      },
    ]);
  };
  const [message, setMessage] = useState('');
  const[errorMessage,setErrorMessage] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regex = /^[a-zA-Z\s]*$/;
  const phoneNumberRegex = /^\d{10}$/;
  const pincoderRegex = /^\d{6}$/;
  const isValidEmail = emailRegex.test(father.email);
  const isValidMotherEmail=emailRegex.test(mother.email);
  const handleChangeFather = (e) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      const dob = new Date(value);
      const ageDiffMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      setFather((prevFather) => ({
        ...prevFather,
        [name]: value,
        age: age.toString(), // Update the age based on DOB
      }));
    } else {
      setFather((prevFather) => ({
        ...prevFather,
        [name]: value,
      }));
    }
  };

  const handleChangeMother = (e) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      const dob = new Date(value);
      const ageDiffMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      setMother((prevMother) => ({
        ...prevMother,
        [name]: value,
        age: age.toString(), // Update the age based on DOB
      }));
    } else {
      setMother((prevMother) => ({
        ...prevMother,
        [name]: value,
      }));
    }
  };

  const handleChangeChild = (e, index) => {
    const { name, value } = e.target;
    if (name === 'status' && value === '') {
      setMessage("Please select a status");
      return;
    }
    setChildren((prevChildren) => {
      const updatedChildren = [...prevChildren];
      const child = updatedChildren[index];

      if (name === `dob${index}`) {
        const dob = new Date(value);
        const now = new Date();
        // dob.setFullYear(now.getFullYear()); // Set the year to the current year
        console.log(dob, 555555)
        const ageDiffMs = now.getTime() - dob.getTime();
        let ageDate;
        let age;
        console.log(ageDiffMs, 4444444)
        if (ageDiffMs < 2592000000) {
          ageDate = new Date(ageDiffMs);
          age = Math.floor(ageDate / (1000 * 60 * 60 * 24));
          console.log(age, 11111)
          child.dob = value;
          age = age + " day"
          child.age = age.toString();
        }
        else if (ageDiffMs > 2592000000 && ageDiffMs < 31557600000) {
          ageDate = new Date(ageDiffMs);
          age = Math.floor(ageDate / (1000 * 60 * 60 * 24 * 30));
          console.log(age, 22222)
          age = age + " Month"
          child.dob = value;
          child.age = age.toString();
        }
        else {
          ageDate = new Date(ageDiffMs);
          age = Math.floor(ageDate / (1000 * 60 * 60 * 24 * 365));
          console.log(age, 22222)
          age = age + " Years"
          child.dob = value;
          child.age = age.toString();
        }
        // // 31536000000 year milliseconds
        // 31556952000
        // // 2592000000 year milliseconds
        // const ageDate = new Date(ageDiffMs);
        // const age = Math.floor(ageDate / (1000 * 60 * 60 * 24 * 365));
        // console.log(age, 11111)


      } 
      if (name === `wifeDOB${index}`) {
        const dob = new Date(value);
        const now = new Date();
        const ageDiff = now.getFullYear() - dob.getFullYear();
      
        // Check if the current date is before the birthday in the current year
        const isBeforeBirthday =
          now.getMonth() < dob.getMonth() ||
          (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
      
        // Subtract 1 from the age if the birthday hasn't occurred yet in the current year
        const age = isBeforeBirthday ? ageDiff - 1 : ageDiff;
      
        child.wife.dob = value;
        child.wife.age = age.toString();
      } else if (name === `wifeName${index}`) {
        child.wife.name = value;
      } else if (name === `wifePhoneNumber${index}`) {
        child.wife.phoneNumber = value;
      } else if (name === `wifeEmail${index}`) {
        child.wife.email = value;
      } else if (name === `baptism_name${index}`) {
        child.wife.baptism_name = value;
      } else if (name === `situation${index}`) {
        child.wife.situation = value;
      } 
      
      else if (name === `gender${index}`) {
        const isValidGender = value === 'male' || value === 'female';
        if (!isValidGender) {
          setMessage('Please select a valid gender');
          return;
        }
        child.gender = value;
      } else {
        child[name] = value;
      }
      
      return updatedChildren;
      
    });
  };

  function handleChangehouseName(event) {
    sethouseName(event.target.value);

  }

  function handleChangeaddress(event) {
    setaddress(event.target.value);

  }

  function handleChangehousepincode(event) {
    sethousepincode(event.target.value);

  }
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = () => {
  
  if(houseName===""){
    // setErrorMessage('The input house name.');
    setSnackbarMessage('The input house name.');
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
    return;
  }else if (!regex.test(houseName)) {
    // setErrorMessage('The House nameinput contains numbers or special characters.');
    setSnackbarMessage('The House nameinput contains numbers or special characters.');
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
    return;
  }else if(address===""){
    setErrorMessage('The input address.');
    return;
  }else if(housepincode===""){
    setErrorMessage('The input house pincode.');
    return;
  }else if(!pincoderRegex.test(housepincode)){
    setErrorMessage('The Pincode is not a valid ');	
    return;
  }else if(father.name === ''){
    setErrorMessage('The input father name.');
    return;
  } else if (!regex.test(father.name)) {
    setErrorMessage('The Father name input contains numbers or special characters.');
    return;
  }else if(father.baptism_name === ""){
    setErrorMessage('The input baptism name.');
    return;
  } else if (!regex.test(father.baptism_name)) {
    setErrorMessage('The Father baptism name input contains numbers or special characters.');
    return;
  }else if(father.dob===""){
    setErrorMessage('The input father dob.');
    return;	
      } else
  
  if(father.age===""){
    setErrorMessage('The input father age.');
    return;
  } else  if(father.phoneNumber===""){
  setErrorMessage('The input father phone number.');
  return;
  } else if(!phoneNumberRegex.test(father.phoneNumber)){
setErrorMessage('The provided string is not a valid mobile number');
return;	
  }else 
  //  if (!isValidEmail) {
  //   setErrorMessage('The provided string is not a valid email address.');
  // }else 
  if(father.situation===""){
setErrorMessage('The input father situation.');
return;
// mothe validation  
  }
  else if(mother.name === ''){
    setErrorMessage('The input mother name.');
    return;
  } else if (!regex.test(mother.name)) {
    setErrorMessage('The Father name input contains numbers or special characters.');
    return;
  }else if(mother.baptism_name === ""){
    setErrorMessage('The input baptism name.');
    return;
  } else if (!regex.test(mother.baptism_name)) {
    setErrorMessage('The Father baptism name input contains numbers or special characters.');
    return;
  }else if(mother.dob===""){
    setErrorMessage('The input mother dob.');	
    return;
      } else
  
  if(mother.age===""){
    setErrorMessage('The input mother age.');
    return;
  } else  if(mother.phoneNumber===""){
  setErrorMessage('The input mother phone number.');
  return;
  } else  if (!phoneNumberRegex.test(mother.phoneNumber)) {
    setErrorMessage('The provided string is not a valid mobile number');
    return;
  } else
   
  if(mother.situation===""){
    setErrorMessage('The input Mother situation.');
    return;
    // mothe validation  
      } 
if(!emailRegex.test(mother.Email)){
  setSnackbarMessage('please enter corrct email');
  setSnackbarSeverity('error');
  setSnackbarOpen(true);
}



      {
    const validationEndpoint = `http://localhost:5000/api/family`;


    const data = {
      father,
      mother,
      children,
      houseName,
      address,
      housepincode,
    };
    console.log(data)

    axios.post(validationEndpoint, data)
    .then(response => {
      if (response.status === 200) {
        setMessage('Data saved successfully');
        setSnackbarMessage('Data saved successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        // setErrorMessage('An error occurred during validation');
        setSnackbarMessage('An error occurred during validation');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    })
    .catch(error => {
      // setErrorMessage('An error occurred during validation');
      setSnackbarMessage('An error occurred during validation');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error(error);
    });
  }
  };


  return (
    <form>
    <div className='addMember-Container'>
      <div className='pageheading'>
        <h1>Family Registries</h1>
      </div>

      <div className='house_information'>
           <div className='house_data'>
            <label className='house_delatils'>House Name</label>
            <input
              className='house_details_fill'
              type='text'
              id='HouseName'
              name='houseName'
              value={houseName}
              onChange={handleChangehouseName}
            />
          </div>


          <div className='house_data'>
            <label className='house_delatils'>House Address</label>
            <input
              className='house_details_fill'
              type='text'
              id='address'
              name='address'
              value={address}
              onChange={handleChangeaddress}
            />
          </div>

          <div className='house_data '>
            <label className='house_delatils'>Pincode</label>
            <input
              className='house_details_fill'
              type='number'
              id='pincode'
              name='pincode'
              value={housepincode}
              onChange={handleChangehousepincode}
            />
          </div>
     </div>

  
        
         <div className='father_all_data'>

          <div className='fathet_detalis'>
          <h2 className='Father-Heading'>Father:</h2>
         </div>


          <div className='fathet_detalis'>
            <label className='father_entry'>Name</label>
            <input
              className='father_flied_fill'
              type='text'
              id='fatherName'
              name='name'
              value={father.name}
              onChange={handleChangeFather}
            />
          </div>

          <div className=' fathet_detalis'>
            <label className='father_entry'>Baptism Name</label>
            <input
              className='father_flied_fill'
              type='text'
              id='fatherBaptism'
              name='baptism_name'
              value={father.baptism_name}
              onChange={handleChangeFather}
            />
          </div>

         

          <div className='fathet_detalis'>
            <label className='father_entry'>DOB</label>
            <input
              className='father_flied_fill'
              type='date'
              id='fatherDob'
              name='dob'
              value={father.dob}
              onChange={handleChangeFather}
            />
          </div>
          
          <div className='fathet_detalis'>
            <label className='father_entry'>Age</label>
            <input
              className='father_flied_fill'
              type='number'
              id='fatherAge'
              name='age'
              value={father.age}
              onChange={handleChangeFather}
              readOnly
            />
          </div>


          <div className='fathet_detalis'>
            <label className='father_entry'>Phone Number</label>
            <input
              className='father_flied_fill'
              type='text'
              id='fatherPhoneNumber'
              name='phoneNumber'
              value={father.phoneNumber}
              onChange={handleChangeFather}
            />
          </div>

          <div className='fathet_detalis'>
            <label className='father_entry'>Email</label>
            <input
              className='father_flied_fill'
              type='email'
              id='fatherEmail'
              name='email'
              value={father.email}
              onChange={handleChangeFather}
            />
          </div>
       
         <div className='fathet_detalis'>
<label className='father_entry'>Status</label>
<select
  className='father_flied_fill'
  id='fatherStatus'
  name='situation'
  value={father.situation}
  onChange={handleChangeFather}
>
  <option value=''>Select</option>
  <option value='Active'>Active</option>
  <option value='Inactive'>Inactive</option>
</select>
</div>
</div>
    
   

     
<div className='Mother_info'>
 <div className='Mother_detalis'>
             <h2 className='Mother_Heading'> Mother:</h2>
          </div>

          <div className='Mother_detalis'>
            <label className='mother_entey'>Name</label>
            <input
              className='mothe_fill_flied'
              type='text'
              id='motherName'
              name='name'
              value={mother.name}
              onChange={handleChangeMother}
            />
          </div>

          <div className='Mother_detalis'>
            <label className='mother_entey'>Baptism Name</label>
            <input
              className='mothe_fill_flied'
              type='text'
              id='motherBaptism'
              name='baptism_name'
              value={mother.baptism_name}
              onChange={handleChangeMother}
            />
          </div>

      

          <div className='Mother_detalis'>
            <label className='mother_entey'>DOB</label>
            <input
              className='mothe_fill_flied'
              type='date'
              id='motherDob'
              name='dob'
              value={mother.dob}
              onChange={handleChangeMother}
            />
          </div>
          <div className='Mother_detalis'>
            <label className='mother_entey'>Age</label>
            <input
              className='mothe_fill_flied'
              type='number'
              id='motherAge'
              name='age'
              value={mother.age}
              onChange={handleChangeMother}
              readOnly
            />
          </div>

          <div className='Mother_detalis'>
            <label className='mother_entey'>Phone Number</label>
            <input
              className='mothe_fill_flied'
              type='text'
              id='motherPhoneNumber'
              name='phoneNumber'
              value={mother.phoneNumber}
              onChange={handleChangeMother}
            />
          </div>

          <div className='Mother_detalis'>
            <label className='mother_entey'>Email</label>
            <input
              className='mothe_fill_flied'
              type='email'
              id='motherEmail'
              name='email'
              value={mother.email}
              onChange={handleChangeMother}
            />
          </div>
          <div className='Mother_detalis'>
            <label className='mother_entey'>Status</label>
            <select
              className='mothe_fill_flied'
              id='motherStatus'
              name='situation'
              value={mother.situation}
              onChange={handleChangeMother}
            >
              <option value=''>Select</option>
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
            </select>
          </div>

        </div>
        

        <div className='Child-Info'>
        <div className='chid_hhahhahahaha'>
        <div className='child_entries'>
          <h2 className='Child_Heading'>Children:</h2>
          </div>
          {children.map((child, index) => (
          
            <div className='Child-Add_more' key={index}>

              <div className='child_informaton_list'>
              {/* <div className='child_entry'>    */}
              <h3 className='child_name_head' >Child {index + 1}</h3>
            {/* </div> */}
              <div className='child_entries'>
                <label className='child_entry' htmlFor={`childName${index}`}>Name</label>
                <input
                  className='child_datainfo_fill'
                  type='text'
                  id={`childName${index}`}
                  name='name'
                  value={child.name}
                  onChange={(e) => handleChangeChild(e, index)}
                />
              </div>

              <div className='  child_entries'>
            <label className='child_entry'  >Baptism Name</label>
            <input
              className='child_datainfo_fill'
              type='text'
              id={`baptism_name${index}`}
              name='baptism_name'
              value={child.baptism_name}
              onChange={(e) => handleChangeChild(e, index)}
            />
          </div>


              <div className='child_entries'>
              <label  className='child_entry' >DOB</label>
                <input
                  type="date"
            
                  className="child_datainfo_fill"
                  id={`dob${index}`}
                  name={`dob${index}`}
                  value={child.dob}
                  onChange={(e) => handleChangeChild(e, index)}
                />
              </div>

              <div className='child_entries'>
                <label className='child_entry'  htmlFor={`childAge${index}`}>Age</label>
                <input
                  type='text'
                  className='child_datainfo_fill'
                  id={`childAge${index}`}
                  name='age'
                  value={child.age}
                  onChange={(e) => handleChangeChild(e, index)}
                  readOnly
                />
              </div>

              <div className='child_entries'>
                <label className='child_entry'  htmlFor={`childgender${index}`}>Gender</label>
                <select
                  id={`childgender${index}`}
                  className='child_datainfo_fill'
                  name='gender'
                  value={child.gender}
                  onChange={(e) => handleChangeChild(e, index)}
                >
                  <option value=''>Select gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>

              <div className='child_entries'>
                <label className='child_entry'  htmlFor={`childPhoneNumber${index}`}>Phone Number</label>
                <input
                  type='text'
                  className='child_datainfo_fill'
                  id={`childPhoneNumber${index}`}
                  name='phoneNumber'
                  value={child.phoneNumber}
                  onChange={(e) => handleChangeChild(e, index)}
                />
              </div>

              <div className='child_entries'>
                <label className='child_entry'  htmlFor={`childEmail${index}`}>Email</label>
                <input
                  type='email'
                  className='child_datainfo_fill'
                  id={`childEmail${index}`}
                  name='email'
                  value={child.email}
                  onChange={(e) => handleChangeChild(e, index)}
                />
              </div>

              <div className='child_entries'>
                <label className='child_entry'  htmlFor={`childStatus${index}`}>Status</label>
                <select
                  id={`childStatus${index}`}
                  name='status'
                  className='child_datainfo_fill'
                  value={child.status}
                  onChange={(e) => handleChangeChild(e, index)}
                >
                  <option value=''>Select Status</option>
                  <option value='Single'>Single</option>
                  <option value='Married'>Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>

             



              </div>


              {/* Wife */}
              {child.status === 'Married' && child.gender === "male" && (
                <div  className='wife_hhhhhhhhhhhhhh'>
                   {/* <div className='wife_photo'>
          <img
            src={wife}
            className='wife_image'
            alt='wife_image'
            height={400}
            loading='lazy'
          />
          </div> */}
                <div className='wife_details'>
                  <div className='wife_heading'>
                  <h4 >Wife Details:</h4>
                  </div>
                  <div className='child_entries'>
                    <label  className='child_entry' htmlFor={`wifeName${index}`}>Name</label>
                    <input
                      type='text'
                      className='child_datainfo_fill'
                      id={`wifeName${index}`}
                      name={`wifeName${index}`}
                      value={child.wife.name}
                      onChange={(e) => handleChangeChild(e, index)}
                    />
                  </div>

                  <div className='child_entries'>
                    <label className='child_entry' >Baptism Name</label>
                   <input
              type='text'
              className='child_datainfo_fill'
              id={`baptism_name${index}`}
              name={`baptism_name${index}`}
              value={child.wife.baptism_name}
              onChange={(e) => handleChangeChild(e, index)}
            />
          </div>
                  <div className='child_entries'>
                    <label  className='child_entry' htmlFor={`wifeDOB${index}`}>DOB</label>
                    <input
                      type='date'
                      className='child_datainfo_fill'
                      id={`wifeDOB${index}`}
                      name={`wifeDOB${index}`}
                      value={child.wife.dob}
                      onChange={(e) => handleChangeChild(e, index)}
                    />
                  </div>

                  <div className='child_entries'>
                    <label  className='child_entry' htmlFor={`wifeAge${index}`}>Age</label>
                    <input
                      type='text'
                      className='child_datainfo_fill'
                      id={`wifeAge${index}`}
                      name={`wifeAge${index}`}
                      value={child.wife.age}
                      readOnly
                    />
                  </div>

                  <div className='child_entries'>
                    <label  className='child_entry' htmlFor={`wifePhoneNumber${index}`}>Phone Number</label>
                    <input
                      type='text'
                      className='child_datainfo_fill'
                      id={`wifePhoneNumber${index}`}
                      name={`wifePhoneNumber${index}`}
                      value={child.wife.phoneNumber}
                      onChange={(e) => handleChangeChild(e, index)}
                    />
                  </div>

                  <div className='child_entries'>
                    <label  className='child_entry' htmlFor={`wifeEmail${index}`}>Email</label>
                    <input
                      type='email'
                      className='child_datainfo_fill'
                      id={`wifeEmail${index}`}
                      name={`wifeEmail${index}`}
                      value={child.wife.email}
                      onChange={(e) => handleChangeChild(e, index)}
                    />
                  </div>
                  <div className='child_entries'>
                    <label  className='child_entry'>Status</label>
                    <select
                      className='child_datainfo_fill'
                      id={`situation${index}`}
                      name={`situation${index}`}
                      value={child.wife.situation}
                      onChange={(e) => handleChangeChild(e, index)}
                    >
                      <option value=''>Select</option>
                      <option value='Active'>Active</option>
                      <option value='Inactive'>Inactive</option>
                    </select>
                  </div>
                </div>
                </div>
              )}
            </div>
          ))}

<div className='save_family'>
          <div className='sucess_btn'>
            <button type='button' className='addmember' onClick={handleAddChild}>
              Add Child
            </button>
            <button type='button' className='savemember' onClick={handleSave}>
              Save
            </button>

          </div>
          </div>
         </div>
<p>{errorMessage}</p>
<p>{message}</p>
          {/* </div> */}
        </div>
        
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
     
    </form>
  );
};

export default AddMember;