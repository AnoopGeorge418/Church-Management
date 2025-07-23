// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import '../Css/newRegister.css';

// function NewRegister() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/admimregister', {
//         name,
//         email,
//         password
//       });
  
//       if (response.status === 200) {
//         // User created successfully
//         setSuccessMessage('User created successfully');
//         setErrorMessage('');
  
//         // Clear success message after 3 seconds
//         setTimeout(() => {
//           setSuccessMessage('');
//         }, 3000);
//       } else {
//         setErrorMessage('Failed to create user');
//         setSuccessMessage('');
  
//         // Clear error message after 3 seconds
//         setTimeout(() => {
//           setErrorMessage('');
//         }, 3000);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         setErrorMessage('User already exists');
//       } else {
//         setErrorMessage('Failed to create user');
//       }
//       setSuccessMessage('');
  
//       // Clear error message after 3 seconds
//       setTimeout(() => {
//         setErrorMessage('');
//       }, 3000);
//     }
//   };
  
//   return (
//     <div className='newRegister-Container'>
//       <div className='newRegister-SignIn'>
//         <div className='newRegister-Color1'>
//           <h1 className='new_SignIn-heading'>Create Account</h1>
//         </div>
//         <div className='newRegister-Color2'></div>
//         <div className='newSignIn-Contents'>
//           <form onSubmit={handleSubmit}>
//             <div className='newRegister-inputs-container'>
//               <input
//                 className='newRegister-input'
//                 type='text'
//                 required
//                 placeholder='Name'
//                 value={name}
//                 onChange={handleNameChange}
//               />
//             </div>
//             <div className='newRegister-inputs-container'>
//               <input
//                 className='newRegister-input'
//                 type='email'
//                 placeholder='Email'
//                 required
//                 value={email}
//                 onChange={handleEmailChange}
//               />
//             </div>
//             <div className='newRegister-inputs-container'>
//               <input
//                 className='newRegister-input'
//                 type='password'
//                 placeholder='Password'
//                 required
//                 value={password}
//                 onChange={handlePasswordChange}
//               />
//             </div>
//             <div className='signin-btn1'>
//               <button className='newRegister-SignInBtn' type='submit'>Sign In</button>
//             </div>
//             {errorMessage && <p className='error-message'>{errorMessage}</p>}
//             {successMessage && <p className='success-message'>{successMessage}</p>}
//           </form>
//         </div>
//         <div className='newRegister-Color3'>
//           <p className='newsignin-bottom-up'>
//             Already have an account? <Link to='/newRegister' className='newSign-span'>Log in</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewRegister;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/newRegister.css';

function NewRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const history=useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/admimlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        history('/adminLanding');
        setSuccessMsg('Logged in successfully!');
        setErrorMsg('');
      } else {
        // Handle error when user not found
        const data = await response.json();
        setErrorMsg(data.message);
        setSuccessMsg('');
      }
    } catch (error) {
      setErrorMsg('An error occurred. Please try again.');
      setSuccessMsg('');
      console.log('Error:', error.message);
    }
  };
  setTimeout(() => {
    setSuccessMsg('')
    setErrorMsg('')
  }, 3000);
const redirecthandler =()=>{
history('/ResetPassword')
}



  return (
    <div className='newRegister-Container'>
  
    {/* Content for "admin" */}
    <div className='newRegister-SignIn'>
        <div className='newRegister-Color1'>
          <h1 className='new_SignIn-heading'>Welcome Back</h1>
        </div>
        <div className='newRegister-Color2'></div>
        <div className='newSignIn-Contents'>
          <form onSubmit={handleSubmit}>
            <div className='newRegister-inputs'>
              <input
                className='newRegister-inputs'
                type='text'
                placeholder='Email'
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className='newRegister-inputs'>
              <input
                className='newRegister-inputs'
                type='password'
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className='newRegister-Forget'>
              <p className='forgotPassforget' onClick={redirecthandler}>Forget Password?</p>
            </div>
            <div className='signin-btn1'>
              <button className='newRegister-SignInBtn' type='submit'>Sign In</button>
            </div>
          </form>
          {errorMsg && <p className='error-msg'>{errorMsg}</p>}
          {successMsg && <p className='success-msg'>{successMsg}</p>}
        </div>
        {/* <div className='newRegister-Color4'>
          <p className='newsignin-bottom-up'>
            Don't have an account? <Link to='/Signup' className='newSign-span'>Sign Up</Link>
          </p>
        </div> */}
        <div className='SignIn-image'></div>
      </div>
  </div>
    
  );
}

export default NewRegister;