import { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import '../../Css/ResetPassword.css';
import Reset_password from '../../Img/Reset_password.png'
function ResetPassword() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const history=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
if(email===""){
  setSuccessMessage("please enter a field")
}else{

      history(`/resetOtp?emailorPhoneNumber=${email}`);
}
  };

  return (
    <div className="Reset_password">
      <div className='Repassword_head'>
      <h1>Forgot</h1>
      </div>

<div className='Repassword_head2'>
  <h1>Your Password?</h1>
</div>
<div className='Repassword_paragraph'>
  <p>Please enter your email address or Phone number below</p>
</div>
  <img src={ Reset_password} className="reset_passwordimage" alt="Reset_password" />
    <form onSubmit={handleSubmit}>
        <input 
          type="text"
          className="reset_email"
          placeholder="Enter your Email or phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      
        <button className='reset_passbutton'>Send My Password</button>
       
    </form>
    <div className='resetsuccess_msg'>
      <p>{successMessage}</p>
      </div>
    </div>
  );
}
export default  ResetPassword;



