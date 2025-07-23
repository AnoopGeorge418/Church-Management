import React, { useState } from 'react';
import '../Css/Certificaterequest.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Certificaterequest() {
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [formData, setFormData] = useState({
    u_name: '',
    u_email: '',
    name: '',
    baptismName: '',
    email: '',
    dob: '',
    father_name: '',
    motherName: '',
    marriageSpouseName: '',
    marriageDate: '',
    deathDate: '',
    causeOfDeath: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCertificateChange = (event) => {
    setSelectedCertificate(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

 

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const showSuccessToast = (message) => {
    toast.success(message, {
      autoClose: 3000, // Close after 3 seconds
    });
  };

  // Function to show error toast notification and close it automatically after a delay
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 3000, // Close after 3 seconds
    });
  };

  const handleSubmit = async () => {
    const specialCharNumberRegex = /[^A-Za-z\s]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      const selectedFields = {
        u_name: formData.u_name,
        u_email: formData.u_email,
        certificateName: selectedCertificate,
      };

      if (formData.u_name === '') {
           showErrorToast('Please enter the user name');
        return;
      } else if (specialCharNumberRegex.test(formData.u_name)) {
           showErrorToast('User Name Input cannot contain numbers or special characters');
        return;
      }else if (formData.u_email === '') {
           showErrorToast('Please enter the email');
        return;
      } else if (!emailRegex.test(formData.u_email)) {
        // Invalid email format
           showErrorToast('Invalid email format');
        return ;
      }else if (selectedCertificate === '') {
           showErrorToast('Please select a certificate type');
        return;
      } else if (selectedCertificate === 'baptism') {
        if (formData.name === '') {
          showErrorToast('Please enter the name');
          return;
        } else  if (specialCharNumberRegex.test(formData.name)) {
          showErrorToast('Name Input cannot contain numbers or special characters');
          return;
        }else if (formData.baptismName === '') {
             showErrorToast('Please enter the baptism name');
           return;
        } else  if (specialCharNumberRegex.test(formData.baptismName)) {
             showErrorToast('BaptismName Input cannot contain numbers or special characters');
          return;
        }else if (formData.dob === '') {
             showErrorToast('Please enter the date of Birth');
           return;
        } else if (formData.father_name === '') {
             showErrorToast('Please enter the father name');
           return;
        }else  if (specialCharNumberRegex.test(formData.father_name)) {
             showErrorToast('FatherName Input cannot contain numbers or special characters');
          return;
        } else if (formData.motherName === '') {
             showErrorToast('Please enter the mother name');
           return;
        }else  if (specialCharNumberRegex.test(formData.motherName)) {
             showErrorToast('MotherName Input cannot contain numbers or special characters');
          return;
        } else {
          selectedFields.name = formData.name;
          selectedFields.baptismName = formData.baptismName;
          selectedFields.dob = formData.dob;
          selectedFields.fatherName = formData.father_name;
          selectedFields.motherName = formData.motherName;
        }
      } else if (selectedCertificate === 'marriage') {
        if (formData.name === '') {
             showErrorToast('Please enter the name');
           return;
        }  if (specialCharNumberRegex.test(formData.name)) {
             showErrorToast('User Name Input cannot contain numbers or special characters');
          return;
        }else if (formData.baptismName === '') {
             showErrorToast('Please enter the baptism name');
           return;
        }else if (specialCharNumberRegex.test(formData.baptismName)) {
             showErrorToast('BaptismName Input cannot contain numbers or special characters');
          return;
        }else if (formData.marriageSpouseName === '') {
             showErrorToast("Please enter the spouse's name");
           return;
        } else if (specialCharNumberRegex.test(formData.marriageSpouseName)) {
             showErrorToast('MarriageSpouseName Input cannot contain numbers or special characters');
          return;
        }// else if (formData.marriageDate === '') {
        //      showErrorToast('Please enter the marriage date');
        //    return;
        // } 
        else {
          selectedFields.name = formData.name;
          selectedFields.baptismName = formData.baptismName;
          selectedFields.marriageSpouseName = formData.marriageSpouseName;
          selectedFields.marriageDate = formData.marriageDate;
        }
      } else if (selectedCertificate === 'death') {
        if (formData.name === '') {
             showErrorToast('Please enter the name');
           return;
        } else if (specialCharNumberRegex.test(formData.name)) {
             showErrorToast('Name Input cannot contain numbers or special characters');
          return;
        } else if (formData.deathDate === '') {
             showErrorToast('Please enter the date of death');
           return;
        } else if (formData.causeOfDeath === '') {
             showErrorToast('Please enter the cause of death');
           return;
        } else if (specialCharNumberRegex.test(formData.causeOfDeath)) {
             showErrorToast('CauseOfDeath Input cannot contain numbers or special characters');
          return;
        }else {
          selectedFields.name = formData.name;
          selectedFields.deceasedName = formData.deceasedName;
          selectedFields.deathDate = formData.deathDate;
          selectedFields.causeOfDeath = formData.causeOfDeath;
        }
      } 
        console.log(selectedFields);

        const response = await fetch('http://localhost:8000/api/user/CertificateRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedFields),
        });

        

        setFormData({
          u_name: '',
          u_email: '',
          name: '',
          baptismName: '',
          email: '',
          dob: '',
          father_name: '',
          motherName: '',
          marriageSpouseName: '',
          marriageDate: '',
          deathDate: '',
          causeOfDeath: '',
        })



        if (response.ok) {
          showSuccessToast('Data inserted successfully. Email will be sent within 24 hours.');
    }else {
          showErrorToast('Failed to insert data'); 
        }
      


      } catch (error) {
        console.error(error);
        showErrorToast('An error occurred'); 
      }
    };


  return (
    <div className='Certificates'>
      <div className='Request_Box'>
        <input
          type='text'
          required
          name='u_name'
          value={formData.u_name}
          onChange={handleInputChange}
        />
        <span>Name</span>
      </div>

      <div className='Request_Box'>
        <input
          type='text'
          required
          name='u_email'
          value={formData.u_email}
          onChange={handleInputChange}
        />
        <span>Email_id</span>
      </div>

      <div className='Certificates-dropdown'>
        <select className='dropdown' onChange={handleCertificateChange}>
          <option value=''>Select Certificate Type</option>
          <option value='baptism'>Baptism Certificate</option>
          <option value='marriage'>Marriage Certificate</option>
          <option value='death'>Death Certificate</option>
        </select>
      </div>

      {selectedCertificate === 'baptism' && (
        <div className='Certificates-dropdown_for_Baptism'>
          <h2 className='fade-in'>Fill these details to generate Baptism Certificates.</h2>
          <div className='labe_and_inp'>
            <label className='label'>Name</label>
            <input
              className='Bapinput1'
              type='text'
              required
              placeholder='Enter Your Name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className='labe_and_inp'>
            <label className='label'>Baptism Name</label>
            <input
              className='Bapinput2'
              type='text'
              required
              placeholder='Enter Your Baptism Name'
              name='baptismName'
              value={formData.baptismName}
              onChange={handleInputChange}
            />
          </div>
          <div className='labe_and_inp'>
            <label className='label'>Date Of Birth</label>
            <input
              className='Bapinput3'
              type='date'
              required
              placeholder='Enter Your DOB'
              name='dob'
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>
          <div className='labe_and_inp'>
            <label className='label'>Father Name</label>
            <input
              className='Bapinput4'
              type='text'
              required
              placeholder='Enter Your Father Name'
              name='father_name'
              value={formData.father_name}
              onChange={handleInputChange}
            />
          </div>
          <div className='labe_and_inp'>
            <label className='label'>Mother Name</label>
            <input
              className='Bapinput5'
              type='text'
              required
              placeholder='Enter Your Mother Name'
              name='motherName'
              value={formData.motherName}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      {selectedCertificate === 'marriage' && (
        <div className='Certificates-dropdown_for_Marriage'>
          <h2 className='fade-in'>Fill these details to generate Marriage Certificates.</h2>
          <div className='labe_and_inp'>
            <label className='label'>Bridegroom Name</label>
            <input
              className='Bapinput1'
              type='text'
              required
              placeholder='Enter Your Name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className='labe_and_inp'>
            <label className='label'>Bridegroom Baptism Name</label>
            <input
              className='Bapinput2'
              type='text'
              required
              placeholder='Enter Your Baptism Name'
              name='baptismName'
              value={formData.baptismName}
              onChange={handleInputChange}
            />
          </div>
          <div className='labe_and_inp'>
            <label className='label'>Bride Name</label>
            <input
              className='spouseinput2'
              type='text'
              required
              placeholder='Enter Your Spouse Name'
              name='marriageSpouseName'
              value={formData.marriageSpouseName}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className='labe_and_inp'>
            <label className='label'>Marriage Date</label>
            <input
              className='Marrinput2'
              type='date'
              required
              placeholder='Enter Your Marriage Date'
              name='marriageDate'
              value={formData.marriageDate}
              onChange={handleInputChange}
            />
          </div> */}
        </div>
      )}

      {selectedCertificate === 'death' && (
        <div className='Certificates-dropdown_for_Death'>
          <h2 className='fade-in'>Fill these details to generate Death Certificates.</h2>
          <div className='labe_and_inp'>
            <label className='label'>Name</label>
            <input
              className='Bapinput1'
              type='text'
              required
              placeholder='Enter the Deceased Name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className='labe_and_inp'>
            <label className='label'>Date Of Death</label>
            <input
              className='Deathinput1'
              type='date'
              required
              placeholder='Enter the Date of Death'
              name='deathDate'
              value={formData.deathDate}
              onChange={handleInputChange}
            />
          </div>
          <div className='labe_and_inp'>
            <label className='label'>Cause Of Death</label>
            <input
              className='Deathinput3'
              type='text'
              required
              placeholder='Enter the Cause of Death'
              name='causeOfDeath'
              value={formData.causeOfDeath}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      <div className='Request-button_div'>
        <button className='Request_btn' onClick={handleSubmit}>
          Request
        </button>
      </div>
      <div className='certificate-sucess-button'>
        {successMessage && <p className='success'>{successMessage}</p>}
      </div>
      {errorMessage && <p className='error'>{errorMessage}</p>}

      {/* Toast container to display the notifications */}
      <ToastContainer />
    </div>
  );
}

export default Certificaterequest;
