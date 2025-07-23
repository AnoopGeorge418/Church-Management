import React, { useState, useEffect, useRef } from 'react';
import '../Css/Otpform.css';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import OTP from '../Img/Enter OTP-amico.png';

function ResetPasswordOtpVerification () {
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const location = useLocation();
  const values = queryString.parse(location.search);
  const history = useNavigate();
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleInputChange = (event, index) => {
    const newValue = event.target.value;
    setInputValues([
      ...inputValues.slice(0, index),
      newValue,
      ...inputValues.slice(index + 1),
    ]);

    // Automatically move focus to the next input field after one character is entered
    if (newValue.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleOTP = (event) => {
    event.preventDefault();
    if (successMessage) {
      const otp = inputValues.join('');
      // let emailorPhoneNumber;
      fetch(`${process.env.REACT_APP_API_URL}/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          emailorPhoneNumber: values.emailorPhoneNumber,
          otp: otp
        })
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data.message); // add this line
          if (data.message === 'OTP verified successfully') {
            setSuccessMessage('OTP verified successfully');
            // Redirecting to the home page
            history(`/newPassword?emailorPhoneNumber=${values.emailorPhoneNumber}`);
          } else if (data.message === 'Invalid OTP') {
            setSuccessMessage('Invalid OTP. Please try again.');
          } else if (data.message === 'OTP has expired') {
            setSuccessMessage('OTP has expired. Please request a new OTP.');
          } else {
            setSuccessMessage('Failed to verify OTP. Please try again.');
          }
        })
        .catch(error => {
          console.error(error);
        });

    }


    else {
      if (/^\d+$/.test(values.emailorPhoneNumber)) {
        setSuccessMessage('');
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/send-sms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phone: values.emailorPhoneNumber })
        })
          .then(response => {
            if (response.status === 200) {
              console.log('OTP sent successfully');
              setSuccessMessage('OTP sent successfully');

            } else {
              console.log('Failed to send OTP');
              setSuccessMessage('Failed to send OTP');

            }
            setIsLoading(false);
          })
          .catch(error => {
            console.log('Error sending OTP', error);
            setSuccessMessage('Error sending OTP');
            setIsLoading(false);
          });


      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.emailorPhoneNumber)) {

        setSuccessMessage('');
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: values.emailorPhoneNumber })
        })
          .then(response => {
            if (response.status === 200) {
              console.log('OTP sent successfully');
              setSuccessMessage('OTP sent successfully');

            } else {
              console.log('Failed to send OTP');
              setSuccessMessage('Failed to send OTP');

            }
            setIsLoading(false);
          })
          .catch(error => {
            console.log('Error sending OTP', error);
            setSuccessMessage('Error sending OTP');
            setIsLoading(false);
          });
      }
    }
  };
const resendOTP=()=>{

  if (/^\d+$/.test(values.emailorPhoneNumber)) {
    setTimeLeft(300);
    setSuccessMessage('');
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/send-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: values.emailorPhoneNumber })
    })
      .then(response => {
        if (response.status === 200) {
          console.log('OTP sent successfully');
          setSuccessMessage('OTP sent successfully');

        } else {
          console.log('Failed to send OTP');
          setSuccessMessage('Failed to send OTP');

        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error sending OTP', error);
        setSuccessMessage('Error sending OTP');
        setIsLoading(false);
      });

  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.emailorPhoneNumber)) {
    setTimeLeft(300);
    setSuccessMessage('');
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: values.emailorPhoneNumber })
    })
      .then(response => {
        if (response.status === 200) {
          console.log('OTP sent successfully');
          setSuccessMessage('OTP sent successfully');

        } else {
          console.log('Failed to send OTP');
          setSuccessMessage('Failed to send OTP');

        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error sending OTP', error);
        setSuccessMessage('Error sending OTP');
        setIsLoading(false);
      });
  }
};







  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      // TODO: handle timeout here
      console.log('OTP verification timed out');
    }
  }, [timeLeft]);

  return (
    <div className="otp_container">
      <div className='otp_heading'>
        <h1>OTP Verification</h1>
      </div>
      
      <div className='otp_success'>
        <p>{successMessage}</p>
      </div>
      
      <form >
        <div className='otp_password'>
          <p>Please enter the code we sent to {values.emailorPhoneNumber}</p>
          
          <div className='time_remain'>
            <p>Time Remaining:</p>
          </div>
          <div className='otp_timer'>
            <p>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
          </div>
        </div>
        
        <div className='input_container'>
          
          <input className='otpbox_field'
            type="text"
            maxLength="1"
            onChange={(event) => handleInputChange(event, 0)}
            value={inputValues[0]}
            ref={inputRefs[0]}
          />
          <input className='otpbox_field'
            type="text"
            maxLength="1"
            onChange={(event) => handleInputChange(event, 1)}
            value={inputValues[1]}
            ref={inputRefs[1]}
          />
          <input className='otpbox_field'
            type="text"
            maxLength="1"
            onChange={(event) => handleInputChange(event, 2)}
            value={inputValues[2]}
            ref={inputRefs[2]}
          />
          <input className='otpbox_field'
            type="text"
            maxLength="1"
            onChange={(event) => handleInputChange(event, 3)}
            value={inputValues[3]}
            ref={inputRefs[3]}
          />
          <input className='otpbox_field'
            type="text"
            maxLength="1"
            onChange={(event) => handleInputChange(event, 4)}
            value={inputValues[4]}
            ref={inputRefs[4]}
          />
          <input className='otpbox_field'
            type="text"
            maxLength="1"
            onChange={(event) => handleInputChange(event, 5)}
            value={inputValues[5]}
            ref={inputRefs[5]}
          />
        </div>

        <button className='otp_button' type="submit" onClick={handleOTP}>
          {isLoading ? 'OTP Sending...' : (successMessage ? 'Confirm OTP' : 'Send OTP')}
        </button>
      </form>

      <div className='otp_failed'>
        <p>Didn't Receive OTP?</p>
      </div>

      <button className='resend_otp' onClick={resendOTP}>
      Resend OTP 
    </button>

      <div className='otp_image'>
        <img src={OTP} alt='otp' width={700} height={450} />
      </div>

    </div>
  )
}

export default  ResetPasswordOtpVerification ;