import React, { useEffect, useState ,useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";
import axios from 'axios';
import '../Css/baptismCertificate.css';
// import baptismseal from '../Images/baptismseal.png';
// import priest_sign from '../Images/priest_sign.png';
 function BaptismCertificate() {
  const { id } = useParams();
  let nav = useNavigate()
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [baptism,setBaptism] = useState(null);
  const [formData,setFormData] = useState({
    name: '',
    baptismName: '',
    familyName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    dateofbaptism: '',
    birthplace: '',
    palaceofbaptism: '',
    confirmationdate: '',
    godfather: '',
    godmother: '',
    godfatherparish:'',
    godmotherparish:'',
    ministername:'',
    parishminister: '',
    // Include other fields here
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchBaptismDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/baptism/${id}`);
        setBaptism(response.data);
        setFormData({
          ...response.data,
          dateofbaptism: formatDate(response.data.dateofbaptism),
          dob: formatDate(response.data.dob) ,
          confirmationdate: formatDate(response.data.confirmationdate)// Format the date here
        });
      } catch (error) {
        console.error('Error fetching baptism details:', error);
        // Handle error
      }
    };
    fetchBaptismDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  // if (!baptism) {
  //   return <div>Loading...</div>;
  // }

  // const Click=()=>{
  //   nav('/')
  // }
  return (<document>
    
    <div className='baptism_certificate_box'>
   
          <div ref={componentRef} className="baptism_card">
    

<div   className='baptismcertifiace_container'>
<div className='baptism_box_to_move'>
      <h1 className='baptism_cert_heading'>DIOCESE OF BELTHANGADY</h1>
      <p className='baptism_cert_bapt'>CERTIFICATE OF BAPTISM</p>
      {message && <div className={message.includes('successfully') ? 'message success' : 'message error'}>{message}</div>}
      {/* <form> */}
        <div>
          <label className='baptism_certificate_details'>Name </label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
          readOnly
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className='baptism_certificate_details'>Baptism Name</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="baptismName"
            value={formData.baptismName}
            onChange={handleInputChange}
          />
        </div>
       

<div>
        <label className='baptism_certificate_details'>Family Name</label>
        <p className='detalis'>:</p>
        <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="familyName"
            value={formData.familyName}
            onChange={handleInputChange}
          />
</div>
<div>
          <label className='baptism_certificate_details'>Father Name</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
          />
</div>
<div>
          <label className='baptism_certificate_details'>Mother Name</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
          />
</div>
<div>
          <label className='baptism_certificate_details'>Date of Birth</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
</div>
<div>
          <label className='baptism_certificate_details'>Date of Baptism</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="date"
            name="dateofbaptism"
            value={formData.dateofbaptism}
            onChange={handleInputChange}
          />
</div>
<div>
          <label className='baptism_certificate_details'>Place of Birth</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="birthplace"
            value={formData.birthplace}
            onChange={handleInputChange}
          />
</div>

<div>
          <label className='baptism_certificate_details'>Date of Confirmation</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="date"
            name="confirmationdate"
            value={formData.confirmationdate}
            onChange={handleInputChange}
          />
</div>
<div>
          <label className='baptism_certificate_details'>Name of GodFather</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="godfather"
            value={formData.godfather}
            onChange={handleInputChange}
          />
</div>

<div>
          <label className='baptism_certificate_details'>Name of GodMother</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="godmother"
            value={formData.godmother}
            onChange={handleInputChange}
          />
</div>
<div>
          <label className='baptism_certificate_details'>Parish of GodFather</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="godfatherparish"
            value={formData.godfatherparish}
            onChange={handleInputChange}
          />
</div>
<div>
          <label className='baptism_certificate_details'>Parish of GodMother</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="godmotherparish"
            value={formData.godmotherparish}
            onChange={handleInputChange}
          />
</div>
<div>
          <label className='baptism_certificate_details'>Name of Minister</label>
          <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="ministername"
            value={formData.ministername}
            onChange={handleInputChange}
          />
</div>
<div>
          <label className='baptism_certificate_details'>Parish of Minister</label>
           <p className='detalis'>:</p>
          <input className='baptism_certificate_data'
            readOnly
            type="text"
            name="parishminister"
            value={formData.parishminister}
            onChange={handleInputChange}
          />
</div>

{/* <button onClick={Click}>next</button>  */}
<p className='baptism_overall'>Certified the above is a true extract from the Baptism Register maintained in this church</p>
{/* <div className='baptism_photo'>
          <img
            src={baptismseal}
            className='baptismseal'
            alt='baptism_seal'
       
          />
</div> */}
<p className='baptism_seal'>(seal)</p>

{/* <div className='baptism_photo'>
          <img
            src={priest_sign}
            className='priest_sign'
            alt='baptism_sign'
       
          />
</div> */}
{/* 
<div className='baptism_sign'> */}

<p   className='baptism_sign'>singature of the Parish Priest</p>
{/* </div> */}

</div>
    </div>
    </div>
    <button onClick={handlePrint} className="print__button">  Print </button> 
    </div>
   {/* </form> */}
    </document>
  );
}
export default  BaptismCertificate;