import React,{ useEffect, useState } from 'react';
import { NavLink, Navigate, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
import '../Css/editMarriage.css';

function EditMarriage() {
  const { id } = useParams();
 
  let navigate = useNavigate()
  const [errorMessage , setErrorMessage]=useState('');
  const [marriage, SetMarriage] = useState(null);
  const [formData, setFormData] = useState({
   
    bridegroom_name:'',
    bridegroom_baptism_name:'',
    bridegroom_familyName:'',
    bridegroom_fatherName:'',
    bridegroom_motherName:'',
      bridegroom_age:'',
      bride_Name:'',
      bride_baptismName:'',
      bride_familyName:'',
      bride_fatherName:'',
      bride_motherName:'',
      bride_age:'',
      marriage_date:'',
      marriage_Celebrant:'',
      marriage_witness:'',
      marriage_witness2:'',
marriage_church:'',
      marriage_priest:'',
    // Include other fields here
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMarriageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/marriage/${id}`);
        SetMarriage(response.data);
        setFormData({
          ...response.data,
        //   bridegroom_dateofbaptism: formatDate(response.data.bridegroom_dateofbaptism),
          marriage_date: formatDate(response.data.marriage_date)
        //   confirmationdate: formatDate(response.data.confirmationdate)// Format the date here
        });
      } catch (error) {
        console.error('Error fetching marriage details:', error);
        // Handle error
      }
    };
    fetchMarriageDetails();
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

let da = formData.bridegroom_Marriagedata;
    setFormData({ ...formData, bridegroom_Marriagedata:{...da,[e.target.name]: e.target.value }});
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




    let da = formData.bride_Marriagedata;
    setFormData({ ...formData, bride_Marriagedata:{...da,[e.target.name]: e.target.value }});
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

   let da = formData.marriage_other_data;
    setFormData({ ...formData, marriage_other_data:{...da,[e.target.name]: e.target.value }});
  };
  console.log(formData,33333333333)

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/updateMarriage/${id}`, formData);
      alert('marriage record updated successfully');
navigate('/')
      // setTimeout(() => {
      //   setMessage(null);
      // }, 1000);
    } catch (error) {
      console.error('Error updating marriage record:', error);
      setMessage('Error updating marriage record');
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    //   Navigate('/')
    }
  };

  const handleInputChangemarriagedata = (e) => {
    let da = formData.bridegroom_Marriagedata;
    setFormData({ ...formData, bridegroom_Marriagedata:{...da,[e.target.name]: e.target.value }});
  };
  console.log(formData,444444444444)

  const handleInputChangemarriagebride = (e) => {
    let da = formData.bride_Marriagedata;
    setFormData({ ...formData, bride_Marriagedata:{...da,[e.target.name]: e.target.value }});
  };
  console.log(formData,444444444444)

  const handleInputChangemarriageother = (e) => {
    let da = formData.marriage_other_data;
    setFormData({ ...formData, marriage_other_data:{...da,[e.target.name]: e.target.value }});
  };
  console.log(formData,444444444444)
  const formatDate = (date) => {
    if (!date) return '';
    console.log(date,22222222222)
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  if (!marriage) {
    return <div>Loading...</div>;
  }

  // const Click=()=>{
  //   nav('/')
  // }
  return (<>
  <form>
    <div className="edit_marraige_container">
  
   <div className='edit_marr_heading'>
      <h1 >Edit Marriage</h1>
      </div>

      <div className='groom_set'>
      <div className='Groom_heading_marra'>
      <h3 >Groom</h3>
      </div>

        <div className='edit_marraiage'>
          <label className='edit_marra'>Name</label>
          <input
         
          className='edit_marraige_set'
            type="text"
            name="bridegroom_name"
            value={formData.bridegroom_Marriagedata.bridegroom_name}
            onChange={handleInputChange}
          
          />
        </div>
        <div className='edit_marraiage'>
          <label className='edit_marra'>Baptism Name</label>
          <input
          className='edit_marraige_set'
            type="text"
            name="bridegroom_baptism_name"
            value={formData.bridegroom_Marriagedata.bridegroom_baptism_name}
            onChange={handleInputChange}
          />
        </div>
        <div className='edit_marraiage'>
          <label className='edit_marra'>Family Name</label>
          <input
          className='edit_marraige_set'
            type="text"
            name="bridegroom_familyName"
            value={formData.bridegroom_Marriagedata.bridegroom_familyName}
            onChange={handleInputChange}
          />
        </div>
        <div className='edit_marraiage'>
          <label className='edit_marra'>Name of Father</label>
          <input
          className='edit_marraige_set'
            type="text"
            name="bridegroom_fatherName"
            value={formData.bridegroom_Marriagedata.bridegroom_fatherName}
            onChange={handleInputChange}
          />
        </div>
        <div className='edit_marraiage'>
          <label className='edit_marra'>Name of Mother</label>
          <input
          className='edit_marraige_set'
            type="text"
            name="bridegroom_motherName"
            value={formData.bridegroom_Marriagedata.bridegroom_motherName}
            onChange={handleInputChange}
          />
        </div>
        <div className='edit_marraiage'>
          <label className='edit_marra'>Age</label>
          <input
          className='edit_marraige_set'
            type="number"
            name="bridegroom_age"
            value={formData.bridegroom_Marriagedata.bridegroom_age}
            onChange={handleInputChangemarriagedata}
          />
        </div>
    </div>
    <div >    
<div className='bride_marraiage_dta'>
<div className='bride_heading_marriage' >
    <h3>Bride</h3>
  </div>
        <div className='edit_engages_bride'>
          <label className='edit_marraiage_bride'>Name</label>
          <input
          className='edit_marriage_bride'
            type="text"
            name="bride_Name"
            value={formData.bride_Marriagedata.bride_Name}
            onChange={handleInputChangebride}
          />
        </div>

        <div className='edit_engages_bride'>
          <label className='edit_marraiage_bride'>Baptism Name</label>
          <input
          className='edit_marriage_bride'
            type="text"
            name="bride_baptismName"
            value={formData.bride_Marriagedata.bride_baptismName}
            onChange={handleInputChangebride}
          />
        </div>

        <div className='edit_engages_bride'>
          <label className='edit_marraiage_bride'>Family Name</label>
          <input
          className='edit_marriage_bride'
            type="text"
            name="bride_familyName"
            value={formData.bride_Marriagedata.bride_familyName}
            onChange={handleInputChangebride}
          />
        </div>

        <div className='edit_engages_bride'>
          <label className='edit_marraiage_bride'>  Name of Father</label>
          <input
          className='edit_marriage_bride'
            type="text"
            name="bride_fatherName"
            value={formData.bride_Marriagedata.bride_fatherName}
            onChange={handleInputChangebride}
          />
        </div>

        <div className='edit_engages_bride'>
          <label className='edit_marraiage_bride'>Name of Mother</label>
          <input
          className='edit_marriage_bride'
            type="text"
            name="bride_motherName"
            value={formData.bride_Marriagedata.bride_motherName}
            onChange={handleInputChangebride}
          />
        </div>

        <div className='edit_engages_bride'>
          <label className='edit_marraiage_bride'>Age</label>
          <input
          className='edit_marriage_bride'
            type="number"
            name="bride_age"
            value={formData.bride_Marriagedata.bride_age}
            onChange={handleInputChangemarriagebride}
          />
        </div>
     

     
        </div>
<div>
<h3 className='marriage_detalis_data'>other detalis</h3>
</div>
        <div className='edit_engages_other'>
          <label className='edit_marraiage_bride'>Date of Marriage</label>
          <input
          className='edit_marriage_bride'
            type="date"
            name="marriage_date"
            value={formData.marriage_other_data.marriage_date}
            onChange={handleInputChangemarriageother}
          />
        </div>
        <div className='edit_engages_other'>
          <label className='edit_marraiage_bride'>Celebrant</label>
          <input
          className='edit_marriage_bride'
            type="text"
            name="marriage_Celebrant"
            value={formData.marriage_other_data.marriage_Celebrant}
            onChange={handleInputChangeotherdetails}
          />
        </div>
        <div className='edit_engages_other'>
          <label className='edit_marraiage_bride'>Witness 1</label>
          <input
          className='edit_marriage_bride'
            type="text"
            name="marriage_witness"
            value={formData.marriage_other_data.marriage_witness}
            onChange={handleInputChangeotherdetails}
          />
        </div>
        <div className='edit_engages_other'>
          <label className='edit_marraiage_bride'>Witness 2</label>
          <input
          className='edit_marriage_bride'
            type="text"
            name="marriage_witness2"
            value={formData.marriage_other_data.marriage_witness2}
            onChange={handleInputChangeotherdetails}
          />
        </div>
        <div className='edit_engages_other'>
          <label className='edit_marraiage_bride'>Church Name</label>
          <input
          className='edit_marriage_bride'
            type="text"
            name="marriage_church"
            value={formData.marriage_other_data.marriage_church}
            onChange={handleInputChangeotherdetails}
          />
        </div>


        <div className='edit_engages_other'>
          <label className='edit_marraiage_bride'>Preist</label>
          <input
          className='edit_marriage_bride'
            type="text"
            name="marriage_priest"
            value={formData.marriage_other_data.marriage_priest}
            onChange={handleInputChangeotherdetails}
          />
        </div>
      
       
        {/* Include other form fields as needed */}
        <button  className="edit_update_marr" type="button" onClick={handleUpdate}>Update</button>

{/* <button onClick={Click}>next</button> */}
<div className='edit_msg'>
      {message && <div className={message.includes('successfully') ? 'message_success' : 'message_error'}>{message}</div>}
      </div>
      </div>
    </div>
  
    </form>
    </>
  );
}

export default EditMarriage