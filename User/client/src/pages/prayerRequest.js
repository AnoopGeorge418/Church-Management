import React, { useState, useEffect } from 'react';
import '../Css/prayerRequest.css';
import axios from 'axios';

function PrayerRequest() {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [prayerFor, setPrayerFor] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [prayer, setPrayer] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  useEffect(() => {
    let successTimer, errorTimer;

    if (successMsg) {
      successTimer = setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    }

    if (errorMsg) {
      errorTimer = setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }

    return () => {
      clearTimeout(successTimer);
      clearTimeout(errorTimer);
    };
  }, [successMsg, errorMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    }
    else {
      setEmailError('');
    }

    if (!phoneNumber.trim()) {
      setPhoneNumberError('Phone number is required.');
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneNumberError('Please enter a 10-digit phone number.');
      isValid = false;
    }  
    else {
      setPhoneNumberError('');
    }
    
    if (!isValid) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    try {
      const data = {
        name,
        prayerFor,
        email,
        phoneNumber,
        prayer,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/api/prayer-request`, data);
      setName('');
      setPrayerFor('');
      setEmail('');
      setPhoneNumber('');
      setPrayer('');
      setSuccessMsg('Form submitted successfully.');
    } catch (error) {
      setErrorMsg('Oops! Form submission unsuccessful.');
      console.error(error);
    }
  };

  return (
    <div className="prayer-container">
      <div className="prayer-image"></div>
      <div className="prayer-boxes">
        <h1 className="prayer-heading">Prayer Request Form</h1>
        <div className="placing-content">
          <form onSubmit={handleSubmit}>
            <label className="prayer-label_name">Enter Your Name</label>
            <input
              type="text"
              className="prayer-Your_Name"
              placeholder="Enter Your Name..."
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="error-msg">{nameError}</p>}

            <label className="prayer-label_for">Prayer For</label>
            <input
              type="text"
              className="prayer-For"
              placeholder="Prayer For..."
              value={prayerFor}
              onChange={(e) => setPrayerFor(e.target.value)}
            />

            <label className="prayer-label_email">Enter Your Email</label>
            <input
              type="email"
              className="prayer-email"
              placeholder="Enter Your Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-msg">{emailError}</p>}

            <label className="prayer-label_phono">Enter Your Phone Number</label>
            <input
              type="tel"
              className="prayer-phone_no"
              placeholder="Enter Your Phone Number..."
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {phoneNumberError && <p className="error-msg">{phoneNumberError}</p>}

            <label className="prayer-label_multiline_text">Enter Your Prayer</label>
            <textarea
              typeof="text"
              className="prayer-subject"
              wrap="soft"
              maxLength={1000}
              required
              placeholder="Enter Your Prayer Request..."
              value={prayer}
              onChange={(e) => setPrayer(e.target.value)}
            ></textarea>

            <button className="prayer-submit" type="submit">
              Submit Form
            </button>
          </form>
        </div>
        {successMsg && <p className="success-msg">{successMsg}</p>}
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </div>
    </div>
  );
}

export default PrayerRequest;