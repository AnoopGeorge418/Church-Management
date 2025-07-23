import React,{ useEffect, useState } from 'react';
import { NavLink, Navigate, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
import '../Css/editEngagement.css';

function EditEngagement() {
  const { id } = useParams();
 
  let navigate = useNavigate()
  const [errorMessage , setErrorMessage]=useState('');
  const [engagement, SetEngagement] = useState(null);
  const [formData, setFormData] = useState({
   
    bridegroom_name:'',
    bridegroom_baptism_name:'',
    bridegroom_familyName:'',
    bridegroom_fatherName:'',
    bridegroom_motherName:'',
    bridegroom_dob:'',
    bridegroom_dateofbaptism:'',
    bridegroom_birthplace:'',
    bride_Name:'',
    bride_baptismName:'',
    bride_familyName:'',
    bride_fatherName:'',
    bride_motherName:'',
    bride_dob:'',
    bride_dateofbaptism:'',
    bride_Birth_place:'',
    engagement_date:'',
    engagement_Celebrant:'',
    engagement_priest:'',
    // Include other fields here
  });
  const [message, setMessage] = useState(null);


 


  useEffect(() => {
    const fetchEngagementDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/engagement/${id}`);
        SetEngagement(response.data);
        setFormData({
          ...response.data,
          bridegroom_dateofbaptism: formatDate(response.data.bridegroom_dateofbaptism),
          bridegroom_dob: formatDate(response.data.bridegroom_dob) 
        //   confirmationdate: formatDate(response.data.confirmationdate)// Format the date here
        });
      } catch (error) {
        console.error('Error fetching engagement details:', error);
        // Handle error
      }
    };
    fetchEngagementDetails();
  }, [id]);

  const handleInputChange = (e) => {

    const { name, value } = e.target;
  
    // Regular expression to check if the value contains numbers or symbols
    const containsNumbersOrSymbols = /[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(value);
  
    // If the value contains numbers or symbols, don't update the state
    if (containsNumbersOrSymbols) {
      alert('Text fields should not contain numbers or symbols.');
      return;
    }
 // If the value is valid, update the state
 setFormData({ ...formData, [name]: value });
    setErrorMessage('');



let da = formData.bridegroom_Data;
    setFormData({ ...formData, bridegroom_Data:{...da,[e.target.name]: e.target.value }});
  };
  console.log(formData,1111111111111111)

  const handleInputChangebride = (e) => {

    const { name, value } = e.target;
  
    // Regular expression to check if the value contains numbers or symbols
    const containsNumbersOrSymbols = /[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(value);
  
    // If the value contains numbers or symbols, don't update the state
    if (containsNumbersOrSymbols) {
      alert('Text fields should not contain numbers or symbols.');
      return;
    }
  
    // If the value is valid, update the state
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');

let da = formData.bride_Data;
    setFormData({ ...formData, bride_Data:{...da,[e.target.name]: e.target.value }});
  };

  console.log(formData,33333333333)
  const handleInputChangeotherdetails = (e) => {


     const { name, value } = e.target;
  
    // Regular expression to check if the value contains numbers or symbols
    const containsNumbersOrSymbols = /[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(value);
  
    // If the value contains numbers or symbols, don't update the state
    if (containsNumbersOrSymbols) {
      alert('Text fields should not contain numbers or symbols.');
      return;
    }
  
    // If the value is valid, update the state
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
    let da = formData.engagement_other_data;
    setFormData({ ...formData, engagement_other_data:{...da,[e.target.name]: e.target.value }});
  };



  console.log(formData,33333333333)
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/engagementUpdate/${id}`, formData);
      alert('Engagement record updated successfully');
navigate('/')
      // setTimeout(() => {
      //   setMessage(null);
      // }, 1000);
    } catch (error) {
      console.error('Error updating engagement record:', error);
      setMessage('Error updating engagement record');
      setTimeout(() => {
        setMessage(null);
      }, 1000);
      Navigate('/')
    }
  };


 const handleInputChangedate = (e) => {
    let da = formData.bridegroom_Data;
    setFormData({ ...formData, bridegroom_Data:{...da,[e.target.name]: e.target.value }});
  };
  console.log(formData,444444444444)

  const handleInputChangedatebride= (e) => {
    let da = formData.bride_Data;
    setFormData({ ...formData, bride_Data:{...da,[e.target.name]: e.target.value }});
  };
  console.log(formData,555555555555)


  const handleInputChangedateother= (e) => {
    let da = formData.engagement_other_data;
    setFormData({ ...formData, engagement_other_data:{...da,[e.target.name]: e.target.value }});
  };
  console.log(formData,555555555555)

  const formatDate = (date) => {
    if (!date) return '';
    console.log(date,22222222222)
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  if (!engagement) {
    return <div>Loading...</div>;
  }

  // const Click=()=>{
  //   nav('/')
  // }
  return (<>
   <form>
    <div className="edit_engagement_container">
   
     
     
      <div className='edit_enga_heading'>
      <h1 >Edit Engagement</h1>
      </div>
      <div className='groom_data_set_'>
      <div className='Groom_heading_dta'> 
      <h3 >Groom</h3>
       </div>

        <div className='edit_engagement'>
        
          <label className='edit_engag'>Name</label>
          <input
         
          className='edit_engagement_set'
            type="text"
            name="bridegroom_name"
            value={formData.bridegroom_Data.bridegroom_name}
            onChange={handleInputChange}
          
          />
        </div>
        <div className='edit_engagement'>
          <label className='edit_engag'>Baptism Name</label>
          <input
          className='edit_engagement_set'
            type="text"
            name="bridegroom_baptism_name"
            value={formData.bridegroom_Data.bridegroom_baptism_name}
            onChange={handleInputChange}
          />
        </div>
        <div className='edit_engagement'>
          <label className='edit_engag'>Family Name</label>
          <input
          className='edit_engagement_set'
            type="text"
            name="bridegroom_familyName"
            value={formData.bridegroom_Data.bridegroom_familyName}
            onChange={handleInputChange}
          />
        </div>
        <div className='edit_engagement'>
          <label className='edit_engag'>Name of Father</label>
          <input
          className='edit_engagement_set'
            type="text"
            name="bridegroom_fatherName"
            value={formData.bridegroom_Data.bridegroom_fatherName}
            onChange={handleInputChange}
          />
        </div>
        <div className='edit_engagement'>
          <label className='edit_engag'>Name of Mother</label>
          <input
          className='edit_engagement_set'
            type="text"
            name="bridegroom_motherName"
            value={formData.bridegroom_Data.bridegroom_motherName}
            onChange={handleInputChange}
          />
        </div>
        <div className='edit_engagement'>
          <label className='edit_engag'>Date of Birth</label>
          <input
          className='edit_engagement_set'
            type="date"
            name="bridegroom_dob"
            value={formData.bridegroom_Data.bridegroom_dob}
            onChange={handleInputChangedate}
          />
        </div>
        <div className='edit_engagement'>
          <label className='edit_engag'>Date of Baptism</label>
          <input
          className='edit_engagement_set'
            type="date"
           name="bridegroom_dateofbaptism"
            value={formData.bridegroom_Data.bridegroom_dateofbaptism}
            onChange={handleInputChangedate}
          />
        </div>


        
        <div className='edit_engagement'>
          <label className='edit_engag'>Birth Place</label>
          <input
          className='edit_engagement_set'
            type="text"
            name="bridegroom_birthplace"
            value={formData.bridegroom_Data.bridegroom_birthplace}
            onChange={handleInputChange}
          />
        </div>
        </div>


<div >
<div className='recoed_of_bride'>
<div className='bride_heading_conta' >
    <h3>Bride</h3>
  </div>
    
          <label className='edit_engag_bride'>Name</label>
          <input
          className='edit_engagement_bride'
            type="text"
            name="bride_Name"
            value={formData.bride_Data.bride_Name}
            onChange={handleInputChangebride}
          />
       

          <label className='edit_engag_bride'>Baptism Name</label>
          <input
          className='edit_engagement_bride'
            type="text"
            name="bride_baptismName"
            value={formData.bride_Data.bride_baptismName}
            onChange={handleInputChangebride}
          />
      

          <label className='edit_engag_bride'>Family Name</label>
          <input
          className='edit_engagement_bride'
            type="text"
            name="bride_familyName"
            value={formData.bride_Data.bride_familyName}
            onChange={handleInputChangebride}
          />
    

       
          <label className='edit_engag_bride'>  Name of Father</label>
          <input
          className='edit_engagement_bride'
            type="text"
            name="bride_fatherName"
            value={formData.bride_Data.bride_fatherName}
            onChange={handleInputChangebride}
          />
      

       
          <label className='edit_engag_bride'>Name of Mother</label>
          <input
          className='edit_engagement_bride'
            type="text"
            name="bride_motherName"
            value={formData.bride_Data.bride_motherName}
            onChange={handleInputChangebride}
          />
        

          <label className='edit_engag_bride'>Date of Birth</label>
          <input
          className='edit_engagement_bride'
            type="date"
            name="bride_dob"
            value={formData.bride_Data.bride_dob}
            onChange={handleInputChangedatebride}
          />
     
       
          <label className='edit_engag_bride'>Date of Baptism</label>
          <input
          className='edit_engagement_bride'
            type="date"
            name="bride_dateofbaptism"
            value={formData.bride_Data.bride_dateofbaptism}
            onChange={handleInputChangedatebride}
          />
    

     
          <label className='edit_engag_bride'>Birth Place</label>
          <input
          className='edit_engagement_bride'
            type="text"
            name="bride_Birth_place"
            value={formData.bride_Data.bride_Birth_place}
            onChange={handleInputChangebride}
          />
       
        </div>
        </div>
<div className=''>
<h3 className='other_detail'>other detalis</h3>
</div>
        <div className='edit_engages_other'>
          <label className='edit_engag_bride'>Date of Engagement</label>
          <input
          className='edit_engagement_bride'
            type="date"
            name="engagement_date"
            value={formData.engagement_other_data.engagement_date}
            onChange={handleInputChangedateother}
          />
        </div>
        <div className='edit_engages_other'>
          <label className='edit_engag_bride'>Celebrant</label>
          <input
          className='edit_engagement_bride'
            type="text"
            name="engagement_Celebrant"
            value={formData.engagement_other_data.engagement_Celebrant}
            onChange={handleInputChangeotherdetails}
          />
        </div>
        <div className='edit_engages_other'>
          <label className='edit_engag_bride'>Preist</label>
          <input
          className='edit_engagement_bride'
            type="text"
            name="engagement_priest"
            value={formData.engagement_other_data.engagement_priest}
            onChange={handleInputChangeotherdetails}
          />
        </div>
      
       
        {/* Include other form fields as needed */}
        <button  className="edit_update_eng" type="button" onClick={handleUpdate}>Update</button>

{/* <button onClick={Click}>next</button> */}
<div className='edit_msg'>
      {message && <div className={message.includes('successfully') ? 'message_success' : 'message_error'}>{message}</div>}
      </div>
     
    </div>
  
    </form>
    </>
  );
}

export default EditEngagement