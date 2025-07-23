import React, { useInsertionEffect, useState } from 'react';
import '../Css/addEngagement.css';
import  axios  from 'axios';
import { useNavigate } from "react-router-dom";

function AddEngagement() {
  const [message, setMessage] = useState("");
  const [errorMessage , setErrorMessage]=useState('');
  const regex = /^[a-zA-Z\s]*$/;
  const [bridegroom_Data, setBridegroom_Data] = useState({
    bridegroom_name:'',
    bridegroom_baptism_name:'',
    bridegroom_familyName:'',
    bridegroom_fatherName:'',
    bridegroom_motherName:'',
    bridegroom_dob:'',
    bridegroom_dateofbaptism:'',
    bridegroom_birthplace:'',
});
  const [bride_Data, setBride_Data] = useState({
    bride_Name:'',
    bride_baptismName:'',
    bride_familyName:'',
    bride_fatherName:'',
    bride_motherName:'',
    bride_dob:'',
    bride_dateofbaptism:'',
    bride_Birth_place:'',
  });

  const [engagement_other_data, setEngagement_other_data] = useState({
    engagement_date:'',
    engagement_Celebrant:'',
    engagement_priest:'',
  });




  const handleChangeBridegroom = (e) => {
    console.log()
    const { name, value } = e.target;
    setBridegroom_Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleChangeBride = (e) => {
    const { name, value } = e.target;
    setBride_Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
   
  };

  const handleChangeEngagement_other_data = (e) => {
    const { name, value } = e.target;
    setEngagement_other_data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // let navigate = useNavigate()
  
  
  
  const handleSave = () => {
    if(bridegroom_Data.bridegroom_name === ''){
      alert("please Enter a Bridegroom Name")
      setMessage('');
    }
    
     else if(!regex.test(bridegroom_Data.bridegroom_name)){
      alert("The Bridegroom Name input contains numbers or special characters")
     }
    else if(bridegroom_Data.bridegroom_baptism_name === ''){
      alert("please Enter a Bridegroom baptism Name")
      setMessage('');
    }
    
     else if(!regex.test(bridegroom_Data.bridegroom_baptism_name)){
      alert("The Bridegroom  Baptism Name input contains numbers or special characters")
     }
     else if(bridegroom_Data.bridegroom_familyName === ''){
      alert("please Enter a Bridegroom  house Name")
      setMessage('');
    }
    
     else if(!regex.test(bridegroom_Data.bridegroom_familyName)){
      alert("The Bridegroom  house Name input contains numbers or special characters")
     }
     else if(bridegroom_Data.bridegroom_fatherName === ''){
      alert("please Enter a Bridegroom's Father Name")
      setMessage('');
    }
    
     else if(!regex.test(bridegroom_Data.bridegroom_fatherName)){
      alert("The Bridegroom's Father  Name input contains numbers or special characters")
     }
     else if(bridegroom_Data.bridegroom_motherName === ''){
      alert("please Enter a Bridegroom's Mother Name")
      setMessage('');
    }
    
     else if(!regex.test(bridegroom_Data.bridegroom_motherName)){
      alert("The Bridegroom's Mother  Name input contains numbers or special characters")
     }
     else if(bridegroom_Data.bridegroom_dob === ''){
      alert("please Enter a Bridegroom's date of birth")
      setMessage('');
    }
    else if(bridegroom_Data.bridegroom_dateofbaptism === ''){
      alert("please Enter a Bridegroom's date of baptism")
      setMessage('');
    }
     else if(bridegroom_Data.bridegroom_birthplace === ''){
      alert("please Enter a Bridegroom's birth place Name")
      setMessage('');
    }
    
     else if(!regex.test(bridegroom_Data.bridegroom_birthplace)){
      alert("The Bridegroom's birth place  Name input contains numbers or special characters")
     }

     else if(bride_Data.bride_Name === ''){
      alert("please Enter a Bride Name")
      setMessage('');
    }
    
     else if(!regex.test(bride_Data.bride_Name)){
      alert("The Bride  Name input contains numbers or special characters")
     }
     else if(bride_Data.bride_baptismName === ''){
      alert("please Enter a Bride baptism Name")
      setMessage('');
    }
    
     else if(!regex.test(bride_Data.bride_baptismName)){
      alert("The Bride  Baptism Name input contains numbers or special characters")
     }
     else if(bride_Data.bride_familyName === ''){
      alert("please Enter a Bride  house Name")
      setMessage('');
    }
    
     else if(!regex.test(bride_Data.bride_familyName)){
      alert("The Bride house Name input contains numbers or special characters")
     }
     else if(bride_Data.bride_fatherName === ''){
      alert("please Enter a Bride's Father Name")
      setMessage('');
    }
    
     else if(!regex.test(bride_Data.bride_fatherName)){
      alert("The Bride's Father  Name input contains numbers or special characters")
     }
     else if(bride_Data.bride_motherName === ''){
      alert("please Enter a Bride's Mother Name")
      setMessage('');
    }
    
     else if(!regex.test(bride_Data.bride_motherName)){
      alert("The Bride's Mother  Name input contains numbers or special characters")
     }
     else if(bride_Data.bride_dob === ''){
      alert("please Enter a Bride's date of  birth")
      setMessage('');
    }
    else if(bride_Data.bride_dateofbaptism === ''){
      alert("please Enter a Bride's date of baptism")
      setMessage('');
    }
    else if(bride_Data.bride_Birth_place === ''){
      alert("please Enter a Bride's birth place")
      setMessage('');
    }
    
     else if(!regex.test(bride_Data.bride_Birth_place)){
      alert("The Bride's birth place  Name input contains numbers or special characters")
     }



     else if(engagement_other_data.engagement_date === ''){
      alert("please Enter a Engagement Date")
      setMessage('');
    }

    else if(engagement_other_data.engagement_Celebrant === ''){
      alert("please Enter a Celebrant Name")
      setMessage('');
    }
     else if(!regex.test(engagement_other_data.engagement_Celebrant)){
      alert("The  Celebrant Name input contains numbers or special characters")
     }
     else if(engagement_other_data.engagement_priest === ''){
      alert("please Enter a priest Name")
      setMessage('');
    }
     else if(!regex.test(engagement_other_data.engagement_priest)){
      alert("The priest Name input contains numbers or special characters")
     }
     else{
      setErrorMessage("")



    console.log(bridegroom_Data,11111111)
    console.log(bride_Data,2222222)
    console.log(engagement_other_data,333333333333)

    axios
        .post(' http://localhost:5000/api/addEngagement', {bridegroom_Data,bride_Data,engagement_other_data})
        .then(response => {
          if(response.data.success){
            alert("inserted successfull")
            // navigate('/')

          }
          setMessage('Saved successfully!');

        })
        .catch(error => {
          setMessage('Error occurred. Please try again.');
        });
      }
    } 
  
  return (
  <form>
               <div className='Engagement_Container'>
                     <div className='Engagement_heading'>
                            <h1>Engagement Registry</h1>
                       </div>
                              <div className='bridegroom'>
                                  <div className='engagement_formfill'>
                                    <div className='bridegroom_heading'>
                                      <h1>Bridegroom</h1>
                                    </div>
                                    </div>
                                    
                                     <div className='engagement_formfill'>
                                        <label className='engagement_entery'>Name</label>
                                            <input
                                              className='engagement_fill_entry'
                                              type='text'
                                              id='bridegroom_name'
                                              name='bridegroom_name'
                                              onChange={handleChangeBridegroom}
                                              />
                                       </div>
               
       
         <div className='engagement_formfill'>
         <label className='engagement_entery'>Baptism Name</label>
              <input
                className='engagement_fill_entry'
                type='text'
                id='bridegroom_baptism_name'
                name='bridegroom_baptism_name'
                onChange={handleChangeBridegroom}
                />
         </div>

        <div className='engagement_formfill'>
         <label className='engagement_entery'>Family Name</label>
              <input
                className='engagement_fill_entry'
                type='text'
                id='bridegroom_Family_Name'
                name='bridegroom_familyName'
                onChange={handleChangeBridegroom}
                />
         </div>
         
         <div className='engagement_formfill'>
         <label className='engagement_entery'>Name of Father</label>
              <input
                className='engagement_fill_entry'
                type='text'
                id='bridegroom_fatherName'
                name='bridegroom_fatherName'
                onChange={handleChangeBridegroom}
                />
         </div>

         <div className='engagement_formfill'>
         <label className='engagement_entery'>Name of Mother</label>
              <input
                className='engagement_fill_entry'
                type='text'
                id='bridegroom_motherName'
                name='bridegroom_motherName'
                onChange={handleChangeBridegroom}
                />
                 </div>

                 <div className='engagement_formfill'>
         <label className='engagement_entery'>Date of Birth</label>
              <input
                className='engagement_fill_entry'
                type='date'
                id='bridegroom_dob'
                name='bridegroom_dob'
                onChange={handleChangeBridegroom}
                />
         </div>
        
         <div className='engagement_formfill'>
         <label className='engagement_entery'>Date of Baptism</label>
              <input
                className='engagement_fill_entry'
                type='date'
                id='bridegroom_Dateof_baptism'
                name='bridegroom_dateofbaptism'
                onChange={handleChangeBridegroom}
                />
         </div>
        
        
        
         <div className='engagement_formfill'>
         <label className='engagement_entery'>Place of Birth</label>
              <input
                className='engagement_fill_entry'
                type='text'
                id='bridegroom_Birth_place'
                name='bridegroom_birthplace'
                onChange={handleChangeBridegroom}
                />
         </div>
        </div>







       
{/* bride_means_girl*/}
<div className='bride'>
         <div className='bride_formfill'>
                                    <div className='bride_heading'>
                                      <h1>Bride</h1>
                                    </div>
                                    </div>
         <div className='bride_formfill'>
          <label className='bride_entery'>Name</label>
              <input
                className='bride_fill_entry'
                type='text'
                id='bride_Name'
                name='bride_Name'
                onChange={handleChangeBride}
                />
         </div>
         <div className='bride_formfill'>
         <label className='bride_entery'>Baptism Name</label>
              <input
                className='bride_fill_entry'
                type='text'
                id='bride_baptismName'
                name='bride_baptismName'
               onChange={handleChangeBride}
                />
         </div>

        <div className='bride_formfill'>
         <label className='bride_entery'>Family Name</label>
              <input
                className='bride_fill_entry'
                type='text'
                id='bride_FamilyName'
                name='bride_familyName'
                onChange={handleChangeBride}
                />
         </div>
         
         <div className='bride_formfill'>
         <label className='bride_entery'>Name of Father</label>
              <input
                className='bride_fill_entry'
                type='text'
                id='bride_fatherName'
                name='bride_fatherName'
                onChange={handleChangeBride}
                />
         </div>
         <div className='bride_formfill'>
         <label className='bride_entery'>Name of Mother</label>
              <input
                className='bride_fill_entry'
                type='text'
                id='bride_motherName'
                name='bride_motherName'
                onChange={handleChangeBride}
                />
                 </div>
                 <div className='bride_formfill'>
         <label className='bride_entery'>Date of Birth</label>
              <input
                className='bride_fill_entry'
                type='date'
                id='bride_dob'
                name='bride_dob'
                onChange={handleChangeBride}
                />
         </div>
         <div className='bride_formfill'>
         <label className='bride_entery'>Date of Baptism</label>
              <input
                className='bride_fill_entry'
                type='date'
                id='bride_dateofbaptism'
                name='bride_dateofbaptism'
                onChange={handleChangeBride}
                />
         </div>
         <div className='bride_formfill'>
         <label className='bride_entery'>Place of Birth</label>
              <input
                className='bride_fill_entry'
                type='text'
                id='bride_Birth_place'
                name='bride_Birth_place'
                onChange={handleChangeBride}
                />
         </div>
</div>


<div className='Engagement_other_details'>
  <div className='engagement_other_formfill'>
  <div className='Engagement_other_heading'>
    <h1>Other details </h1>
  </div>
        </div>
       
        <div className='engagement_other_formfill'>
         <label className='engagement_other_entery'>Date</label>
              <input
                className='engagement_other_fill_entry'
                type='date'
                id='engagement_date'
                name='engagement_date'
                onChange={handleChangeEngagement_other_data}
                />
         </div>
         
         <div className='engagement_other_formfill'>
         <label className='engagement_other_entery'>Celebrant</label>
              <input
                className='engagement_other_fill_entry'
                type='text'
                id='engagement_Celebrant'
                name='engagement_Celebrant'
                onChange={handleChangeEngagement_other_data}
                />
         </div>
         <div className='engagement_other_formfill'>
         <label className='engagement_other_entery'> Parish Priest</label>
              <input
                className='engagement_other_fill_entry'
                type='text'
                id='engagement_priest'
                name='engagement_priest'
                onChange={handleChangeEngagement_other_data}
                />
         </div>
        
 
 </div>



         <button type='button' className='engagement_add' onClick={handleSave}  >
              Save
            </button>
         
            {/* <p className='Baptism-success_msg'>{message}</p> */}
            
</div>

    </form>

    
  );
}
export default AddEngagement;