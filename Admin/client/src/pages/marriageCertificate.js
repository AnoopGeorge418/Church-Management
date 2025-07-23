import React, { useEffect, useState ,useRef} from 'react';
import '../Css/marriageCertificate.css'
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from 'react-router-dom'


function MarriageCertificate() {
  const { id } = useParams();
  let nav = useNavigate()
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});
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
  let da = formData.bridegroom_Marriagedata;
  setFormData({ ...formData, bridegroom_Marriagedata:{...da,[e.target.name]: e.target.value }});
};
console.log(formData,1111111111111111)

const handleInputChangebride = (e) => {
  let da = formData.bride_Marriagedata;
  setFormData({ ...formData, bride_Marriagedata:{...da,[e.target.name]: e.target.value }});
};

console.log(formData,33333333333)
const handleInputChangeotherdetails = (e) => {
  let da = formData.marriage_other_data;
  setFormData({ ...formData, marriage_other_data:{...da,[e.target.name]: e.target.value }});
};
console.log(formData,33333333333)

const handleUpdate = async () => {
  try {
    await axios.put(`http://localhost:5000/api/updateMarriage/${id}`, formData);
    setMessage('marriage record updated successfully');
// navigate('/')
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  } catch (error) {
    console.error('Error updating marriage record:', error);
    setMessage('Error updating marriage record');
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  //   Navigate('/')
  }
};
const formatDate = (date) => {
  if (!date) return '';
  console.log(date,22222222222)
  const formattedDate = new Date(date).toISOString().split('T')[0];
  return formattedDate;
};

if (!marriage) {
  return <div>Loading...</div>;
}


  return (
    <div className='marriage-Container'>
      <div className='marriage-box'>
      <div ref={componentRef} >
      <div className='marriage-InnerBorder'>
        <div className='marriage-heading'>
           Marriage Certificate
        </div>
        <div className='marriage-image'></div>
        <div className='marriage-sub'>
            Church of
        </div>
        <input className='marriage-input1' 
        type='text'
         readOnly
         name="marriage_church"
         value={formData.marriage_other_data.marriage_church}
         onChange={handleInputChangeotherdetails}>

         </input>
        {/* <br/>
        <input className='marriage-input1' type='text' required></input> */}
        <div className='marriage-2nd_heading'>
            This is to Certify
        </div>
        <div className='marriage-labels_and_inputs'>
          <div className='marriage-labels_and_inputs'>
              <label className='marriage-label'>That</label>
              <input 
                className='marriage-input2' 
                type='text' 
                readOnly
                name="bridegroom_name"
            value={formData.bridegroom_Marriagedata.bridegroom_name}
            onChange={handleInputChange}>
               </input>
               <label className='marriage-label'>and</label>
               <input 
                className='marriage-input3' 
                type='text' 
                readOnly
                name="bride_Name"
                value={formData.bride_Marriagedata.bride_Name}
                onChange={handleInputChangebride}>
               </input>
          </div>
          <div className='marriage-labels_and_inputs'>
             <label className='marriage-label7'>were lawfully</label>
             <label className='marriage-label8'>Married</label>
          </div>
            <div lassName='marriage-labels_and_inputs1'>
               <label className='marriage-label1'>on the</label>
              <input 
                className='marriage-input5'
                required
                type='date'
                readOnly
                name="marriage_date"
                value={formData.marriage_other_data.marriage_date}
                onChange={handleInputChangeotherdetails}
                >
              </input>
                {/* <label className='marriage-label2'>day of</label>
              <input 
                className='marriage-input6'
                required
                type='text'
                ></input> */}
            </div>
            <h3 className='marriage-para'>
                According to the Rite of the Roman Cathlic Church
            </h3>
            <h3 className='marriage-h3'>
                and the confirmity with the laws of the State of Karnataka
            </h3>
             <div className='marriage-labels_and_inputs'>
            {/* <label className='marriage-label6'>the State of</label>
              <input 
                className='marriage-input10'
                required
                type='text'
                ></input> */}
                 <label className='marriage-label'>Rev,</label>
              <input 
                className='marriage-input14'
                required
                type='text'
                readOnly
                name="marriage_Celebrant"
            value={formData.marriage_other_data.marriage_Celebrant}
            onChange={handleInputChangeotherdetails}


                ></input>
                <label className='marriage-label9'>officiating,</label>
                <label className='marriage-label'>in the presence of</label>
              <input 
                className='marriage-input15'
                required
                type='text'
                readOnly
                name="marriage_witness"
                value={formData.marriage_other_data.marriage_witness}
                onChange={handleInputChangeotherdetails}
                ></input>
                <label className='marriage-label'>and</label>
              <input 
                className='marriage-input16'
               required
                type='text'
                readOnly
                name="marriage_witness2"
                value={formData.marriage_other_data.marriage_witness2}
                onChange={handleInputChangeotherdetails}
                ></input>
                <label className='marriage-label10'>witnesses.</label>
                <p className='marriage-para2'>
                    as appears from the Marriage Register of this Church.
                </p>
            </div>
            {/* <div className='marriage-rev'>
                 <label className='revDetail'>Dated</label>
                 <input
                   className='marriage-input12'
                   type='text'
                   required
                   ></input>
            </div> */}
            <div className='marriage-labels_and_inputs'>
                <label className='revDetail2'>Signature of the Priest</label>
                {/* <input
                   className='marriage-input13'
                   type='text'
                  readOnly
                  name="marriage_priest"
                  value={formData.marriage_other_data.marriage_priest}
                  onChange={handleInputChangeotherdetails}

                   ></input> */}
            </div>
            <div className='marriage-labels_and_inputs'>
                <label className='revDetail3'>Seal</label>
                {/* <input
                   className='marriage-input13'
                   type='text'
                  readOnly
                  name="marriage_priest"
                  value={formData.marriage_other_data.marriage_priest}
                  onChange={handleInputChangeotherdetails}

                   ></input> */}
            </div>
        </div> 
        </div>
       
      </div>
    </div>
    <button onClick={handlePrint} className='ooooo'>  Print </button>
    </div>
  )
}

export default MarriageCertificate