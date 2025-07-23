import React, { useState } from 'react';
import "../Css/adminRegister.css";
 import Key_rafiki from '../Images/Key_rafiki.png'
function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmpasswordChange = (event) => {
    setConfirmpassword(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API or send form data to server here
  };

  return (
   
    <div className='Register_container'>
      <div className='all_inputbox'>
    <lable className='Re_name'> Name:</lable>
    <input  className='name_box'type="text" value={name} onChange={handleNameChange} />

<lable className='Re_email'>Email:</lable>
<input  className='email_box'type="text" value={email} onChange={handleNameChange} />

 <lable className='Re_password'>password:</lable>
<input className='password_box' type="text" value={password} onChange={handlePasswordChange}  />


<lable className='Re_Cpassword'>confirm password:</lable>
<input className='confirmpassword_box' type="text" value={confirmpassword} onChange={handleConfirmpasswordChange} />
<button className='admin_submit' type="submit">Register</button>
</div>
<div className='Key_rafiki'>
        <img src={Key_rafiki} className="image" alt="Key_rafiki" height={620} width={600} />
   </div>
 </div>
    
  );
}

export default RegistrationPage;
