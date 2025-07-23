import React, { useEffect, useState ,useRef} from 'react';
import '../Css/deathCertificate.css'
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from 'react-router-dom'
function DeathCertificate() {
  const { id } = useParams();
  let nav = useNavigate()
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});
const [death, setDeath] = useState(null);
const [formData, setFormData] = useState({
  name: '',
  housename: '',
  baptismname: '',
  age: '',
  confession: '',
  Viaticum:'',
  Anointing_of_sick:'',
  sickness:'',
  date_of_death:'',
  date_of_Burial:'',
  Parish_Priest:'',
  Parish_name:'',
});
const [message, setMessage] = useState(null);

useEffect(() => {
  const fetchDeathDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/death/${id}`);
      setDeath(response.data);
      setFormData({
        ...response.data,
        date_of_death: formatDate(response.data.date_of_death),
        date_of_Burial: formatDate(response.data.date_of_Burial) ,
      //   confirmationdate: formatDate(response.data.confirmationdate)// Format the date here
      });
    } catch (error) {
      console.error('Error fetching death details:', error);
      // Handle error
    }
  };
  fetchDeathDetails();
}, [id]);

const handleInputChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleUpdate = async () => {
  try {
    await axios.put(`http://localhost:5000/api/deathUpdate/${id}`, formData);
    setMessage('death record updated successfully');
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  } catch (error) {
    console.error('Error updating death record:', error);
    setMessage('Error updating death record');
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  }
};
const formatDate = (date) => {
  if (!date) return '';
  const formattedDate = new Date(date).toISOString().split('T')[0];
  return formattedDate;
};

if (!death) {
  return <div>Loading...</div>;
}


  return (
  
    <div className='death-Container'>
        <div className='death_co_position'>
         <div ref={componentRef} >
        
      <div className='death-box'>
       
        <div className='death-heading'>
           DEATH CERTIFICATE
        </div> 
        <div className='death-image'></div>
        <div className='death-sub'>
            This is certiy that the following information has been taken from 
        </div>
        <div className='death-sub2'>
            The original record of death is registered in the Name of
        </div>
        <input className='death_input1' 
        type='text' 
       readOnly
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        />
 <div className='death-sub3'>
           Baptism Name
           </div>
           <input className='death_baptismname' 
        type='text' 
       readOnly
        name="baptismname"
        value={formData.baptismname}
        onChange={handleInputChange}
        />
     <div className='death-sub4'>
           House Name
           </div>
           <input className='death_housename' 
        type='text' 
       readOnly
        name="housename"
        value={formData.housename}
        onChange={handleInputChange}
        />
      
      <div className='death_sub5'>
            The above certifited Person died on
        </div>
        <input className='death_date' 
        type='date' 
       readOnly
        name="date_of_death"
        value={formData.date_of_death}
        onChange={handleInputChange}
        />
         <div className='death_sub6'>
          Cause of death
        </div>
        <input className='death_reason' 
        type='text' 
       readOnly
        name="sickness"
        value={formData.sickness}
        onChange={handleInputChange}
        />

      <div className='death_sub7'>
          The person belongs to 
        </div>
        <input className='death_church' 
        type='text' 
       readOnly
        name="Parish_name"
        value={formData.Parish_name}
        onChange={handleInputChange}
        
        />
        <div className='death_sub8'>
          And
        </div>
        <div className='death_sub9'>
          Burial on
        </div>
        <input className='death_burial' 
        type='text' 
       readOnly
        name="date_of_Burial"
        value={formData.date_of_Burial}
        onChange={handleInputChange}
        
        />
<div className='death_seal'>
          Seal
        </div>
        <div className='death_sign'>
          Signature
        </div>
        </div>
       
     
     

      </div>
      </div>
      <button onClick={handlePrint} className='printfor__button'>  Print </button>
    </div>
  )
}

export default DeathCertificate