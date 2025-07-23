import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Css/familyEdit.css';
const EditPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [ father_information ,setfatherinformation]=useState('');
  const [mother_information ,setmotherinformation]=useState('');
  const [wife_information ,setwife_information]=useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [personData, setPersonData] = useState(null);
  const [previousStatus, setPreviousStatus] = useState('');
  const { name, familyId,childId  } = useParams();
  const [checked, setChecked] = useState(null);
  const [formData, setFormData] = useState({
    houseName: '',
    address: '',
    housepincode: '',
    name: '',
    baptism_name: '',
    age: '',
    dob: '',
    phoneNumber: '',
    email: '',
    situation: '',
    status: 'Single',
    gender:'',
    wife: {
      name: '',
      baptism_name: '',
      dob: '',
      phoneNumber: '',
      email: '',
      situation: '',
      gender:'',
    },
    // Add other fields as needed
  });
 
  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/EditsearchFamily?name=${name}&familyId=${familyId}`);
        console.log(response.data,123); // Check the response data in the console
        const person = response.data; // Select the person at index 0
        setPersonData(person);

        let formDataUpdate = { ...formData };
        formDataUpdate = {
          ...formDataUpdate,
          name: person.name || '',
          baptism_name: person.baptism_name || '',
          dob: person.dob ? new Date(person.dob).toISOString().substring(0, 10) : '',
          phoneNumber: person.phoneNumber || '',
          email: person.email || '',
          age: person.age || '',
          situation: person.situation || '',
          // common details
          houseName: person.houseName || '',
          housepincode: person.housepincode || '',
          address: person.address || '',
          active: person.active ||'',
          
          // Set other fields related to the person
          
        };
      

        if (person.father && person.father.name === name) {
          formDataUpdate = {
            ...formDataUpdate,
            name: person.father.name || '',
            
           
            baptism_name: person.father.baptism_name || '',
            dob: person.father.dob ? new Date(person.father.dob).toISOString().substring(0, 10) : '',
            phoneNumber: person.father.phoneNumber || '',
            email: person.father.email || '',
            age: person.father.age || '',
            situation: person.father.situation || '',
            status: person.father.status || '',
          
           
          };
          setfatherinformation(name);
  
        } else if (person.mother && person.mother.name === name) {
          formDataUpdate = {
            ...formDataUpdate,
            name: person.mother.name || '',
            baptism_name: person.mother.baptism_name || '',
            dob: person.mother.dob ? new Date(person.mother.dob).toISOString().substring(0, 10) : '',
            phoneNumber: person.mother.phoneNumber || '',
            email: person.mother.email || '',
            age: person.mother.age || '',
            situation: person.mother.situation || '',
            status: person.mother.status || '',
          };
          setmotherinformation(name)
        } else if (person.children && person.children.some(child => child.name === name)) {
          const child = person.children.find(child => child.name === name);
          if (child) {
            formDataUpdate = {
              ...formDataUpdate,
              name: child.name || '',
              baptism_name: child.baptism_name || '',
              dob: child.dob ? new Date(child.dob).toISOString().substring(0, 10) : '',
              phoneNumber: child.phoneNumber || '',
              email: child.email || '',
              age: child.age || '',
              situation: child.situation || '',
              status: child.status || '',
              gender:child.gender || '',
              // Set other fields related to the child
            };
          }
        } else if (person.children && person.children.length > 0) {
          const matchingChild = person.children.find(child => child.wife && child.wife.name === name);
          if (matchingChild && matchingChild.wife) {
            const { wife } = matchingChild;
            formDataUpdate = {
              ...formDataUpdate,
              name: wife.name || '',
              baptism_name: wife.baptism_name || '',
              dob: wife.dob ? new Date(wife.dob).toISOString().substring(0, 10) : '',
              phoneNumber: wife.phoneNumber || '',
              age: wife.age || '',
              email: wife.email || '',
              situation: wife.situation || '',
              
              // Set other fields related to the wife
            };
            setwife_information( name);
          }
        }

        setFormData(formDataUpdate);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPerson();
  }, [name, familyId]);

  useEffect(() => {
    const calculateAge = (dob) => {
      if (!dob) return '';
    
      const dobDate = new Date(dob);
      const today = new Date();
      const ageDiffMs = today.getTime() - dobDate.getTime();
      let age;
    
      if (ageDiffMs < 2592000000) {
        const ageInDays = Math.floor(ageDiffMs / (1000 * 60 * 60 * 24));
        age = `${ageInDays} day`;
      } else if (ageDiffMs < 31557600000) {
        const ageInMonths = Math.floor(ageDiffMs / (1000 * 60 * 60 * 24 * 30));
        age = `${ageInMonths} month`;
      } else {
        const ageInYears = Math.floor(ageDiffMs / (1000 * 60 * 60 * 24 * 365));
        age = ageInYears;
      }
    
      return age;
      
    };
    

    const updatedFormData = { ...formData };
    updatedFormData.age = calculateAge(formData.dob);

    setFormData(updatedFormData);
  }, [formData.dob]);

  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === 'status') {
      setPreviousStatus(formData.status);
    }// Calculate wife's age when her dob is changed

  if (name === 'wife.dob') {
    const wifeDob = new Date(value);
    const today = new Date();
    const wifeAge = today.getFullYear() - wifeDob.getFullYear();
    setFormData((prevFormData) => ({
      ...prevFormData,
      wife: {
        ...prevFormData.wife,
        dob: value,
        age: wifeAge.toString(),
      },
    }));

    
  } 

   if (name === 'status' && formData.status === 'Single' && value === 'Married'){
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        wife: {
          name: '',
          baptism_name: '',
          dob: '',
          phoneNumber: '',
          email: '',
          situation: '',
        },
      }));
    } else if (name.startsWith('wife')) {
      const nestedFieldName = name.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        wife: {
          ...prevFormData.wife,
          [nestedFieldName]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  // console.log(typeof(formData.gender),7777777777777);

  
  // const formData = new FormData();
  // formData.append('image', selectedImage);
  
    try {
      // Update child's wife details
      if (formData.status === 'Married' && personData.children && personData.children.length > 0) {
        const desiredChildIndex = 0; // Index of the desired child 
        const desiredChild = personData.children[desiredChildIndex];
        if (desiredChild && desiredChild.wife) {
          const response = await axios.put(
            `http://localhost:5000/api/updatenewife?name=${desiredChild.wife.name}&familyId=${familyId}&childId=${childId}`,
            formData.wife
          );
          console.log(response.data); // Handle success response
        }
      }
      
  
      // Update the main person details
      const response = await axios.put(
        `http://localhost:5000/api/updatePerson?name=${name}&familyId=${familyId}`,
        formData
      );
      console.log(response.data); // Handle success response
      setSuccessMessage('Person updated successfully.');
      setErrorMessage('');


      
    }
    
    catch (error) {
      console.error(error); // Handle error
      setSuccessMessage('');
      setErrorMessage('Error updating person.');
    }
  };
  
  if (!personData) {
    return <div>Loading...</div>;
  }

  
  return (
    <div className="family_edit-container">
    <h2 className="family_edit-title">Edit Person: {name}</h2>
    {successMessage && <div className="family_edit-success">{successMessage}</div>}
    {errorMessage && <div className="family_edit-error">{errorMessage}</div>}
    <div>
      <h3>Family details</h3>
      <div>
        <label className="family_edit-label" htmlFor="houseName">House Name:</label>
        <input className="family_edit-input" type="text" name="houseName" value={formData.houseName} onChange={handleChange} />
      </div>
      <div>
        <label className="family_edit-label" htmlFor="address">Address:</label>
        <input className="family_edit-input" type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div>
        <label className="family_edit-label" htmlFor="housepincode">House Pincode:</label>
        <input className="family_edit-input" type="text" name="housepincode" value={formData.housepincode} onChange={handleChange} />
      </div>
    </div>
    <form onSubmit={handleSubmit}>
      <div>
        <label className="family_edit-label" htmlFor="name">Name:</label>
        <input className="family_edit-input" type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label className="family_edit-label" htmlFor="baptism_name">Baptism Name:</label>
        <input className="family_edit-input" type="text" name="baptism_name" value={formData.baptism_name} onChange={handleChange} />
      </div>
      <div>
        <label className="family_edit-label" htmlFor="age">Age:</label>
        <input className="family_edit-input" type="text" name="age" value={formData.age} onChange={handleChange} readOnly />
      </div>
      <div>
        <label className="family_edit-label" htmlFor="dob">Dob:</label>
        <input className="family_edit-input" type="date" name="dob" value={formData.dob} onChange={handleChange} />
      </div>
      <div>
        <label className="family_edit-label" htmlFor="phoneNumber">PhoneNumber:</label>
        <input className="family_edit-input" type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </div>
      <div>
        <label className="family_edit-label" htmlFor="email">Email:</label>
        <input className="family_edit-input" type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label className="family_edit-label" htmlFor="situation">Situation:</label>
        <select className="family_edit-select" name="situation" value={formData.situation} onChange={handleChange}>
          <option value="">Select Situation</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label className="family_edit-label" htmlFor="status">Status:</label>
        <select className="family_edit-select" name="status" value={formData.status} onChange={handleChange}>
          <option value="">Select Status</option>
          {father_information || mother_information || wife_information ? (
            <>
              <option value="Divorced">Divorced</option>
            </>
          ) : (
            <>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </>
          )}
        </select>
      </div>
  
      {/* wife */}
      {previousStatus === 'Single' && formData.status === 'Married' && formData.gender === 'male' && (
        <div>
          <label className="family_edit-label" htmlFor="wifeName">Wife Name:</label>
          <input className="family_edit-input" type="text" name="wife.name" value={formData.wife.name} onChange={handleChange} />
        </div>
      )}
      {previousStatus === 'Single' && formData.status === 'Married' &&  formData.gender === 'male' &&(
        <div>
          <label className="family_edit-label" htmlFor="wifeBaptismName">Wife Baptism Name:</label>
          <input className="family_edit-input" type="text" name="wife.baptism_name"  value={formData.wife.baptism_name} onChange={handleChange} />
        </div>
      )}
      {previousStatus === 'Single' && formData.status === 'Married' &&  formData.gender === 'male' &&(
        <div>
          <label className="family_edit-label" htmlFor="wifeDob">Wife Dob:</label>
          <input className="family_edit-input" type="date" name="wife.dob" value={formData.wife.dob} onChange={handleChange} />
        </div>
      )}
      {previousStatus === 'Single' && formData.status === 'Married' && formData.gender === 'male' && (
        <div>
          <label className="family_edit-label" htmlFor="wifeage">Wife Age:</label>
          <input className="family_edit-input" type="text" name="wife.age" value={formData.wife.age} onChange={handleChange} />
        </div>
      )}
  
      {previousStatus === 'Single' && formData.status === 'Married' &&  formData.gender === 'male' &&(
        <div>
          <label className="family_edit-label" htmlFor="wifephoneNumber">Phone Number:</label>
          <input className="family_edit-input" type="text" name="wife.phoneNumber" value={formData.wife.phoneNumber} onChange={handleChange} />
        </div>
      )}
      {previousStatus === 'Single' && formData.status === 'Married' &&  formData.gender === 'male' &&(
        <div>
          <label className="family_edit-label" htmlFor="wifeemail">Email:</label>
          <input className="family_edit-input" type="text" name="wife.email" value={formData.wife.email} onChange={handleChange} />
        </div>
      )}
      {previousStatus === 'Single' && formData.status === 'Married' &&  formData.gender === 'male' &&(
        <div>
          <label className="family_edit-label" htmlFor="situation">Situation:</label>
          <select className="family_edit-select" name="wife.situation" value={formData.wife.situation} onChange={handleChange}>
            <option value="">Select Situation</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      )}
     
      
      <button type="submit" className="family_edit-finalsubmit">Update</button>
    </form>
  </div>
  
  );
};

export default EditPage;