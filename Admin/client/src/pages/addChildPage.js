import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Css/addChildPage.css'

const AddChildPage = () => {
  const { id } = useParams();
  const [childName, setChildName] = useState('');
  const [childBaptismName, setChildBaptismName] = useState('');
  const [childDOB, setChildDOB] = useState('');
  const [childAge, setChildAge] = useState('');
  const [childPhoneNumber, setChildPhoneNumber] = useState('');
  const [childEmail, setChildEmail] = useState('');
  const [childStatus, setChildStatus] = useState('');
  const [childSGender, setChildSGender] = useState('');
  const [childSituation, setChildSituation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDOBChange = (e) => {
    const dob = e.target.value;
    setChildDOB(dob);
    const age = calculateAge(dob);
    setChildAge(age);
  };

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const ageDiffMs = today.getTime() - dobDate.getTime();
    let age = '';

    if (ageDiffMs < 2592000000) {
      const ageInDays = Math.floor(ageDiffMs / (1000 * 60 * 60 * 24));
      age = `${ageInDays} day`;
    } else if (ageDiffMs < 31557600000) {
      const ageInMonths = Math.floor(ageDiffMs / (1000 * 60 * 60 * 24 * 30));
      age = `${ageInMonths} month`;
    } else {
      const ageInYears = Math.floor(ageDiffMs / (1000 * 60 * 60 * 24 * 365));
      age = ageInYears.toString();
    }


    return age;
  };

  const handleAddChild = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/families/addChild?q=${id}`,
        {
          name: childName,
          baptism_name: childBaptismName,
          dob: childDOB,
          age: childAge,
          phoneNumber: childPhoneNumber,
          email: childEmail,
          status: childStatus,
          situation: childSituation,
          gender: childSGender,
        }
      );

      setSuccessMessage(response.data.message);
      clearChildFields();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred while adding the child');
      }
    }
  };

  const clearChildFields = () => {
    setChildName('');
    setChildBaptismName('');
    setChildDOB('');
    setChildAge('');
    setChildPhoneNumber('');
    setChildEmail('');
    setChildStatus('');
    setChildSituation('');
    setChildSGender('');
  };

  return (
    <div className='addChild-Container'>
      <h2 className='addChild-more'>Add Child</h2>
      <p className='addChild-Fam'>Family ID: {id}</p>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="Error-message">{errorMessage}</p>}

      <form>
        {/* Form inputs */}
        <label className='addChild-labels' htmlFor="childName">Child Name:</label>
        <input
          className='addChild-NameField'
          type="text"
          id="childName"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
        />
        <br />

        <label className='addChild-labels' htmlFor="childBaptismName">Child Baptism Name:</label>
        <input
          className='addChild-BaptisamField'
          type="text"
          id="childBaptismName"
          value={childBaptismName}
          onChange={(e) => setChildBaptismName(e.target.value)}
        />
        <br />

        <label className='addChild-labels' htmlFor="childDOB">Child DOB:</label>
        <input
          className='addChild-dobField'
          type="date"
          id="childDOB"
          value={childDOB}
          onChange={handleDOBChange}
        />
        <br />

        <label className='addChild-labels' htmlFor="childAge">Child Age:</label>
        <input 
           className='addChild-dateField'
           type="text" 
           id="childAge" 
           value={childAge} 
           readOnly />
        <br />

        <div className="child_entries">
          <label className='addChild-labels' htmlFor="childGender">Gender:</label>
          <select
            id="childGender"
            className="child_datainfo"
            name="gender"
            value={childSGender}
            onChange={(e) => setChildSGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <label className='addChild-labels' htmlFor="childStatus">Child Status:</label>
        <select
          className='addChild-Status'
          id="childStatus"
          value={childStatus}
          onChange={(e) => setChildStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Single">Single</option>
        </select>
        <br />

        <label className='addChild-labels' htmlFor="childSituation">Child Situation:</label>
        <select
          className='addChild-Situation'
          id="childSituation"
          value={childSituation}
          onChange={(e) => setChildSituation(e.target.value)}
        >
          <option value="">Select Situation</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <br />

        <button className='addChild-Button' type="button" onClick={handleAddChild}>
          Add Child
        </button>
      </form>
    </div>
  );
};

export default AddChildPage;
